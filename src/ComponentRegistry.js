import { findDOMNode } from 'react-dom'

class ComponentRegistry {
  constructor() {
    this.components = {}
    this.root = null
  }
  setRoot(diagram) {
    this.root = diagram
    this.rootDom = findDOMNode(this.root)
  }
  getRoot() {
    return this.root
  }
  getRootDom() {
    return this.rootDom
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
}
export default ComponentRegistry
