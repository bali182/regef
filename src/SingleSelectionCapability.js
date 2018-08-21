import { point, rectangle, dimension } from 'regef-geometry'
import { SELECT } from './constants'
import Capability from './Capability'
import { typeMatches, partMatches, perform, getSelection, isLeftButton } from './utils'

const locationOf = ({ clientX, clientY }, rootDom) => {
  const { x, y } = rootDom.getBoundingClientRect()
  return point(clientX - x, clientY - y)
}

const DEFAULT_CONFIG = {
  parts: null,
  selectables: [],
}

export default class SingleSelectionCapability extends Capability {
  constructor(engine, config = {}) {
    super(engine)
    this.config = { ...DEFAULT_CONFIG, ...config }
    this.init()
  }

  init() {
    this.progress = false
    this.location = null
    this.possibleSingleSelection = false
    this.additional = false
    this.selection = []
  }

  createSingleSelectionRequest() {
    const { location, selection, additional } = this
    return {
      type: SELECT,
      bounds: rectangle(location, dimension(0, 0)),
      selection: additional ? getSelection(this.engine).concat(selection) : selection,
    }
  }

  cancel() {
    if (this.progress) {
      this.init()
    }
  }

  onMouseDown(e) {
    if (!isLeftButton(e)) {
      return
    }
    const part = this.engine.domHelper.findPart(e.target, partMatches(this.config.parts))
    if (!part) {
      return
    }
    const target = part.domHelper.findClosest(e.target, typeMatches(this.config.selectables))
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
    this.init()
  }
}
