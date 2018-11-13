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
    const { htmlDocument } = this.engine
    htmlDocument.addEventListener('mousedown', this.onMouseDown)
    htmlDocument.addEventListener('mousemove', this.onMouseMove)
    htmlDocument.addEventListener('mouseup', this.onMouseUp)
    htmlDocument.addEventListener('keydown', this.onKeyDown)
    htmlDocument.addEventListener('keyup', this.onKeyUp)
    this.hooked = true
  }

  unhookListeners(): void {
    const { htmlDocument } = this.engine
    htmlDocument.removeEventListener('mousedown', this.onMouseDown)
    htmlDocument.removeEventListener('mousemove', this.onMouseMove)
    htmlDocument.removeEventListener('mouseup', this.onMouseUp)
    htmlDocument.removeEventListener('keydown', this.onKeyDown)
    htmlDocument.removeEventListener('keyup', this.onKeyUp)
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
