import { point, rectangle } from 'regef-geometry'
import { ROOT_TYPE, SELECT, NODE_TYPE } from './constants'
import Capability from './Capability'
import { eraseFeedback, requestFeedback, perform, getSelection, partMatches, typeMatches } from './utils'

const buildBounds = ({ x: x1, y: y1 }, { x: x2, y: y2 }) => {
  const x = Math.min(x1, x2)
  const y = Math.min(y1, y2)
  const width = Math.max(x1, x2) - x
  const height = Math.max(y1, y2) - y
  return rectangle(x, y, width, height)
}

const locationOf = ({ clientX, clientY }) => point(clientX, clientY)

export default class MultiSelectionCapability extends Capability {
  constructor(config = { parts: null, types: [NODE_TYPE] }) {
    super()
    this.startLocation = null
    this.endLocation = null
    this.lastRequest = null
    this.startPart = null
    this.endPart = null
    this.additional = false
    this.config = config
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
        const selection = getSelection(engine)
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
    const part = this.engine.domHelper.findPart(e.target, partMatches(this.config.parts))
    if (!part) {
      return
    }
    const target = part.domHelper.findClosest(e.target, typeMatches(ROOT_TYPE))
    if (target !== null) {
      this.startLocation = locationOf(e)
      this.progress = true
      this.startPart = part
    }
  }

  onMouseMove(e) {
    if (!this.progress) {
      return
    }
    this.endPart = this.engine.domHelper.findPart(e.target, partMatches(this.config.parts))
    this.endLocation = locationOf(e)
    this.additional = Boolean(e.shiftKey)

    const request = this.createMultiSelectionRequest()
    requestFeedback(this.engine.editPolicies, request)
    this.lastRequest = request
  }

  onMouseUp(e) {
    if (!this.progress) {
      return
    }
    this.endPart = this.engine.domHelper.findPart(e.target, partMatches(this.config.parts))
    this.endLocation = locationOf(e)
    this.additional = Boolean(e.shiftKey)

    const request = this.createMultiSelectionRequest()
    if (this.lastRequest !== null) {
      eraseFeedback(this.engine.editPolicies, this.lastRequest)
    }
    perform(this.engine.editPolicies, request)
    this.progress = false
    this.additional = false
  }
}
