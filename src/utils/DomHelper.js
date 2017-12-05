import { DATA_ID } from '../constants'

class DomHelper {
  constructor(registry) {
    this.registry = registry
  }

  findClosestElement(element) {
    const root = this.registry.getRootDom()
    for (let it = element; it !== root && it !== null; it = it.parentNode) {
      if (this.isValidElement(it)) {
        return it
      }
    }
    return root
  }

  findClosestParent(element) {
    if (element === this.registry.getRootDom()) {
      return element
    }
    return this.findClosestElement(element.parentNode)
  }

  findTargetedParent(element, currentParent, root, registry) {
    const targetDom = findPrimaryTarget(e.target, root, registry)
    if (targetDom === target || target.contains(targetDom)) {
      return currentParent
    }
    return targetDom
  }

  isInsideDiagram(element) {
    return this.registry.getRootDom().contains(element)
  }

  isValidElement(element) {
    const root = this.registry.getRootDom()
    if (element === root) {
      return true
    }
    if (!element.getAttribute) {
      return false
    }
    if (!this.registry.has(element.getAttribute(DATA_ID))) {
      return false
    }
    return true
  }
}

export default DomHelper
