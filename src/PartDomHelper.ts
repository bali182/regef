import { ComponentRegistry } from './ComponentRegistry'
import { ComponentWrapper } from './ComponentWrapper'

type WrapperPredicate = (wrapper: ComponentWrapper) => boolean

export class PartDomHelper {
  private registry: ComponentRegistry
  constructor(registry: ComponentRegistry) {
    this.registry = registry
  }

  findClosest(dom: Element, matcher: WrapperPredicate = () => true): ComponentWrapper {
    const root = this.registry.root.dom
    for (let it = dom; it !== null; it = it.parentNode as Element) {
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

  findRelevantChildrenIntenal(node: Element, children: Element[] = []): Element[] {
    if (node !== null && node.hasChildNodes()) {
      const childNodes = node.childNodes as NodeListOf<Element>
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

  findRelevantChildren(element: Element): Element[] {
    return this.findRelevantChildrenIntenal(element, [])
  }

  partContains(element: Element): boolean {
    return this.registry.root.dom.contains(element)
  }
}
