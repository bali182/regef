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
