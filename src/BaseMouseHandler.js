import MouseHandler from './MouseHandler'
import DomHelper from './DomHelper'

class BaseMouseHandler extends MouseHandler {
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
  onMouseDown() {
    // empty
  }
  onMouseMove() {
    // empty
  }
  onMouseUp() {
    // empty
  }
}

export default BaseMouseHandler
