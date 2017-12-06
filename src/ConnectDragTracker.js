import DragTracker from './DragTracker'
import ComponentWrapper from './ComponentWrapper'
import DomHelper from './DomHelper'
import { COMMAND_TARGET, PORT_TYPE } from './constants'

export const buildDeltas = ({ clientX, clientY }, element) => {
  const { top, left } = element.getBoundingClientRect()
  const deltaX = clientX - left
  const deltaY = clientY - top
  return {
    deltaX,
    deltaY,
  }
}

export const buildCoordinates = ({ clientX, clientY }, { deltaX, deltaY }) => ({
  x: clientX - deltaX,
  y: clientY - deltaY,
})

class ConnectDragTracker extends DragTracker {
  constructor(registry) {
    super(registry)
    this.domHelper = new DomHelper(registry)
    this.source = new ComponentWrapper(registry, this.domHelper)
    this.target = new ComponentWrapper(registry, this.domHelper)
    this.coordinates = null
    this.eventDeltas = null
    this.lastRequest = null
  }

  cancel() {
    if (this.progress) {
      this.source.reset()
      this.target.reset()
    }
  }

  onMouseDown(e) {
    if (!this.domHelper.isInsideDiagram(e.target)) {
      return
    }
    const source = this.domHelper.findClosestElement(e.target, PORT_TYPE)
    if (source !== null) {
      this.source.setDom(source)
      this.eventDeltas = buildDeltas(e, source)
      this.dragging = true
    }
  }

  onMouseMove(e) {
    if (!this.progress) {
      return
    }
  }

  onMouseUp(e) {
    if (!this.progress) {
      return
    }
    this.progress = false
  }
}

export default ConnectDragTracker
