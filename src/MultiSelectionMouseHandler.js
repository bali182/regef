import { point, rectangle } from 'regef-2dmath'
import { COMMAND_TARGET, ROOT_TYPE, SELECT } from './constants'
import BaseMouseHandler from './BaseMouseHandler'
import Toolkit from './Toolkit'

const buildBounds = ({ x: x1, y: y1 }, { x: x2, y: y2 }) => {
  const x = Math.min(x1, x2)
  const y = Math.min(y1, y2)
  const width = Math.max(x1, x2) - x
  const height = Math.max(y1, y2) - y
  return rectangle(x, y, width, height)
}

const locationOf = ({ clientX, clientY }, rootDom) => {
  const { x, y } = rootDom.getBoundingClientRect()
  return point(clientX - x, clientY - y)
}

export default class MultiSelectionDragTracker extends BaseMouseHandler {
  constructor() {
    super()
    this.startLocation = null
    this.endLocation = null
    this.lastRequest = null
    this.toolkit = null
    this.additional = false
  }

  setComponentRegistry(registry) {
    super.setComponentRegistry(registry)
    this.toolkit = registry === null ? null : new Toolkit(registry)
  }

  createMultiSelectionRequest() {
    const { startLocation, endLocation, toolkit, additional, engine } = this
    const bounds = buildBounds(startLocation, endLocation)
    return {
      [COMMAND_TARGET]: this.registry.root.component,
      type: SELECT,
      bounds,
      startLocation,
      endLocation,
      get selection() {
        const selection = engine.selection()
        const additionalFilter = additional
          ? ((node) => selection.indexOf(node) < 0)
          : (() => true)
        const newSelection = toolkit.nodes()
          .filter(additionalFilter)
          .filter((node) => bounds.containsRectangle(toolkit.bounds(node)))
        return additional ? selection.concat(newSelection) : newSelection
      },
    }
  }

  cancel() {
    if (this.progress) {
      if (this.lastRequest !== null) {
        this.lastRequest[COMMAND_TARGET].eraseFeedback(this.lastRequest)
      }
      this.startLocation = null
      this.endLocation = null
      this.possibleSingleSelection = false
      this.progress = false
    }
  }

  onMouseDown(e) {
    if (!this.domHelper.isInsideDiagram(e.target)) {
      return
    }
    const target = this.domHelper.findClosest(e.target, ROOT_TYPE)
    if (target !== null) {
      this.startLocation = locationOf(e, this.registry.root.dom)
      this.progress = true
    }
  }

  onMouseMove(e) {
    if (!this.progress) {
      return
    }
    this.endLocation = locationOf(e, this.registry.root.dom)
    const request = this.createMultiSelectionRequest()
    request[COMMAND_TARGET].requestFeedback(request)
    this.lastRequest = request
  }

  onMouseUp(e) {
    if (!this.progress) {
      return
    }
    this.endLocation = locationOf(e, this.registry.root.dom)
    this.additional = e.shiftKey
    const request = this.createMultiSelectionRequest()
    if (this.lastRequest !== null) {
      this.lastRequest[COMMAND_TARGET].eraseFeedback(this.lastRequest)
    }
    request[COMMAND_TARGET].perform(request)
    this.progress = false
    this.additional = false
  }
}
