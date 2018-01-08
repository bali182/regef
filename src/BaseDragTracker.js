import DragTracker from './DragTracker'
import DomHelper from './DomHelper'

class BaseDragTracker extends DragTracker {
  constructor() {
    super()
    this.progress = false
    this.registry = null
    this.domHelper = null
  }

  setComponentRegistry(registry) {
    this.registry = registry
    this.domHelper = registry === null ? null : new DomHelper(registry)
  }
}

export default BaseDragTracker
