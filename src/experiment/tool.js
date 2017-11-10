export default class Tool {
  constructor() {
    this.__registry = null
    this.__component = null
  }
  setComponentRegistry(registry) {
    this.__registry = registry
  }
  setComponent(component) {
    this.__component = component
  }
  getComponent() {
    return this.__component
  }
  getComponentRegistry() {
    return this.__registry
  }
  onKeyDown() {
    return null
  }
  onKeyUp() {
    return null
  }
  onMouseDown() {
    return null
  }
  onMouseMove() {
    return null
  }
  onMouseUp() {
    return null
  }
}
