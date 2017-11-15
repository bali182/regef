import Tool from '../Tool'
import { MOVE_CHILD, ADD_CHILD } from '../../request'
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
    const { draggedDom, targetParentDom, originalParentDom, coordinates: { x, y } } = this
    const comp = this.getComponentRegistry().getByDomElement(draggedDom)
    const targetComp = this.getComponentRegistry().getByDomElement(targetParentDom)
    const sourceComp = this.getComponentRegistry().getByDomElement(originalParentDom)
    return {
      type: ADD_CHILD,
      component: comp.getUserComponent(),
      componentDOM: draggedDom,
      target: targetComp.getUserComponent(),
      targetrDOM: targetParentDom,
      source: sourceComp.getUserComponent(),
      sourceDOM: originalParentDom,
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
      const command = this.getCommand(addReq, this.targetParentDom)
      return command
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
