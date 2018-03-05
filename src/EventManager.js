export default class EventManager {
  constructor(engine) {
    this.engine = engine
    this.hooked = false
    // binding methods
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)
  }

  hookListeners() {
    document.addEventListener('mousedown', this.onMouseDown)
    document.addEventListener('mousemove', this.onMouseMove)
    document.addEventListener('mouseup', this.onMouseUp)
    document.addEventListener('keydown', this.onKeyDown)
    document.addEventListener('keyup', this.onKeyUp)

    this.hooked = true
  }

  unhookListeners() {
    document.removeEventListener('mousedown', this.onMouseDown)
    document.removeEventListener('mousemove', this.onMouseMove)
    document.removeEventListener('mouseup', this.onMouseUp)
    document.removeEventListener('keydown', this.onKeyDown)
    document.removeEventListener('keyup', this.onKeyUp)

    this.hooked = false
  }

  onKeyUp(e) {
    this.engine.capabilities.forEach((capability) => capability.onKeyUp(e))
  }
  onKeyDown(e) {
    this.engine.capabilities.forEach((capability) => capability.onKeyDown(e))
  }
  onMouseDown(e) {
    this.engine.capabilities.forEach((capability) => capability.onMouseDown(e))
  }
  onMouseMove(e) {
    this.engine.capabilities.forEach((capability) => capability.onMouseMove(e))
  }
  onMouseUp(e) {
    this.engine.capabilities.forEach((capability) => capability.onMouseUp(e))
  }
}
