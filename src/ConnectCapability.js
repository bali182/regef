import { point } from 'regef-geometry'
import Capability from './Capability'
import { PORT_TYPE, START_CONNECTION, END_CONNECTION, NODE_TYPE, ROOT_TYPE } from './constants'
import { eraseFeedback, requestFeedback, perform, partMatches, typeMatches } from './utils'

export default class ConnectCapability extends Capability {
  constructor(config = {
    parts: null,
    sourceTypes: [PORT_TYPE],
    targetTypes: [ROOT_TYPE, NODE_TYPE],
  }) {
    super()
    this.source = null
    this.target = null
    this.coordinates = null
    this.lastRequest = null
    this.config = config
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

  buildEndConnectRequest(e) {
    const part = this.engine.domHelper.findPart(e.target, partMatches(this.config.parts))
    if (!part) {
      return null
    }
    const target = part.domHelper.findClosest(e.target, typeMatches(this.config.targetTypes))
    if (!target) {
      return null
    }
    this.target = target
    this.coordinates = point(e.clientX, e.clientY)
    return this.getEndConnectionRequest()
  }

  buildStartConnectionRequest(e) {
    const part = this.engine.domHelper.findPart(e.target, partMatches(this.config.parts))
    if (!part) {
      return null
    }
    const source = part.domHelper.findClosest(e.target, typeMatches(this.config.sourceTypes))
    if (!source) {
      return null
    }
    this.source = source
    this.coordinates = point(e.clientX, e.clientY)
    return this.getStartConnectionRequest()
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
