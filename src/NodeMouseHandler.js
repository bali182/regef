import { point } from 'regef-2dmath'
import { MOVE_CHILD, ADD_CHILD, COMMAND_TARGET, NODE_TYPE, ROOT_TYPE } from './constants'
import BaseMouseHandler from './BaseMouseHandler'

const ACCEPTED_TYPES = [NODE_TYPE, ROOT_TYPE]

const buildDeltas = ({ clientX, clientY }, element) => {
  const { x, y } = element.getBoundingClientRect()
  const deltaX = clientX - x
  const deltaY = clientY - y
  return {
    deltaX,
    deltaY,
  }
}

const buildCoordinates = ({ clientX, clientY }, { deltaX, deltaY }) => ({
  x: clientX - deltaX,
  y: clientY - deltaY,
})

export default class NodeMouseHandler extends BaseMouseHandler {
  constructor() {
    super()
    this.target = null
    this.lastTargetParent = null
    this.targetParent = null
    this.currentParent = null
    this.coordinates = null
    this.eventDeltas = null
    this.lastRequest = null
    this.mouseMoved = false
  }

  findTargetedParent(eventTarget) {
    const { domHelper, target, currentParent } = this
    const newTarget = domHelper.findClosest(eventTarget, ACCEPTED_TYPES)
    if (newTarget === null || newTarget === target || target.dom.contains(newTarget.dom)) {
      return currentParent
    }
    return newTarget
  }

  updateCoordinates(e) {
    const { x: absoluteX, y: absoluteY } = buildCoordinates(e, this.eventDeltas)
    const { x, y } = this.registry.root.dom.getBoundingClientRect()
    const location = point(absoluteX - x, absoluteY - y)
    const offset = point(absoluteX, absoluteY)
    const delta = point(e.clientX - this.startLocation.x, e.clientY - this.startLocation.y)
    this.coordinates = {
      location,
      offset,
      delta,
    }
  }

  updateParents(e) {
    const newTargetParent = this.findTargetedParent(e.target)
    const targetParent = this.targetParent
    if (targetParent !== newTargetParent) {
      this.lastTargetParent = targetParent
      this.targetParent = newTargetParent
    } else {
      this.lastTargetParent = targetParent
    }
  }

  getMoveChildRequest() {
    const { target, currentParent, coordinates } = this
    const { location, offset, delta } = coordinates
    return {
      [COMMAND_TARGET]: currentParent.component,
      type: MOVE_CHILD,
      component: target.component.userComponent,
      componentDOM: target.dom,
      container: currentParent.component.userComponent,
      containerDOM: currentParent.dom,
      location,
      offset,
      delta,
    }
  }

  getAddChildRequest() {
    const { target, targetParent, currentParent, coordinates } = this
    const { location, offset, delta } = coordinates
    return {
      [COMMAND_TARGET]: targetParent.component,
      type: ADD_CHILD,
      component: target.component.userComponent,
      componentDOM: target.dom,
      targetContainer: targetParent.component.userComponent,
      targetContainerDOM: targetParent.dom,
      container: currentParent.component.userComponent,
      containerDOM: currentParent.dom,
      location,
      offset,
      delta,
    }
  }

  handleFeedback(lastRequest, request) {
    const { lastTargetParent, targetParent } = this
    if (
      lastRequest !== null &&
      lastTargetParent.dom !== targetParent.dom &&
      lastTargetParent.component !== null
    ) {
      lastTargetParent.component.eraseFeedback(lastRequest)
    }
    if (request !== null) {
      targetParent.component.requestFeedback(request)
    }
  }

  isMoveChild() {
    return this.currentParent === this.targetParent
  }

  isAddChild() {
    return this.currentParent !== this.targetParent
  }

  buildDragRequest(e) {
    if (!this.domHelper.isInsideDiagram(e.target)) {
      return null
    }

    this.updateParents(e)
    this.updateCoordinates(e)

    if (this.isMoveChild(e)) {
      return this.getMoveChildRequest()
    } else if (this.isAddChild(e)) {
      return this.getAddChildRequest()
    }
    return null
  }

  cancel() {
    if (this.progress) {
      if (this.lastRequest !== null && this.targetParent !== null) {
        this.targetParent.component.eraseFeedback(this.lastRequest)
      }
      this.progress = false
      this.lastRequest = null
      this.eventDeltas = null
      this.coordinates = null
      this.targetParent = null
      this.target = null
      this.currentParent = null
    }
  }

  onMouseDown(e) {
    if (!this.domHelper.isInsideDiagram(e.target)) {
      return
    }
    this.target = this.domHelper.findClosest(e.target, NODE_TYPE)
    if (this.target !== null) {
      const parent = this.domHelper.findClosest(this.target.dom.parentNode, ACCEPTED_TYPES)
      this.currentParent = parent || this.registry.root
      this.eventDeltas = buildDeltas(e, this.target.dom)
      this.startLocation = point(e.clientX, e.clientY)
      this.mouseMoved = false
      this.progress = true
    }
  }

  onMouseMove(e) {
    if (!this.progress) {
      return
    }
    this.mouseMoved = true
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
    if (this.targetParent !== null && this.lastRequest !== null) {
      this.targetParent.component.eraseFeedback(this.lastRequest)
    }
    if (request !== null && request[COMMAND_TARGET] && this.mouseMoved) {
      request[COMMAND_TARGET].perform(request)
    }
    this.progress = false
  }
}
