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

  /** @internal */
  private findRelevantChildrenIntenal(node: Element, children: Element[] = []): void {
    if (node !== null && node.hasChildNodes()) {
      const childNodes = Array.from(node.childNodes as NodeListOf<Element>)
      for (let i = 0, len = childNodes.length; i < len; i += 1) {
        const childNode = childNodes[i]
        if (this.registry.has(childNode)) {
          children.push(childNode)
        } else {
          this.findRelevantChildrenIntenal(childNode, children)
        }
      }
    }
  }

  findRelevantChildren(element: Element): Element[] {
    const children: Element[] = []
    this.findRelevantChildrenIntenal(element, children)
    return children
  }

  partContains(element: Element): boolean {
    return this.registry.root.dom.contains(element)
  }
}
