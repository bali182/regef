import { findDOMNode } from 'react-dom'

class EditPolicy {
  constructor() {
    this.__component = null
  }

  setComponent(component) {
    this.__component = component
  }

  getComponent() {
    return this.__component
  }

  getDomNode() {
    if (this.__component !== null) {
      // eslint-disable-next-line react/no-find-dom-node
      return findDOMNode(this.__component)
    }
    return null
  }

  getCommand(request) {
    return null
  }
}

export default EditPolicy
