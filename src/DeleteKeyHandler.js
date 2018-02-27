import BaseKeyHandler from './BaseKeyHandler'
import { DELETE } from './constants'

export default class DeleteKeyHandler extends BaseKeyHandler {
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
    if ((key === 'Backspace' || key === 'Delete') && this.domHelper.isInsideDiagram(target)) {
      this.currentSelection = this.engine.selection()
      if (this.currentSelection.length > 0) {
        const request = this.getDeleteRequest()
        this.engine.editPolicy.perform(request)
      }
    }
  }
}
