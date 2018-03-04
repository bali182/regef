import { point } from 'regef-geometry'
import { CREATE, NODE_TYPE, ROOT_TYPE, CREATOR_TYPE } from './constants'
import Capability from './Capability'
import { eraseFeedback, requestFeedback, perform } from './EditPolicy'

const ACCEPTED_TYPES = [NODE_TYPE, ROOT_TYPE]

const buildOffset = ({ clientX, clientY }, element) => {
  const { x, y } = element.getBoundingClientRect()
  return {
    x: clientX - x,
    y: clientY - y,
  }
}

export default class CreationCapability extends Capability {
  constructor() {
    super()
    this.target = null
    this.targetParent = null
    this.lastTargetParent = null
    this.coordinates = null
    this.offset = null
    this.lastRequest = null
    this.startLocation = null
  }

  findTargetedParent(eventTarget) {
    return this.engine.domHelper.findClosest(eventTarget, ACCEPTED_TYPES)
  }

  findTargetedCreator(eventTarget) {
    const attachments = this.engine.attachments
    for (let i = 0, len = attachments.length; i < len; i += 1) {
      const attachment = attachments[i]
      const creator = attachment.domHelper.findClosest(eventTarget, CREATOR_TYPE)
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
      const { x: rootX, y: rootY } = this.engine.registry.root.dom.getBoundingClientRect()
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
