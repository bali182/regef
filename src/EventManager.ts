import { Engine } from './Engine'

export class EventManager {
  private engine: Engine
  public hooked: boolean

  constructor(engine: Engine) {
    this.engine = engine
    this.hooked = false
    // binding methods
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)
  }

  hookListeners(): void {
    document.addEventListener('mousedown', this.onMouseDown)
    document.addEventListener('mousemove', this.onMouseMove)
    document.addEventListener('mouseup', this.onMouseUp)
    document.addEventListener('keydown', this.onKeyDown)
    document.addEventListener('keyup', this.onKeyUp)

    this.hooked = true
  }

  unhookListeners(): void {
    document.removeEventListener('mousedown', this.onMouseDown)
    document.removeEventListener('mousemove', this.onMouseMove)
    document.removeEventListener('mouseup', this.onMouseUp)
    document.removeEventListener('keydown', this.onKeyDown)
    document.removeEventListener('keyup', this.onKeyUp)

    this.hooked = false
  }

  onKeyUp(e: KeyboardEvent): void {
    this.engine.capabilities.forEach((capability) => capability.onKeyUp(e))
  }
  onKeyDown(e: KeyboardEvent): void {
    this.engine.capabilities.forEach((capability) => capability.onKeyDown(e))
  }
  onMouseDown(e: MouseEvent): void {
    this.engine.capabilities.forEach((capability) => capability.onMouseDown(e))
  }
  onMouseMove(e: MouseEvent): void {
    this.engine.capabilities.forEach((capability) => capability.onMouseMove(e))
  }
  onMouseUp(e: MouseEvent): void {
    this.engine.capabilities.forEach((capability) => capability.onMouseUp(e))
  }
}
