class DomHelper {
  constructor(registry) {
    this.registry = registry
  }

  findClosest(dom, type = null) {
    const root = this.registry.getRoot().dom
    for (let it = dom; it !== null; it = it.parentNode) {
      const component = this.registry.get(it)
      if (component !== undefined && component !== null) {
        return this.matchesType(component.component, type) ? component : null
      }
      if (it === root) {
        return null
      }
    }
    return null
  }

  findRelevantChildrenIntenal(node, children = []) {
    if (node !== null && node.hasChildNodes()) {
      const childNodes = node.childNodes
      for (let i = 0, len = childNodes.length; i < len; i += 1) {
        const childNode = childNodes[i]
        if (this.registry.has(childNode)) {
          children.push(childNode)
        } else {
          this.findRelevantChildrenIntenal(childNode, children)
        }
      }
    }
    return children
  }

  findRelevantChildren(element) {
    return this.findRelevantChildrenIntenal(element, [])
  }

  findClosestParent(element, type = null) {
    if (element === this.registry.getRoot().dom) {
      return element
    }
    return this.findClosestElement(element.parentNode, type)
  }

  isInsideDiagram(element) {
    return this.registry.getRoot().dom.contains(element)
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
}

export default DomHelper
