import { rectangle } from 'regef-2dmath'
import DomHelper from './DomHelper'
import { NODE_TYPE, PORT_TYPE, CONNECTION_TYPE } from './constants'

const REGISTRY = Symbol('registry')
const DOM_HELPER = Symbol('dom-helper')

class Toolkit {
  constructor(registry) {
    this[REGISTRY] = registry
    this[DOM_HELPER] = new DomHelper(registry)
  }

  root() {
    const root = this[REGISTRY].getRoot()
    if (root === undefined || root === null) {
      throw new Error('No root component!')
    }
    return this[REGISTRY].getRoot().component.userComponent
  }

  parent(component) {
    const domHelper = this[DOM_HELPER]
    const registry = this[REGISTRY]
    const wrapper = registry.get(component)
    if (wrapper === undefined || wrapper === null) {
      throw new Error('Given component is not part of the diagram!')
    } else if (wrapper === registry.getRoot()) {
      return null
    }
    const parent = domHelper.findClosest(wrapper.dom, null)
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
        children.push(child)
      }
    }
    return children
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

  nodes() {
    return this.ofType(NODE_TYPE)
  }

  ports() {
    return this.ofType(PORT_TYPE)
  }

  connections() {
    return this.ofType(CONNECTION_TYPE)
  }

  bounds(component) {
    const registry = this[REGISTRY]
    const wrapper = registry.get(component)
    if (wrapper === undefined || wrapper === null) {
      throw new Error('Given component is not part of the diagram!')
    }
    const { left: rLeft, top: rTop } = registry.getRoot().dom.getBoundingClientRect()
    const { left, top, width, height } = wrapper.dom.getBoundingClientRect()
    return rectangle(
      left - rLeft,
      top - rTop,
      width,
      height,
    )
  }
}

export default Toolkit