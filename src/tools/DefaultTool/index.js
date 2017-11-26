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

class DefaultTool extends Tool {
  constructor() {
    super()
    this.targetDom = null
    this.parentDom = null
    this.newParentDom = null

    this.eventDeltas = null
    this.coordinates = null

    this.isMouseDown = false
  }

  getMoveChildRequest() {
    const { targetDom, newParentDom, coordinates: { x, y } } = this
    const registry = this.getComponentRegistry()
    const childComponent = registry.getByDomElement(targetDom)
    const parentComponent = registry.getByDomElement(newParentDom)
    const { top, left } = newParentDom.getBoundingClientRect()

    return {
      [COMMAND_TARGET]: parentComponent,
      type: MOVE_CHILD,
      component: childComponent.getUserComponent(),
      componentDOM: targetDom,
      container: parentComponent.getUserComponent(),
      containerDOM: newParentDom,
      x: x - left,
      y: y - top,
    }
  }

  getAddChildRequest() {
    const { targetDom, newParentDom, parentDom, coordinates: { x, y } } = this
    const comp = this.getComponentRegistry().getByDomElement(targetDom)
    const targetComp = this.getComponentRegistry().getByDomElement(newParentDom)
    const sourceComp = this.getComponentRegistry().getByDomElement(parentDom)
    const { top, left } = newParentDom.getBoundingClientRect()

    return {
      [COMMAND_TARGET]: targetComp,
      type: ADD_CHILD,
      component: comp.getUserComponent(),
      componentDOM: targetDom,
      targetContainer: targetComp.getUserComponent(),
      targetContainerDOM: newParentDom,
      container: sourceComp.getUserComponent(),
      containerDOM: parentDom,
      x: x - left,
      y: y - top,
    }
  }

  onMouseDown(e) {
    const registry = this.getComponentRegistry()
    const root = registry.getRootDom()

    if (!isElementRelevant(e.target, root)) {
      return null
    }

    this.targetDom = findPrimaryTarget(e.target, root, registry)
    this.parentDom = findClosestValidParent(this.targetDom, root, registry)
    this.eventDeltas = buildInitialEventDeltas(e, this.targetDom)

    this.isMouseDown = true
    return null
  }

  onMouseMove(e) {
    if (!this.isMouseDown) {
      return null
    }

    const registry = this.getComponentRegistry()
    const root = registry.getRootDom()

    if (!isElementRelevant(e.target, root)) {
      return null
    }

    const { parentDom, targetDom, eventDeltas } = this
    this.coordinates = buildEventCoordinates(e, eventDeltas)
    this.newParentDom = findTargetedParent(e, targetDom, root, registry)

    const { newParentDom } = this

    if (targetDom === root) {
      // console.log('pan or selection')
    } else if (parentDom === newParentDom) {
      const request = this.getMoveChildRequest()
      const command = getCommandSafe(request, request[COMMAND_TARGET])
      return command
    } else if (parentDom !== newParentDom) {
      const request = this.getAddChildRequest()
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
