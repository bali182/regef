import { findDOMNode } from 'react-dom'

class ComponentWrapper {
  constructor(registry, domHelper) {
    this.registry = registry
    this.domHelper = domHelper
    this.component = null
    this.dom = null
  }

  reset() {
    this.dom = null
    this.component = null
  }

  setComponent(component) {
    this.component = component
    // No way of knowing if the dom element was re-created, so no point of equality check.
    this.dom = findDOMNode(component)
  }

  setDom(dom) {
    if (dom !== this.dom) {
      this.dom = dom
      this.component = this.domHelper.findComponent(dom)
    }
    return this
  }
}

export default ComponentWrapper
