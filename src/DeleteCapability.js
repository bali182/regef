import Capability from './Capability'
import { DELETE, DEFAULT_PART_ID } from './constants'
import { perform } from './EditPolicy'

export default class DeleteCapability extends Capability {
  constructor({ part = DEFAULT_PART_ID, keys = ['Backspace', 'Delete'] } = {}) {
    super()
    this.currentSelection = []
    this.partId = part
    this.keys = keys
  }

  part() {
    return this.engine.part(this.partId)
  }

  getDeleteRequest() {
    return {
      type: DELETE,
      selection: this.currentSelection,
    }
  }

  onKeyDown({ key, target }) {
    if (this.keys.indexOf(key) >= 0 && this.part().domHelper.partContains(target)) {
      this.currentSelection = this.engine.selection()
      if (this.currentSelection.length > 0) {
        perform(this.engine.editPolicies, this.getDeleteRequest())
      }
    }
  }
}
