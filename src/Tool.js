export default class Tool {
  constructor() {
    this.registry = null
  }
  setComponentRegistry(registry) {
    this.registry = registry
  }
  getComponentRegistry() {
    return this.registry
  }
  onKeyDown(/* e */) {
    return null
  }
  onKeyUp(/* e */) {
    return null
  }
  onMouseDown(/* e */) {
    return null
  }
  onMouseMove(/* e */) {
    return null
  }
  onMouseUp(/* e */) {
    return null
  }
}
