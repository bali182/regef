import { point, Point } from 'regef-geometry'
import { Capability } from './Capability'
import { START_CONNECTION, END_CONNECTION, Id, Intent, StartConnectionIntent, EndConnectionIntent } from './constants'
import {
  eraseFeedback,
  requestFeedback,
  perform,
  partMatches,
  typeMatches,
  isLeftButton,
} from './utils'
import { Engine } from './Engine';
import { ComponentWrapper } from './ComponentWrapper';

type ConnectCapabilityConfig = {
  parts?: Id[]
  sourceTypes?: Id[]
  targetTypes?: Id[]
}

const DEFAULT_CONFIG: ConnectCapabilityConfig = {
  parts: null,
  sourceTypes: [],
  targetTypes: [],
}

type ConnectIntent = StartConnectionIntent | EndConnectionIntent

export default class ConnectCapability extends Capability<ConnectCapabilityConfig> {
  private source: ComponentWrapper
  private target: ComponentWrapper
  private coordinates: Point
  private lastRequest: ConnectIntent

  constructor(engine: Engine, config: ConnectCapabilityConfig = {}) {
    super(engine, { ...DEFAULT_CONFIG, ...config })
    this.init()
  }

  init() {
    this.progress = false
    this.source = null
    this.target = null
    this.coordinates = null
    this.lastRequest = null
  }

  cancel() {
    if (this.progress) {
      if (this.lastRequest !== null) {
        eraseFeedback(this.engine.editPolicies, this.lastRequest)
      }
      this.init()
    }
  }

  getStartConnectionRequest(): StartConnectionIntent {
    return {
      type: START_CONNECTION,
      source: this.source.userComponent,
      location: point(this.coordinates),
    }
  }

  getEndConnectionRequest(): EndConnectionIntent {
    return {
      type: END_CONNECTION,
      source: this.source.userComponent,
      target: this.target.userComponent,
      location: point(this.coordinates),
    }
  }

  buildEndConnectRequest(e: MouseEvent) {
    const part = this.engine.domHelper.findPart(e.target as Element, partMatches(this.config.parts))
    if (!part) {
      return null
    }
    const target = part.domHelper.findClosest(e.target as Element, typeMatches(this.config.targetTypes))
    if (!target) {
      return null
    }
    this.target = target
    this.coordinates = point(e.clientX, e.clientY)
    return this.getEndConnectionRequest()
  }

  buildStartConnectionRequest(e: MouseEvent) {
    const part = this.engine.domHelper.findPart(e.target as Element, partMatches(this.config.parts))
    if (!part) {
      return null
    }
    const source = part.domHelper.findClosest(e.target as Element, typeMatches(this.config.sourceTypes))
    if (!source) {
      return null
    }
    this.source = source
    this.coordinates = point(e.clientX, e.clientY)
    return this.getStartConnectionRequest()
  }

  handleFeedback(lastRequest: ConnectIntent, request: ConnectIntent) {
    if (lastRequest !== null && (request === null || (request as EndConnectionIntent).target !== (lastRequest as EndConnectionIntent).target)) {
      eraseFeedback(this.engine.editPolicies, lastRequest)
    }
    if (request !== null) {
      requestFeedback(this.engine.editPolicies, request)
    }
  }

  onMouseDown(e: MouseEvent) {
    if (!isLeftButton(e)) {
      return
    }
    const request = this.buildStartConnectionRequest(e)
    if (request !== null) {
      this.progress = true
    }
    this.handleFeedback(this.lastRequest, request)
    this.lastRequest = request
  }

  onMouseMove(e: MouseEvent) {
    if (!this.progress) {
      return
    }
    const request = this.buildEndConnectRequest(e)
    this.handleFeedback(this.lastRequest, request)
    this.lastRequest = request
  }

  onMouseUp(e: MouseEvent) {
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
    this.init()
  }
}
