class Engine {
  constructor({ dragTrackers = [], keyHandlers = [], selectionProvider = null }) {
    this.registry = null
    this.dragTrackers = dragTrackers
    this.keyHandlers = keyHandlers
    this.selectionProvider = selectionProvider
  }
  getComponentRegistry() {
    return this.registry
  }
  setComponentRegistry(registry) {
    this.registry = registry
    this.dragTrackers.forEach((tracker) => tracker.setComponentRegistry(registry))
  }
  onKeyUp({ key }) {
    switch (key) {
      case 'Escape':
        this.dragTrackers.forEach((tracker) => tracker.cancel())
        break
      default:
    }
  }
  onMouseDown(e) {
    this.dragTrackers.forEach((tracker) => tracker.onMouseDown(e))
  }
  onMouseMove(e) {
    this.dragTrackers.forEach((tracker) => tracker.onMouseMove(e))
  }
  onMouseUp(e) {
    this.dragTrackers.forEach((tracker) => tracker.onMouseUp(e))
  }
}

export default Engine
