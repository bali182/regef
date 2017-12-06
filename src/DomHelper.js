import { DATA_ID } from './constants'

class DomHelper {
  constructor(registry) {
    this.registry = registry
  }

  findClosestElement(element, type = null) {
    const root = this.registry.getRootDom()
    for (let it = element; it !== null; it = it.parentNode) {
      const component = this.findComponent(it)
      if (component) {
        return this.matchesType(component, type) ? it : null
      }
      if (it === root) {
        return null
      }
    }
    return null
  }

  findClosestParent(element, type = null) {
    if (element === this.registry.getRootDom()) {
      return element
    }
    return this.findClosestElement(element.parentNode, type)
  }

  isInsideDiagram(element) {
    return this.registry.getRootDom().contains(element)
  }

  isValidElement(element) {
    if (!element || !element.getAttribute) {
      return false
    }
    if (!this.registry.has(element.getAttribute(DATA_ID))) {
      return false
    }
    return true
  }

  matchesType(component, type) {
    if (component === null) {
      return false
    }
    if (type === null) {
      return true
    }
    if (Array.isArray(type)) {
      for (let i = 0, len = type.length; i < len; i += 1) {
        const it = type[i]
        if (it === component.type) {
          return true
        }
      }
    }
    return type === component.type
  }

  findComponent(element) {
    if (element === this.registry.getRootDom()) {
      return this.registry.getRoot()
    }
    if (!element || !element.getAttribute) {
      return null
    }
    const id = element.getAttribute(DATA_ID)
    return id ? this.registry.get(id) : null
  }
}

export default DomHelper
