import { DIAGRAM_TYPE, LAYER_TYPE, NODE_TYPE } from '../../constants'
import { assertComponent, assertId, assertType, fillComponentStore, getComponent } from './utils'

class DiagramManager {
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

  getDiagram(id) {
    return getComponent(this.components, id, DIAGRAM_TYPE)
  }

  getLayer(id) {
    return getComponent(this.components, id, LAYER_TYPE)
  }

  getNode(id) {
    return getComponent(this.components, id, NODE_TYPE)
  }
}
export default DiagramManager
