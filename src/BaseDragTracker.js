import DragTracker from './DragTracker'
import DomHelper from './DomHelper'

class BaseDragTracker extends DragTracker {
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

export default BaseDragTracker
