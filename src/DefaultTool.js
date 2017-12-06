import Tool from './Tool'
import NodeDragTracker from './NodeDragTracker'
import ConnectDragTracker from './ConnectDragTracker'

class DefaultTool extends Tool {
  constructor() {
    super()
    this.dragTrackers = []
  }

  setComponentRegistry(registry) {
    super.setComponentRegistry(registry)
    this.dragTrackers = [
      new NodeDragTracker(registry),
      new ConnectDragTracker(registry),
    ]
  }

  onKeyUp(e) {
    if (e.key === 'Escape') {
      this.dragTrackers.forEach((tracker) => tracker.cancel())
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
