import { point, rectangle } from 'regef-geometry'
import { ROOT_TYPE, SELECT, DEFAULT_PART_ID } from './constants'
import Capability from './Capability'
import { eraseFeedback, requestFeedback, perform } from './utils'

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

export default class MultiSelectionCapability extends Capability {
  constructor({ part = DEFAULT_PART_ID } = {}) {
    super()
    this.startLocation = null
    this.endLocation = null
    this.lastRequest = null
    this.additional = false
    this.partId = part
  }

  part() {
    return this.engine.part(this.partId)
  }

  createMultiSelectionRequest() {
    const { startLocation, endLocation, additional, engine } = this
    const bounds = buildBounds(startLocation, endLocation)
    const part = this.part()
    return {
      type: SELECT,
      bounds,
      startLocation,
      endLocation,
      get selection() {
        const selection = engine.selection()
        const additionalFilter = additional
          ? ((node) => selection.indexOf(node) < 0)
          : (() => true)
        const partToolkit = part.toolkit
        const newSelection = partToolkit.nodes()
          .filter(additionalFilter)
          .filter((node) => bounds.containsRectangle(partToolkit.bounds(node)))
        return additional ? selection.concat(newSelection) : newSelection
      },
    }
  }

  cancel() {
    if (this.progress) {
      if (this.lastRequest !== null) {
        eraseFeedback(this.engine.editPolicies, this.lastRequest)
      }
      this.startLocation = null
      this.endLocation = null
      this.possibleSingleSelection = false
      this.progress = false
    }
  }

  onMouseDown(e) {
    if (!this.part().domHelper.partContains(e.target)) {
      return
    }
    const target = this.part().domHelper
      .findClosest(e.target, (wrapper) => wrapper.component.type === ROOT_TYPE)
    if (target !== null) {
      this.startLocation = locationOf(e, this.part().registry.root.dom)
      this.progress = true
    }
  }

  onMouseMove(e) {
    if (!this.progress) {
      return
    }
    this.endLocation = locationOf(e, this.part().registry.root.dom)
    const request = this.createMultiSelectionRequest()
    requestFeedback(this.engine.editPolicies, request)
    this.lastRequest = request
  }

  onMouseUp(e) {
    if (!this.progress) {
      return
    }
    this.endLocation = locationOf(e, this.part().registry.root.dom)
    this.additional = e.shiftKey
    const request = this.createMultiSelectionRequest()
    if (this.lastRequest !== null) {
      eraseFeedback(this.engine.editPolicies, this.lastRequest)
    }
    perform(this.engine.editPolicies, request)
    this.progress = false
    this.additional = false
  }
}
