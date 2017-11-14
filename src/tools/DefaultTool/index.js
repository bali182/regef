import Tool from '../Tool'
import { MOVE_CHILD, ADD_CHILD, REMOVE_CHILD } from '../../request'
import {
  findPrimaryTarget,
  findClosestValidParent,
  findTargetedParent,
  buildInitialEventDeltas,
  buildEventCoordinates,
  isElementRelevant,
  findAllTargets,
  getCommandSafe,
} from './toolUtils'
import { compose } from '../../command'

class DefaultTool extends Tool {
  constructor() {
    super()
    this.draggedDom = null
    this.originalParentDom = null
    this.targetParentDom = null

    this.eventDeltas = null
    this.coordinates = null

    this.isMouseDown = false
  }

  getMoveChildRequest() {
    const { draggedDom, targetParentDom, coordinates: { x, y } } = this
    const registry = this.getComponentRegistry()
    const childComponent = registry.getByDomElement(draggedDom)
    const parentComponent = registry.getByDomElement(targetParentDom)

    return {
      type: MOVE_CHILD,
      target: childComponent.getUserComponent(),
      targetDOM: draggedDom,
      receiver: parentComponent.getUserComponent(),
      receiverDOM: targetParentDom,
      x,
      y,
    }
  }

  getCommand(request, dom) {
    const registry = this.getComponentRegistry()
    const root = registry.getRootDom()
    const targets = findAllTargets(dom, root, registry)
    const commands = targets.map((target) => {
      const component = registry.getByDomElement(target)
      return getCommandSafe(request, component)
    })
    return compose(commands)
  }

  getAddChildRequest() {
    const { draggedDom, targetParentDom, coordinates: { x, y } } = this
    const childComponent = this.getComponentRegistry().getByDomElement(draggedDom)
    const parentComponent = this.getComponentRegistry().getByDomElement(targetParentDom)
    return {
      type: ADD_CHILD,
      target: childComponent.getUserComponent(),
      targetDOM: draggedDom,
      receiver: parentComponent.getUserComponent(),
      receiverDOM: targetParentDom,
      x,
      y,
    }
  }

  getRemoveChildRequest() {
    const { draggedDom, originalParentDom, coordinates: { x, y } } = this
    const childComponent = this.getComponentRegistry().getByDomElement(draggedDom)
    const parentComponent = this.getComponentRegistry().getByDomElement(originalParentDom)
    return {
      type: REMOVE_CHILD,
      target: childComponent.getUserComponent(),
      targetDOM: draggedDom,
      receiver: parentComponent.getUserComponent(),
      receiverDOM: originalParentDom,
      x,
      y,
    }
  }

  onMouseDown(e) {
    const registry = this.getComponentRegistry()
    const root = registry.getRootDom()

    if (!isElementRelevant(event.target, root)) {
      return null
    }

    this.draggedDom = findPrimaryTarget(event.target, root, registry)
    this.originalParentDom = findClosestValidParent(this.draggedDom, root, registry)
    this.eventDeltas = buildInitialEventDeltas(e, this.draggedDom)

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

    const { originalParentDom, draggedDom, eventDeltas } = this
    this.coordinates = buildEventCoordinates(e, eventDeltas)
    this.targetParentDom = findTargetedParent(e, draggedDom, root, registry)

    const { targetParentDom } = this

    if (draggedDom === root) {
      // console.log('pan or selection')
    } else if (originalParentDom === targetParentDom) {
      const request = this.getMoveChildRequest()
      const command = this.getCommand(request, this.targetParentDom)
      return command
    } else if (originalParentDom !== targetParentDom) {
      const addReq = this.getAddChildRequest()
      const removeReq = this.getRemoveChildRequest()
      const add = this.getCommand(addReq, this.targetParentDom)
      const remove = this.getCommand(removeReq, this.originalParentDom)
      return compose([add, remove])
    } else {
      console.log('wtf')
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
