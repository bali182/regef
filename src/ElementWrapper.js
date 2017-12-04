class ElementWrapper {
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

  setDom(el) {
    if (el !== this.dom) {
      this.dom = el
      this.component = this.findComponent(el)
    }
    return this
  }
}

export default ElementWrapper
