import { point, rectangle } from 'regef-2dmath'
import { COMMAND_TARGET, ROOT_TYPE, SELECT } from './constants'
import BaseDragTracker from './BaseDragTracker'
import Toolkit from './Toolkit'

const buildBounds = ({ x: x1, y: y1 }, { x: x2, y: y2 }) => {
  const x = Math.min(x1, x2)
  const y = Math.min(y1, y2)
  const width = Math.max(x1, x2) - x
  const height = Math.max(y1, y2) - y
  return rectangle(x, y, width, height)
}

const findSelectedElements = (bounds, toolkit) => toolkit.nodes()
  .filter((node) => bounds.containsRectangle(toolkit.bounds(node)))

const locationOf = ({ clientX, clientY }, rootDom) => {
  const { x, y } = rootDom.getBoundingClientRect()
  return point(clientX - x, clientY - y)
}

class MultiSelectionDragTracker extends BaseDragTracker {
  constructor() {
    super()
    this.startLocation = null
    this.endLocation = null
    this.lastRequest = null
    this.toolkit = null
  }

  setComponentRegistry(registry) {
    super.setComponentRegistry(registry)
    this.toolkit = registry === null ? null : new Toolkit(registry)
  }

  createMultiSelectionRequest() {
    const { startLocation, endLocation, toolkit } = this
    const bounds = buildBounds(startLocation, endLocation)
    return {
      [COMMAND_TARGET]: this.registry.root.component,
      type: SELECT,
      bounds,
      startLocation,
      endLocation,
      get selection() {
        return findSelectedElements(bounds, toolkit)
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
    const request = this.createMultiSelectionRequest()
    if (this.lastRequest !== null) {
      this.lastRequest[COMMAND_TARGET].eraseFeedback(this.lastRequest)
    }
    request[COMMAND_TARGET].getCommand(request)
    this.progress = false
  }
}

export default MultiSelectionDragTracker
