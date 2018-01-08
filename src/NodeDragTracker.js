import { point } from 'regef-2dmath'
import { MOVE_CHILD, ADD_CHILD, COMMAND_TARGET, NODE_TYPE, ROOT_TYPE } from './constants'
import BaseDragTracker from './BaseDragTracker'

const ACCEPTED_TYPES = [NODE_TYPE, ROOT_TYPE]

export const buildDeltas = ({ clientX, clientY }, element) => {
  const { x, y } = element.getBoundingClientRect()
  const deltaX = clientX - x
  const deltaY = clientY - y
  return {
    deltaX,
    deltaY,
  }
}

export const buildCoordinates = ({ clientX, clientY }, { deltaX, deltaY }) => ({
  x: clientX - deltaX,
  y: clientY - deltaY,
})

class NodeDragTracker extends BaseDragTracker {
  constructor() {
    super()
    this.target = null
    this.lastTargetParent = null
    this.targetParent = null
    this.currentParent = null
    this.coordinates = null
    this.eventDeltas = null
    this.lastRequest = null
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
    const { x: deltaX, y: deltaY } = buildCoordinates(e, this.eventDeltas)
    const { x, y } = this.targetParent.dom.getBoundingClientRect()
    this.coordinates = {
      deltaX,
      deltaY,
      componentX: deltaX - x,
      componentY: deltaY - y,
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
    return {
      [COMMAND_TARGET]: currentParent.component,
      type: MOVE_CHILD,
      component: target.component.userComponent,
      componentDOM: target.dom,
      container: currentParent.component.userComponent,
      containerDOM: currentParent.dom,
      location: point(coordinates.componentX, coordinates.componentY),
      delta: point(coordinates.deltaX, coordinates.deltaY),
    }
  }

  getAddChildRequest() {
    const { target, targetParent, currentParent, coordinates } = this
    return {
      [COMMAND_TARGET]: targetParent.component,
      type: ADD_CHILD,
      component: target.component.userComponent,
      componentDOM: target.dom,
      targetContainer: targetParent.component.userComponent,
      targetContainerDOM: targetParent.dom,
      container: currentParent.component.userComponent,
      containerDOM: currentParent.dom,
      location: point(coordinates.componentX, coordinates.componentY),
      delta: point(coordinates.deltaX, coordinates.deltaY),
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

    if (this.target === this.registry.getRoot()) {
      // TODO pan or selection
    } else if (this.isMoveChild(e)) {
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
    this.target = this.domHelper.findClosest(e.target, ACCEPTED_TYPES)
    if (this.target !== null) {
      const parent = this.domHelper.findClosest(this.target.dom.parentNode, ACCEPTED_TYPES)
      this.currentParent = parent || this.registry.getRoot()
      this.eventDeltas = buildDeltas(e, this.target.dom)
      this.progress = true
    }
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
    if (this.targetParent !== null && this.lastRequest !== null) {
      this.targetParent.component.eraseFeedback(this.lastRequest)
    }
    if (request !== null && request[COMMAND_TARGET]) {
      request[COMMAND_TARGET].getCommand(request)
    }
    this.progress = false
  }
}

export default NodeDragTracker
