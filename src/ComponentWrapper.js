import { findDOMNode } from 'react-dom'

class ComponentWrapper {
  constructor(registry = null) {
    this.registry = registry
    this.component = null
    this.dom = null
  }

  findComponent(el) {
    const { registry } = this
    const component = registry.getByDomElement(el)
    if (component === null && el === registry.getRootDom()) {
      return registry.getRoot()
    }
    return component
  }

  reset() {
    this.dom = null
    this.component = null
  }

  setComponent(component) {
    this.component = component
    // no way of knowing if the component was re-rendered.
    this.dom = findDOMNode(component)
  }

  setDom(dom) {
    if (dom !== this.dom) {
      this.dom = dom
      this.component = this.findComponent(dom)
    }
    return this
  }
}

export default ComponentWrapper
