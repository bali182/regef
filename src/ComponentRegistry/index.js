import { DIAGRAM_TYPE, LAYER_TYPE, NODE_TYPE } from '../constants'
import { assertComponent, assertId, assertType, fillComponentStore } from './utils'

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
