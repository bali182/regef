import { point, rectangle, dimension } from 'regef-geometry'
import { NODE_TYPE, SELECT, DEFAULT_PART_ID } from './constants'
import Capability from './Capability'
import { perform } from './EditPolicy'

const locationOf = ({ clientX, clientY }, rootDom) => {
  const { x, y } = rootDom.getBoundingClientRect()
  return point(clientX - x, clientY - y)
}

export default class SingleSelectionCapability extends Capability {
  constructor({ part = DEFAULT_PART_ID } = {}) {
    super()
    this.startLocation = null
    this.endLocation = null
    this.possibleSingleSelection = false
    this.additional = false
    this.selection = []
    this.partId = part
  }

  part() {
    return this.engine.part(this.partId)
  }

  createSingleSelectionRequest() {
    const { startLocation, endLocation, selection, additional } = this
    return {
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
    if (!this.part().domHelper.partContains(e.target)) {
      return
    }
    const target = this.part().domHelper
      .findClosest(e.target, (wrapper) => wrapper.component.type === NODE_TYPE)
    if (target !== null) {
      this.startLocation = locationOf(e, this.part().registry.root.dom)
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
      perform(this.engine.editPolicies, this.createSingleSelectionRequest())
      this.additional = false
    }
  }
}
