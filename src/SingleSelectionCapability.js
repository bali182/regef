import { point, rectangle, dimension } from 'regef-geometry'
import { NODE_TYPE, SELECT } from './constants'
import Capability from './Capability'
import { typeMatches, partMatches, perform, getSelection } from './utils'

const locationOf = ({ clientX, clientY }, rootDom) => {
  const { x, y } = rootDom.getBoundingClientRect()
  return point(clientX - x, clientY - y)
}

export default class SingleSelectionCapability extends Capability {
  constructor(config = { parts: null, types: [NODE_TYPE] }) {
    super()
    this.location = null
    this.possibleSingleSelection = false
    this.additional = false
    this.selection = []
    this.config = config
  }

  createSingleSelectionRequest() {
    const { location, selection, additional } = this
    return {
      type: SELECT,
      bounds: rectangle(location, dimension(0, 0)),
      selection: additional
        ? getSelection(this.engine).concat(selection)
        : selection,
    }
  }

  cancel() {
    if (this.progress) {
      this.location = null
      this.possibleSingleSelection = false
      this.selection = []
      this.progress = false
    }
  }

  onMouseDown(e) {
    const part = this.engine.domHelper.findPart(e.target, partMatches(this.config.parts))
    if (!part) {
      return
    }
    const target = part.domHelper.findClosest(e.target, typeMatches(this.config.types))
    if (!target) {
      return
    }
    this.location = locationOf(e, part.registry.root.dom)
    this.selection = [target.userComponent]
    this.possibleSingleSelection = true
    this.progress = true
  }

  onMouseMove() {
    this.possibleSingleSelection = false
  }

  onMouseUp({ ctrlKey, metaKey }) {
    if (!this.progress) {
      return
    }
    if (this.possibleSingleSelection) {
      this.additional = metaKey || ctrlKey
      perform(this.engine.editPolicies, this.createSingleSelectionRequest())
      this.additional = false
    }
  }
}
