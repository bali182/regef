export default class DomHelper {
  constructor(registry) {
    this.registry = registry
  }

  findClosest(dom, matcher = () => true) {
    const root = this.registry.root.dom
    for (let it = dom; it !== null; it = it.parentNode) {
      const wrapper = this.registry.get(it)
      if (wrapper !== undefined && wrapper !== null) {
        return matcher(wrapper) ? wrapper : null
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
    if (element === this.registry.root.dom) {
      return element
    }
    return this.findClosestElement(element.parentNode, type)
  }

  isInsideDiagram(element) {
    return this.registry.root.dom.contains(element)
  }
}
