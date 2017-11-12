import Tool from './tool'
import { MOVE, MOVE_CHILD, ADD_CHILD, REMOVE_CHILD } from './request'
import {
  findPrimaryTarget,
  findClosestValidParent,
  findTargetedParent,
  buildInitialEventDeltas,
  buildEventCoordinates,
} from './toolUtils'


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

  getMoveCommand() {
    const { draggedDom, coordinates: { x, y } } = this
    const childComponent = this.getComponentRegistry().getByDomElement(draggedDom)
    const moveRequest = {
      type: MOVE,
      x,
      y,
    }
    return childComponent.getEditPolicy().getCommand(moveRequest)
  }

  getMoveChildCommand() {
    const { draggedDom, targetParentDom, coordinates: { x, y } } = this
    const childComponent = this.getComponentRegistry().getByDomElement(draggedDom)
    const parentComponent = this.getComponentRegistry().getByDomElement(targetParentDom)
    const moveChildRequest = {
      type: MOVE_CHILD,
      target: childComponent.getUserComponent(),
      targetDom: draggedDom,
      x,
      y,
    }
    return parentComponent.getEditPolicy().getCommand(moveChildRequest)
  }

  getAddChildCommand() {
    const { draggedDom, targetParentDom, coordinates: { x, y } } = this
    const childComponent = this.getComponentRegistry().getByDomElement(draggedDom)
    const parentComponent = this.getComponentRegistry().getByDomElement(targetParentDom)
    const moveChildRequest = {
      type: ADD_CHILD,
      target: childComponent.getUserComponent(),
      targetDom: draggedDom,
      x,
      y,
    }
    return parentComponent.getEditPolicy().getCommand(moveChildRequest)
  }

  getRemoveChildCommand() {
    const { draggedDom, originalParentDom, coordinates: { x, y } } = this
    const childComponent = this.getComponentRegistry().getByDomElement(draggedDom)
    const parentComponent = this.getComponentRegistry().getByDomElement(originalParentDom)
    const moveChildRequest = {
      type: REMOVE_CHILD,
      target: childComponent.getUserComponent(),
      targetDom: draggedDom,
      x,
      y,
    }
    return parentComponent.getEditPolicy().getCommand(moveChildRequest)
  }

  onMouseDown(e) {
    const registry = this.getComponentRegistry()
    const root = registry.getRootDom()

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

    const { originalParentDom, draggedDom, eventDeltas } = this

    const registry = this.getComponentRegistry()
    const root = registry.getRootDom()
    this.coordinates = buildEventCoordinates(e, eventDeltas)
    this.targetParentDom = findTargetedParent(e, draggedDom, root, registry)

    const { targetParentDom } = this

    if (draggedDom === root) {
      // console.log('pan or selection')
    } else if (originalParentDom === targetParentDom) {
      const move = this.getMoveCommand()
      return move === null ? this.getMoveChildCommand() : move
    } else if (originalParentDom !== targetParentDom) {
      const addCommand = this.getAddChildCommand()
      const removeCommand = this.getRemoveChildCommand()
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
