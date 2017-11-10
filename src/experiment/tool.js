export default class Tool {
  constructor() {
    this.__registry = null
    this.__target = null
    this.__request = null
  }
  setComponentRegistry(registry) {
    this.__registry = registry
  }
  setTarget(component) {
    this.__target = component
  }
  getTarget() {
    return this.__target
  }
  getComponentRegistry() {
    return this.__registry
  }
  onKeyDown(e) {
    console.log('keydown', e)
    return null
  }
  onKeyUp(e) {
    console.log('keyup', e)
    return null
  }
  onMouseDown(e) {
    console.log('mousedown', e)
    return null
  }
  onMouseMove(e) {
    console.log('mousemove', e)
    return null
  }
  onMouseUp(e) {
    console.log('mouseup', e)
    return null
  }
}
