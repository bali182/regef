import Capability from './Capability'
import { DELETE } from './constants'
import { perform } from './EditPolicy'

export default class DeleteCapability extends Capability {
  constructor() {
    super()
    this.currentSelection = []
  }

  getDeleteRequest() {
    return {
      type: DELETE,
      selection: this.currentSelection,
    }
  }

  onKeyDown({ key, target }) {
    if ((key === 'Backspace' || key === 'Delete') && this.engine.domHelper.isInsideDiagram(target)) {
      this.currentSelection = this.engine.selection()
      if (this.currentSelection.length > 0) {
        perform(this.engine.editPolicies, this.getDeleteRequest())
      }
    }
  }
}
