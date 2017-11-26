import Tool from '../Tool'
import { MOVE_CHILD, ADD_CHILD } from '../../request'
import {
  findPrimaryTarget,
  findClosestValidParent,
  findTargetedParent,
  buildInitialEventDeltas,
  buildEventCoordinates,
  isElementRelevant,
  getCommandSafe,
} from './toolUtils'

const COMMAND_TARGET = Symbol('COMMAND_TARGET')

class El {
  constructor() {
    this.registry = null
    this.component = null
    this.dom = null
  }

  __findComponent(el) {
    const { registry } = this
    const component = registry.getByDomElement(el)
    if (component === null && el === registry.getRootDom()) {
      return registry.getRoot()
    }
    return component
  }

  setDom(el) {
    if (el !== this.dom) {
      this.dom = el
      this.component = this.__findComponent(el)
    }
    return this
  }
}

class DefaultTool extends Tool {
  constructor() {
    super()
    this.target = new El()
    this.lastTargetParent = new El()
    this.targetParent = new El()
    this.currentParent = new El()
    this.eventDeltas = null
    this.coordinates = null
    this.isMouseDown = false
  }

  setComponentRegistry(registry) {
    super.setComponentRegistry(registry)
    this.target.registry = registry
    this.lastTargetParent.registry = registry
    this.targetParent.registry = registry
    this.currentParent.registry = registry
  }

  updateCoordinates(e) {
    const { x: deltaX, y: deltaY } = buildEventCoordinates(e, this.eventDeltas)
    const { top, left } = this.targetParent.dom.getBoundingClientRect()
    this.coordinates = {
      deltaX,
      deltaY,
      componentX: deltaX - left,
      componentY: deltaY - top,
    }
  }

  updateParents(e) {
    const newTargetParentDom = findTargetedParent(
      e,
      this.target.dom,
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

  handleFeedback(request) {
    const { lastTargetParent, targetParent } = this
    if (lastTargetParent.dom !== targetParent.dom && lastTargetParent.component !== null) {
      lastTargetParent.component.eraseFeedback(request)
    }
    targetParent.component.requestFeedback(request)
  }

  onMouseDown(e) {
    const registry = this.getComponentRegistry()
    const root = registry.getRootDom()

    if (!isElementRelevant(e.target, root)) {
      return null
    }

    this.target.setDom(findPrimaryTarget(e.target, root, registry))
    this.currentParent.setDom(findClosestValidParent(this.target.dom, root, registry))
    this.eventDeltas = buildInitialEventDeltas(e, this.target.dom)

    this.isMouseDown = true
    return null
  }

  onMouseMove(e) {
    if (!this.isMouseDown) {
      return null
    }

    const root = this.registry.getRootDom()
    let request = null

    if (!isElementRelevant(e.target, root)) {
      return null
    }

    this.updateParents(e)
    this.updateCoordinates(e)

    if (this.target.dom === root) {
      // console.log('pan or selection')
    } else if (this.currentParent.dom === this.targetParent.dom) {
      request = this.getMoveChildRequest()
    } else if (this.currentParent.dom !== this.targetParent.dom) {
      request = this.getAddChildRequest()
    }

    if (request !== null) {
      this.handleFeedback(request)
      const command = getCommandSafe(request, request[COMMAND_TARGET])
      return command
    }

    return null
  }

  onMouseUp(e) {
    if (!this.isMouseDown) {
      return null
    }
    this.isMouseDown = false
    return null
  }
}

export default DefaultTool
