import { point } from 'regef-geometry'
import Capability from './Capability'
import { PORT_TYPE, START_CONNECTION, END_CONNECTION, DEFAULT_PART_ID } from './constants'
import { eraseFeedback, requestFeedback, perform } from './EditPolicy'

export default class ConnectMouseHandler extends Capability {
  constructor({ part = DEFAULT_PART_ID } = {}) {
    super()
    this.source = null
    this.target = null
    this.coordinates = null
    this.lastRequest = null
    this.partId = part
  }

  part() {
    return this.engine.part(this.partId)
  }

  cancel() {
    if (this.progress) {
      if (this.lastRequest !== null) {
        eraseFeedback(this.engine.editPolicies, this.lastRequest)
      }
      this.source = null
      this.target = null
      this.progress = false
    }
  }

  getStartConnectionRequest() {
    return {
      type: START_CONNECTION,
      source: this.source.component.userComponent,
      location: point(this.coordinates),
    }
  }

  getEndConnectionRequest() {
    return {
      type: END_CONNECTION,
      source: this.source.component.userComponent,
      target: this.target.component.userComponent,
      location: point(this.coordinates),
    }
  }

  buildCoordinates({ clientX, clientY }) {
    const { top, left } = this.part().registry.root.dom.getBoundingClientRect()
    const x = clientX - left
    const y = clientY - top
    return { x, y }
  }

  buildEndConnectRequest(e) {
    if (!this.part().domHelper.partContains(e.target)) {
      return null
    }

    this.target = this.part().domHelper.findClosest(e.target)
    this.coordinates = this.buildCoordinates(e)
    return this.getEndConnectionRequest()
  }

  buildStartConnectionRequest(e) {
    if (!this.part().domHelper.partContains(e.target)) {
      return null
    }
    const source = this.part().domHelper
      .findClosest(e.target, (wrapper) => wrapper.component.type === PORT_TYPE)
    if (source !== null) {
      this.source = source
      this.coordinates = this.buildCoordinates(e)
      return this.getStartConnectionRequest()
    }
    return null
  }

  handleFeedback(lastRequest, request) {
    if (lastRequest !== null
      && (request === null || request.target !== lastRequest.target)) {
      eraseFeedback(this.engine.editPolicies, lastRequest)
    }
    if (request !== null) {
      requestFeedback(this.engine.editPolicies, request)
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
    if (this.lastRequest !== null) {
      eraseFeedback(this.engine.editPolicies, this.lastRequest)
    }
    if (request !== null) {
      perform(this.engine.editPolicies, request)
    }
    this.progress = false
  }
}
