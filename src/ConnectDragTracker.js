import { point } from 'regef-2dmath'
import DragTracker from './DragTracker'
import DomHelper from './DomHelper'
import { COMMAND_TARGET, PORT_TYPE, START_CONNECTION, END_CONNECTION } from './constants'

class ConnectDragTracker extends DragTracker {
  constructor(registry) {
    super(registry)
    this.domHelper = new DomHelper(registry)
    this.source = null
    this.target = null
    this.coordinates = null
    this.lastRequest = null
  }

  cancel() {
    if (this.progress) {
      if (this.lastRequest !== null) {
        this.lastRequest[COMMAND_TARGET].eraseFeedback(this.lastRequest)
      }
      this.source = null
      this.target = null
      this.progress = false
    }
  }

  getStartConnectionRequest() {
    return {
      // TODO think about this decision
      [COMMAND_TARGET]: this.source.component,
      type: START_CONNECTION,
      source: this.source.component.userComponent,
      sourceDOM: this.source.dom,
      location: point(this.coordinates),
    }
  }

  getEndConnectionRequest() {
    return {
      // TODO think about this decision
      [COMMAND_TARGET]: this.target.component,
      type: END_CONNECTION,
      source: this.source.component.userComponent,
      sourceDOM: this.source.dom,
      target: this.target.component.userComponent,
      targetDOM: this.target.dom,
      location: point(this.coordinates),
    }
  }

  buildCoordinates({ clientX, clientY }) {
    const { top, left } = this.registry.getRoot().dom.getBoundingClientRect()
    const x = clientX - left
    const y = clientY - top
    return { x, y }
  }

  buildEndConnectRequest(e) {
    if (!this.domHelper.isInsideDiagram(e.target)) {
      return null
    }

    this.target = this.domHelper.findClosest(e.target)
    this.coordinates = this.buildCoordinates(e)
    return this.getEndConnectionRequest()
  }

  buildStartConnectionRequest(e) {
    if (!this.domHelper.isInsideDiagram(e.target)) {
      return null
    }
    const source = this.domHelper.findClosest(e.target, PORT_TYPE)
    if (source !== null) {
      this.source = source
      this.coordinates = this.buildCoordinates(e)
      return this.getStartConnectionRequest()
    }
    return null
  }

  handleFeedback(lastRequest, request) {
    if (lastRequest !== null
      && (request === null || request[COMMAND_TARGET] !== lastRequest[COMMAND_TARGET])) {
      lastRequest[COMMAND_TARGET].eraseFeedback(lastRequest)
    }
    if (request !== null) {
      request[COMMAND_TARGET].requestFeedback(request)
    }
  }

  onMouseDown(e) {
    const request = this.buildStartConnectionRequest(e)
    if (request !== null) {
      this.progress = true
    }
    this.handleFeedback(this.lastRequest, request)
    this.lastRequest = request
  }

  onMouseMove(e) {
    if (!this.progress) {
      return
    }
    const request = this.buildEndConnectRequest(e)
    this.handleFeedback(this.lastRequest, request)
    this.lastRequest = request
  }

  onMouseUp(e) {
    if (!this.progress) {
      return
    }
    const request = this.buildEndConnectRequest(e)
    if (this.lastRequest !== null && this.lastRequest[COMMAND_TARGET] !== null) {
      this.lastRequest[COMMAND_TARGET].eraseFeedback(this.lastRequest)
    }
    if (request !== null && request[COMMAND_TARGET]) {
      request[COMMAND_TARGET].getCommand(request)
    }
    this.progress = false
  }
}

export default ConnectDragTracker
