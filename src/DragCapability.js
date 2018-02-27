import { point, rectangle, dimension } from 'regef-geometry'
import { MOVE_CHILDREN, ADD_CHILDREN, NODE_TYPE, ROOT_TYPE, SELECT } from './constants'
import Capability from './Capability'

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

export default class DragCapability extends Capability {
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
    this.startLocation = null
  }

  findTargetedParent(eventTarget) {
    const { domHelper, target, currentParent } = this
    const newTarget = domHelper.findClosest(eventTarget, ACCEPTED_TYPES)
    if (newTarget === null
      || newTarget === target
      || target.dom.contains(newTarget.dom)
      || this.engine.selection().indexOf(newTarget.userComponent) >= 0) {
      return currentParent
    }
    return newTarget
  }

  updateCoordinates(e) {
    const { deltaX, deltaY } = this.eventDeltas
    const { clientX, clientY } = e
    const { x: rootX, y: rootY } = this.registry.root.dom.getBoundingClientRect()
    const location = point(clientX - rootX, clientY - rootY)
    const offset = point(deltaX, deltaY)
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

  getMovedComponents() {
    const target = this.target.userComponent
    if (this.engine.selection().indexOf(target) >= 0) {
      return this.engine.selection()
    }
    return [target]
  }

  getMoveChildRequest() {
    const { currentParent, coordinates } = this
    const { location, offset, delta } = coordinates
    return {
      type: MOVE_CHILDREN,
      components: this.getMovedComponents(),
      container: currentParent.component.userComponent,
      location,
      offset,
      delta,
    }
  }

  getAddChildRequest() {
    const { targetParent, currentParent, coordinates } = this
    const { location, offset, delta } = coordinates
    return {
      type: ADD_CHILDREN,
      components: this.getMovedComponents(),
      targetContainer: targetParent.component.userComponent,
      container: currentParent.component.userComponent,
      location,
      offset,
      delta,
    }
  }

  getSelectionRequest() {
    const { startLocation, target } = this
    return {
      type: SELECT,
      bounds: rectangle(startLocation, dimension(0, 0)),
      startLocation,
      endLocation: startLocation,
      selection: [target.userComponent],
    }
  }

  handleFeedback(lastRequest, request) {
    const { lastTargetParent, targetParent } = this
    if (
      lastRequest !== null &&
      lastTargetParent.dom !== targetParent.dom &&
      lastTargetParent.component !== null
    ) {
      this.engine.editPolicy.eraseFeedback(lastRequest)
    }
    if (request !== null) {
      this.engine.editPolicy.requestFeedback(request)
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
        this.engine.editPolicy.eraseFeedback(this.lastRequest)
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
    const selection = this.engine.selection()
    if (selection.indexOf(this.target.userComponent) < 0) {
      const selectionReq = this.getSelectionRequest()
      this.engine.editPolicy.perform(selectionReq)
    }
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
      this.engine.editPolicy.eraseFeedback(this.lastRequest)
    }
    if (request !== null && this.mouseMoved) {
      this.engine.editPolicy.perform(request)
    }
    this.progress = false
  }
}