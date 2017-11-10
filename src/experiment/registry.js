import { DATA_ID } from '../constants'

const DOM_SELECTOR_ID = `[${DATA_ID}]`

class ComponentRegistry {
  constructor() {
    this.components = {}
    this.diagram = null
  }
  setDiagram(diagram) {
    this.diagram = diagram
  }
  getDiagram() {
    return this.diagram
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
  getByDomElement(element) {
    if (!element || !element.closest) {
      return null
    }
    return this.getDirectByDomElement(element.closest(DOM_SELECTOR_ID))
  }
  getDirectByDomElement(element) {
    if (!element || !element.getAttribute) {
      return null
    }
    const id = element.getAttribute(DATA_ID)
    return id ? this.get(id) : null
  }
}
export default ComponentRegistry
