import { DIAGRAM_TYPE, LAYER_TYPE, NODE_TYPE, DATA_ID, DATA_TYPE } from '../constants'
import { assertComponent, assertId, assertType, fillComponentStore } from './utils'

const DOM_SELECTOR_ID = `[${DATA_ID}]`

class ComponentRegistry {
  constructor() {
    this.components = fillComponentStore()
  }

  register(id, type, component) {
    assertType(type)
    assertComponent(component)
    assertId(id)
    this.components[type][id] = {
      component,
    }
  }

  unregister(id, type) {
    assertType(type)
    delete this.components[type][id]
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
    const type = element.getAttribute(DATA_TYPE)
    if (!id || !type) {
      return null
    }
    return this.get(id, type)
  }

  get(id, type) {
    assertType(type)
    return this.components[type][id] || null
  }

  getDiagram(id) {
    return this.get(id, DIAGRAM_TYPE)
  }

  getLayer(id) {
    return this.get(id, LAYER_TYPE)
  }

  getNode(id) {
    return this.get(id, NODE_TYPE)
  }
}
export default ComponentRegistry
