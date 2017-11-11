import Tool from './tool'
import { findPrimaryTarget, findClosestValidParent, buildInitialEventDeltas, buildEventCoordinates } from './toolUtils'

class DefaultTool extends Tool {
  constructor() {
    super()
    this.dragged = null
    this.dragTarget = null
    this.eventDeltas = null
    this.coordinates = null

    this.isMouseDown = false
  }

  onMouseDown(e) {
    const registry = this.getComponentRegistry()
    const root = registry.getDiagramDom()

    this.dragged = findPrimaryTarget(event.target, root, registry)
    this.dragTarget = findClosestValidParent(this.dragged, root, registry)
    this.eventDeltas = buildInitialEventDeltas(e, this.dragged)

    this.isMouseDown = true
    return null
  }

  onMouseMove(e) {
    if (this.isMouseDown) {
      return null
    }
    this.coordinates = buildEventCoordinates(e, this.eventDeltas)
    return null
  }

  onMouseUp(e) {
    this.isMouseDown = false
    return null
  }
}

export default DefaultTool
