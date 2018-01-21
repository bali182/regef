import KeyHandler from './KeyHandler'
import DomHelper from './DomHelper'

export default class BaseKeyHandler extends KeyHandler {
  constructor() {
    super()
    this.engine = null
    this.progress = false
    this.registry = null
    this.domHelper = null
  }

  setEngine(engine) {
    this.engine = engine
  }

  setComponentRegistry(registry) {
    this.registry = registry
    this.domHelper = registry === null ? null : new DomHelper(registry)
  }
  onKeyDown() {
    // emtpy
  }
  onKeyUp() {
    // empty
  }
}
