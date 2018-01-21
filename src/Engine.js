import SelectionProvider from './SelectionProvider'

class Engine {
  constructor({
    dragTrackers = [],
    keyHandlers = [],
    selectionProvider = new SelectionProvider(),
  }) {
    this.toolkit = null
    this.registry = null
    this.dragTrackers = dragTrackers
    this.keyHandlers = keyHandlers
    this.selectionProvider = selectionProvider
  }
  setToolkit(toolkit) {
    this.toolkit = toolkit
  }
  getComponentRegistry() {
    return this.registry
  }
  setComponentRegistry(registry) {
    this.registry = registry
    this.dragTrackers.forEach((tracker) => {
      tracker.setComponentRegistry(registry)
      tracker.setEngine(this)
    })
    this.keyHandlers.forEach((handler) => {
      handler.setComponentRegistry(registry)
      handler.setEngine(this)
    })
    if (this.selectionProvider instanceof SelectionProvider) {
      this.selectionProvider.setToolkit(this.toolkit)
    }
  }
  onKeyUp(e) {
    this.keyHandlers.forEach((handler) => handler.onKeyUp(e))
  }
  onKeyDown(e) {
    this.keyHandlers.forEach((handler) => handler.onKeyDown(e))
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
  selection() {
    if (!(this.selectionProvider instanceof SelectionProvider)) {
      return []
    }
    return this.selectionProvider.selection()
  }
}

export default Engine
