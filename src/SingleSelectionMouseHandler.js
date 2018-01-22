import { point, rectangle, dimension } from 'regef-2dmath'
import { COMMAND_TARGET, NODE_TYPE, SELECT } from './constants'
import BaseMouseHandler from './BaseMouseHandler'

const locationOf = ({ clientX, clientY }, rootDom) => {
  const { x, y } = rootDom.getBoundingClientRect()
  return point(clientX - x, clientY - y)
}

export default class SingleSelectionMouseHandler extends BaseMouseHandler {
  constructor() {
    super()
    this.startLocation = null
    this.endLocation = null
    this.possibleSingleSelection = false
    this.additional = false
    this.selection = []
  }

  createSingleSelectionRequest() {
    const { startLocation, endLocation, selection, additional } = this
    return {
      [COMMAND_TARGET]: this.registry.root.component,
      type: SELECT,
      bounds: rectangle(startLocation, dimension(0, 0)),
      startLocation,
      endLocation,
      selection: additional
        ? this.engine.selection().concat(selection)
        : selection,
    }
  }

  cancel() {
    if (this.progress) {
      this.startLocation = null
      this.endLocation = null
      this.possibleSingleSelection = false
      this.selection = []
      this.progress = false
    }
  }

  onMouseDown(e) {
    if (!this.domHelper.isInsideDiagram(e.target)) {
      return
    }
    const target = this.domHelper.findClosest(e.target, NODE_TYPE)
    if (target !== null) {
      this.startLocation = locationOf(e, this.registry.root.dom)
      this.selection = [target.userComponent]
      this.possibleSingleSelection = true
      this.progress = true
    }
  }

  onMouseMove() {
    this.possibleSingleSelection = false
  }

  onMouseUp({ ctrlKey, metaKey }) {
    if (!this.progress) {
      return
    }
    this.endLocation = this.startLocation
    if (this.possibleSingleSelection) {
      this.additional = metaKey || ctrlKey
      const request = this.createSingleSelectionRequest()
      request[COMMAND_TARGET].perform(request)
      this.additional = false
    }
  }
}
