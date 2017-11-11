export default class Tool {
  constructor() {
    this.__registry = null
  }
  setComponentRegistry(registry) {
    this.__registry = registry
  }
  getComponentRegistry() {
    return this.__registry
  }
  onKeyDown(e) {
    return null
  }
  onKeyUp(e) {
    return null
  }
  onMouseDown(e) {
    return null
  }
  onMouseMove(e) {
    return null
  }
  onMouseUp(e) {
    return null
  }
}
