import { Engine } from './Engine'

export class Capability<Config = any> {
  protected progress: boolean
  protected engine: Engine
  protected config: Config

  constructor(engine: Engine, config: Config) {
    this.progress = false
    this.engine = engine
    this.config = config
  }
  onKeyDown(e: KeyboardEvent): void {
    // emtpy
  }
  onKeyUp(e: KeyboardEvent): void {
    // empty
  }
  onMouseDown(e: MouseEvent): void {
    // empty
  }
  onMouseMove(e: MouseEvent): void {
    // empty
  }
  onMouseUp(e: MouseEvent): void {
    // empty
  }
  cancel(): void {
    // empty
  }
}
