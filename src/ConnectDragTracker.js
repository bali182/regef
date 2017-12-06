import DragTracker from './DragTracker'
import ComponentWrapper from './ComponentWrapper'
import DomHelper from './DomHelper'
import { COMMAND_TARGET, PORT_TYPE, START_CONNECTION, END_CONNECTION } from './constants'

class ConnectDragTracker extends DragTracker {
  constructor(registry) {
    super(registry)
    this.domHelper = new DomHelper(registry)
    this.source = new ComponentWrapper(registry, this.domHelper)
    this.target = new ComponentWrapper(registry, this.domHelper)
    this.coordinates = null
    this.lastRequest = null
  }

  cancel() {
    if (this.progress) {
      this.source.reset()
      this.target.reset()
    }
  }

  getStartConnectionRequest() {
    return {
      type: START_CONNECTION,
      source: this.source.component,
      sourceDOM: this.source.dom,
      ...this.coordinates,
    }
  }

  getEndConnectionRequest() {
    return {
      type: END_CONNECTION,
      source: this.source.component,
      sourceDOM: this.source.dom,
      target: this.target.component,
      targetDOM: this.target.dom,
      ...this.coordinates,
    }
  }

  buildCoordinates({ clientX, clientY }) {
    const { top, left } = this.registry.getRootDom().getBoundingClientRect()
    const x = clientX - left
    const y = clientY - top
    return { x, y }
  }

  buildEndConnectRequest(e) {
    if (!this.domHelper.isInsideDiagram(e.target)) {
      return null
    }

    this.target.setDom(this.domHelper.findClosestElement(e.target))
    this.coordinates = this.buildCoordinates(e)
    return this.getEndConnectionRequest()
  }

  buildStartConnectionRequest(e) {
    if (!this.domHelper.isInsideDiagram(e.target)) {
      return null
    }
    const source = this.domHelper.findClosestElement(e.target, PORT_TYPE)
    if (source !== null) {
      this.source.setDom(source)
      this.coordinates = this.buildCoordinates(e)
      return this.getStartConnectionRequest()
    }
    return null
  }

  onMouseDown(e) {
    const req = this.buildStartConnectionRequest(e)
    if (req !== null) {
      this.progress = true
    }
  }

  onMouseMove(e) {
    if (!this.progress) {
      return
    }
    const req = this.buildEndConnectRequest(e)
  }

  onMouseUp(e) {
    if (!this.progress) {
      return
    }
    const req = this.buildEndConnectRequest(e)
    this.progress = false
  }
}

export default ConnectDragTracker
