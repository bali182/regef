import { findDOMNode } from 'react-dom'

class EditPolicy {
  constructor() {
    this.component = null
  }

  setComponent(component) {
    this.component = component
  }

  getComponent() {
    return this.component
  }

  getDomNode() {
    if (this.component !== null) {
      return findDOMNode(this.component)
    }
    return null
  }

  getCommand(/* request */) {
  }

  requestFeedback(/* request */) {
  }

  eraseFeedback(/* request */) {
  }
}

export default EditPolicy
