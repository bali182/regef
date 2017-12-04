import Tool from '../Tool'
import NodeDragTracker from './NodeDragTracker'

class DefaultTool extends Tool {
  constructor() {
    super()
    this.nodeDragTracker = null
  }

  setComponentRegistry(registry) {
    super.setComponentRegistry(registry)
    this.nodeDragTracker = new NodeDragTracker(registry)
  }

  onMouseDown(e) {
    this.nodeDragTracker.onMouseDown(e)
  }

  onMouseMove(e) {
    this.nodeDragTracker.onMouseMove(e)
  }

  onMouseUp(e) {
    this.nodeDragTracker.onMouseUp(e)
  }
}

export default DefaultTool
