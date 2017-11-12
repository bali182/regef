import { findDOMNode } from 'react-dom'
import { DATA_ID } from '../constants'

class ComponentRegistry {
  constructor() {
    this.components = {}
    this.diagram = null
  }
  setRoot(diagram) {
    this.diagram = diagram
  }
  getRoot() {
    return this.diagram
  }
  getRootDom() {
    // eslint-disable-next-line react/no-find-dom-node
    return findDOMNode(this.diagram)
  }
  register(id, component) {
    this.components[id] = component
  }
  unregister(id) {
    delete this.components[id]
  }
  get(id) {
    return this.components[id] || null
  }
  has(id) {
    return Boolean(this.components[id])
  }
  getByDomElement(element) {
    if (!element || !element.getAttribute) {
      return null
    }
    const id = element.getAttribute(DATA_ID)
    return id ? this.get(id) : null
  }
}
export default ComponentRegistry
