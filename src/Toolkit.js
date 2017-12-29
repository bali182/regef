import { rectangle } from 'regef-2dmath'
import { findDOMNode } from 'react-dom'
import DomHelper from './DomHelper'

const REGISTRY = Symbol('registry')
const DOM_HELPER = Symbol('dom-helper')

class Toolkit {
  constructor(registry) {
    this[REGISTRY] = registry
    this[DOM_HELPER] = new DomHelper(registry)
  }

  getRoot() {
    return this[REGISTRY].getRoot().getUserComponent()
  }

  getParent(component) {
    const domHelper = this[DOM_HELPER]
    const registry = this[REGISTRY]
    const node = findDOMNode(component)
    if (node === null || node === registry.getRootDom()) {
      return null
    }
    const parent = domHelper.findComponent(domHelper.findClosestElement(node, null))
    return parent === null ? null : parent.getUserComponent()
  }

  getChildren(component) {
    const node = findDOMNode(component)
    const domHelper = this[DOM_HELPER]
    if (node === null) {
      return []
    }
    return domHelper.findRelevantChildren(node)
      .map((childNode) => domHelper.findComponent(childNode).getUserComponent())
  }

  getBounds(component) {
    const node = findDOMNode(component)
    const root = this[REGISTRY].getRootDom()
    const { left: rLeft, top: rTop } = root.getBoundingClientRect()
    const { left, top, width, height } = node.getBoundingClientRect()
    return rectangle(
      left - rLeft,
      top - rTop,
      width,
      height,
    )
  }
}

export default Toolkit
