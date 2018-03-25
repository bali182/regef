import Capability from './Capability'
import { DELETE } from './constants'
import { perform, partMatches, getSelection } from './utils'

export default class DeleteCapability extends Capability {
  constructor(config = { parts: null, keys: ['Backspace', 'Delete'] }) {
    super()
    this.currentSelection = []
    this.config = config
  }

  getDeleteRequest() {
    return {
      type: DELETE,
      selection: this.currentSelection,
    }
  }

  focusOnTargetedParts(target) {
    return Boolean(this.engine.domHelper.findPart(target, partMatches(this.config.parts)))
  }

  keyMatches(key) {
    return this.config.keys.indexOf(key) >= 0
  }

  onKeyDown({ key, target }) {
    if (this.keyMatches(key) && this.focusOnTargetedParts(target)) {
      this.currentSelection = getSelection(this.engine)
      if (this.currentSelection.length > 0) {
        perform(this.engine.editPolicies, this.getDeleteRequest())
      }
    }
  }
}
