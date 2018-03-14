import { point } from 'regef-geometry'
import { CREATE, NODE_TYPE, ROOT_TYPE, CREATOR_TYPE, DEFAULT_PART_ID } from './constants'
import Capability from './Capability'
import { eraseFeedback, requestFeedback, perform } from './utils'

const ACCEPTED_TYPES = [NODE_TYPE, ROOT_TYPE]

const buildOffset = ({ clientX, clientY }, element) => {
  const { x, y } = element.getBoundingClientRect()
  return {
    x: clientX - x,
    y: clientY - y,
  }
}

export default class CreationCapability extends Capability {
  constructor({ part = DEFAULT_PART_ID } = {}) {
    super()
    this.target = null
    this.targetParent = null
    this.lastTargetParent = null
    this.coordinates = null
    this.offset = null
    this.lastRequest = null
    this.startLocation = null
    this.partId = part
  }

  part() {
    return this.engine.part(this.partId)
  }

  findTargetedParent(eventTarget) {
    return this.part().domHelper
      .findClosest(eventTarget, (wrapper) => ACCEPTED_TYPES.indexOf(wrapper.component.type) >= 0)
  }

  findTargetedCreator(eventTarget) {
    const parts = this.engine.parts
    for (let i = 0, len = parts.length; i < len; i += 1) {
      const part = parts[i]
      const creator = part.domHelper
        .findClosest(eventTarget, (wrapper) => wrapper.component.type === CREATOR_TYPE)
      if (creator !== null) {
        return creator
      }
    }
    return null
  }

  updateTargetParent(e) {
    const newTargetParent = this.findTargetedParent(e.target)
    const targetParent = this.targetParent
    if (targetParent !== newTargetParent) {
      this.lastTargetParent = targetParent
      this.targetParent = newTargetParent
    } else {
      this.lastTargetParent = targetParent
    }
  }

  updateCoordinates(e) {
    const { clientX, clientY } = e
    const screenLocation = point(clientX, clientY)
    const offset = point(this.offset)
    if (this.targetParent !== null) {
      const { x: rootX, y: rootY } = this.part().registry.root.dom.getBoundingClientRect()
      this.coordinates = {
        offset,
        location: point(clientX - rootX, clientY - rootY),
        screenLocation,
      }
    } else {
      this.coordinates = {
        offset,
        location: null,
        screenLocation,
      }
    }
  }

  getCreateChildRequest() {
    const { targetParent, coordinates, target } = this
    const { location, offset, screenLocation } = coordinates
    return {
      type: CREATE,
      component: target.userComponent,
      targetContainer: targetParent === null ? null : targetParent.userComponent,
      screenLocation,
      location,
      offset,
    }
  }

  handleFeedback(lastRequest, request) {
    const { lastTargetParent, targetParent } = this
    if (lastRequest !== null && lastTargetParent !== targetParent) {
      eraseFeedback(this.engine.editPolicies, lastRequest)
    }
    if (request !== null) {
      requestFeedback(this.engine.editPolicies, request)
    }
  }

  cleanupFeedback() {
    if (this.lastRequest !== null) {
      eraseFeedback(this.engine.editPolicies, this.lastRequest)
    }
  }

  buildDragRequest(e) {
    this.updateTargetParent(e)
    this.updateCoordinates(e)
    return this.getCreateChildRequest()
  }

  cancel() {
    if (this.progress) {
      this.cleanupFeedback()
      this.progress = false
      this.lastRequest = null
      this.eventDeltas = null
      this.coordinates = null
      this.targetParent = null
      this.target = null
    }
  }

  onMouseDown(e) {
    this.target = this.findTargetedCreator(e.target)
    if (this.target === null || this.target === undefined) {
      return
    }
    this.startLocation = point(e.clientX, e.clientY)
    this.offset = buildOffset(e, this.target.dom)
    this.progress = true
  }

  onMouseMove(e) {
    if (!this.progress) {
      return
    }
    const request = this.buildDragRequest(e)
    this.handleFeedback(this.lastRequest, request)
    if (request !== null) {
      this.lastRequest = request
    }
  }

  onMouseUp(e) {
    if (!this.progress) {
      return
    }
    const request = this.buildDragRequest(e)
    this.cleanupFeedback()
    if (request !== null) {
      perform(this.engine.editPolicies, request)
    }
    this.progress = false
  }
}
