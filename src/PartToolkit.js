import { rectangle } from 'regef-geometry'

const REGISTRY = Symbol('REGISTRY')
const DOM_HELPER = Symbol('DOM_HELPER')

export default class PartToolkit {
  constructor(registry, domHelper) {
    this[REGISTRY] = registry
    this[DOM_HELPER] = domHelper
  }

  root() {
    const root = this[REGISTRY].root
    if (root === undefined || root === null) {
      throw new Error('No root component!')
    }
    return this[REGISTRY].root.component.userComponent
  }

  parent(component) {
    const domHelper = this[DOM_HELPER]
    const registry = this[REGISTRY]
    const wrapper = registry.get(component)
    if (wrapper === undefined || wrapper === null) {
      throw new Error('Given component is not part of the diagram!')
    } else if (wrapper === registry.root) {
      return null
    }
    const parent = domHelper.findClosest(wrapper.dom.parentNode)
    return parent === null ? null : parent.userComponent
  }

  children(component) {
    const registry = this[REGISTRY]
    const domHelper = this[DOM_HELPER]
    const wrapper = registry.get(component)
    if (wrapper === undefined || wrapper === null) {
      throw new Error('Given component is not part of the diagram!')
    }
    const domChildren = domHelper.findRelevantChildren(wrapper.dom)
    const children = []
    for (let i = 0, length = domChildren.length; i < length; i += 1) {
      const child = registry.get(domChildren[i])
      if (child !== undefined && child !== null) {
        children.push(child.userComponent)
      }
    }
    return children
  }

  editPolicy(component) {
    const registry = this[REGISTRY]
    const wrapper = registry.get(component)
    if (wrapper === undefined || wrapper === null) {
      throw new Error('Given component is not part of the diagram!')
    }
    return wrapper.component.editPolicy
  }

  ofType(type) {
    const all = this[REGISTRY].all()
    const ofType = []
    for (let i = 0, length = all.length; i < length; i += 1) {
      const wrapper = all[i]
      if (wrapper.component.type === type) {
        ofType.push(wrapper.userComponent)
      }
    }
    return ofType
  }

  bounds(component) {
    const registry = this[REGISTRY]
    const wrapper = registry.get(component)
    if (wrapper === undefined || wrapper === null) {
      throw new Error('Given component is not part of the diagram!')
    }
    const { left, top, width, height } = wrapper.dom.getBoundingClientRect()
    return rectangle(
      left,
      top,
      width,
      height,
    )
  }
}
