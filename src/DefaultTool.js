import Tool from './Tool'

class DefaultTool extends Tool {
  constructor({ dragTrackers = [], keyHandlers = [], selectionProvider = null }) {
    super()
    this.dragTrackers = dragTrackers
    this.keyHandlers = keyHandlers
    this.selectionProvider = selectionProvider
  }

  setComponentRegistry(registry) {
    super.setComponentRegistry(registry)
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

export default DefaultTool
