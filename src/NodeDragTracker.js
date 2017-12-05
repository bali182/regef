import DragTracker from './DragTracker'
import ComponentWrapper from './ComponentWrapper'
import { MOVE_CHILD, ADD_CHILD, COMMAND_TARGET } from './constants'

import {
  findPrimaryTarget,
  findClosestValidParent,
  findTargetedParent,
  buildInitialEventDeltas,
  buildEventCoordinates,
  isElementRelevant,
} from './utils/toolUtils'

class NodeDragTracker extends DragTracker {
  constructor(registry) {
    super(registry)
    this.target = new ComponentWrapper(registry)
    this.lastTargetParent = new ComponentWrapper(registry)
    this.targetParent = new ComponentWrapper(registry)
    this.currentParent = new ComponentWrapper(registry)
    this.coordinates = null
    this.eventDeltas = null
    this.lastRequest = null
    this.dragging = false
  }

  updateCoordinates(e) {
    const { x: deltaX, y: deltaY } = buildEventCoordinates(e, this.eventDeltas)
    const { top, left } = this.targetParent.dom.getBoundingClientRect()
    const { width, height } = this.target.dom.getBoundingClientRect()
    this.coordinates = {
      deltaX,
      deltaY,
      componentX: deltaX - left,
      componentY: deltaY - top,
      componentWidth: width,
      componentHeight: height,
    }
  }

  updateParents(e) {
    const newTargetParentDom = findTargetedParent(
      e,
      this.target.dom,
      this.currentParent.dom,
      this.registry.getRootDom(),
      this.registry,
    )
    const targetParentDom = this.targetParent.dom
    if (targetParentDom !== newTargetParentDom) {
      this.lastTargetParent.setDom(targetParentDom)
      this.targetParent.setDom(newTargetParentDom)
    } else {
      this.lastTargetParent.setDom(targetParentDom)
    }
  }

  getMoveChildRequest() {
    const { target, currentParent, coordinates } = this
    return {
      [COMMAND_TARGET]: currentParent.component,
      type: MOVE_CHILD,
      component: target.component.getUserComponent(),
      componentDOM: target.dom,
      container: currentParent.component.getUserComponent(),
      containerDOM: currentParent.dom,
      ...coordinates,
    }
  }

  getAddChildRequest() {
    const { target, targetParent, currentParent, coordinates } = this
    return {
      [COMMAND_TARGET]: targetParent.component,
      type: ADD_CHILD,
      component: target.component.getUserComponent(),
      componentDOM: target.dom,
      targetContainer: targetParent.component.getUserComponent(),
      targetContainerDOM: targetParent.dom,
      container: currentParent.component.getUserComponent(),
      containerDOM: currentParent.dom,
      ...coordinates,
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

  isMoveChild(e) {
    const { currentParent, targetParent, target } = this
    return currentParent.dom === targetParent.dom
      || target.dom === e.target
      || target.dom.contains(e.target) // TODO check what's wrong with compareDocumentPosition
  }

  isAddChild(/* e */) {
    const { currentParent, targetParent } = this
    return currentParent.dom !== targetParent.dom
  }

  buildDragRequest(e) {
    const root = this.registry.getRootDom()

    if (!isElementRelevant(e.target, root)) {
      return null
    }

    this.updateParents(e)
    this.updateCoordinates(e)

    if (this.target.dom === root) {
      // TODO pan or selection
    } else if (this.isMoveChild(e)) {
      return this.getMoveChildRequest()
    } else if (this.isAddChild(e)) {
      return this.getAddChildRequest()
    }

    return null
  }

  cancelDrag() {
    if (this.dragging) {
      if (this.lastRequest !== null && this.targetParent !== null) {
        this.targetParent.component.eraseFeedback(this.lastRequest)
      }
      this.dragging = false
      this.lastRequest = null
      this.eventDeltas = null
      this.coordinates = null
      this.targetParent.reset()
      this.target.reset()
      this.currentParent.reset()
    }
  }

  onMouseDown(e) {
    const root = this.registry.getRootDom()

    if (isElementRelevant(e.target, root)) {
      this.target.setDom(findPrimaryTarget(e.target, root, this.registry))
      this.currentParent.setDom(findClosestValidParent(this.target.dom, root, this.registry))
      this.eventDeltas = buildInitialEventDeltas(e, this.target.dom)
      this.dragging = true
    }
  }

  onMouseMove(e) {
    if (!this.dragging) {
      return
    }
    const request = this.buildDragRequest(e)
    this.handleFeedback(this.lastRequest, request)
    if (request !== null) {
      this.lastRequest = request
    }
  }

  onMouseUp(e) {
    if (!this.dragging) {
      return
    }
    const request = this.buildDragRequest(e)
    this.dragging = false
    if (this.targetParent !== null && this.lastRequest !== null) {
      this.targetParent.component.eraseFeedback(this.lastRequest)
    }
    if (request !== null && request[COMMAND_TARGET]) {
      request[COMMAND_TARGET].getCommand(request)
    }
  }
}

export default NodeDragTracker
