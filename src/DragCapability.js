import { point, rectangle, dimension } from 'regef-geometry'
import { MOVE, ADD, NODE_TYPE, ROOT_TYPE, SELECT } from './constants'
import Capability from './Capability'
import { eraseFeedback, requestFeedback, perform } from './EditPolicy'
import { typeMatches, partMatches } from './utils'

const ACCEPTED_TYPES = [NODE_TYPE, ROOT_TYPE]

const buildOffset = ({ clientX, clientY }, element) => {
  const { x, y } = element.getBoundingClientRect()
  return point(clientX - x, clientY - y)
}

export default class DragCapability extends Capability {
  constructor(config = { parts: null, types: [NODE_TYPE] }) {
    super()
    this.target = null
    this.lastTargetParent = null
    this.targetParent = null
    this.currentParent = null
    this.coordinates = null
    this.offset = null
    this.lastRequest = null
    this.mouseMoved = false
    this.startLocation = null
    this.config = config
  }

  findTargetedParent(eventTarget, part) {
    const { target, currentParent } = this
    if (!part) {
      return currentParent
    }
    const newTarget = part.domHelper.findClosest(eventTarget, partMatches(ACCEPTED_TYPES)) // TODO
    if (newTarget === null
      || newTarget === target
      || target.dom.contains(newTarget.dom)
      || this.engine.selection().indexOf(newTarget.userComponent) >= 0) {
      return currentParent
    }
    return newTarget
  }

  updateCoordinates({ clientX, clientY }, part) {
    const { x: rootX, y: rootY } = part.registry.root.dom.getBoundingClientRect()
    const location = point(clientX - rootX, clientY - rootY)
    const delta = point(clientX - this.startLocation.x, clientY - this.startLocation.y)
    this.coordinates = {
      location,
      offset: this.offset,
      delta,
    }
  }

  updateParents(e, part) {
    const newTargetParent = this.findTargetedParent(e.target, part)
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
      type: MOVE,
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
      type: ADD,
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
      eraseFeedback(this.engine.editPolicies, lastRequest)
    }
    if (request !== null) {
      requestFeedback(this.engine.editPolicies, request)
    }
  }

  buildDragRequest(e) {
    const part = this.engine.domHelper.findPart(e.target, partMatches(this.config.parts))
    if (!part) {
      return null
    }

    this.updateParents(e, part)
    this.updateCoordinates(e, part)

    if (this.currentParent === this.targetParent) {
      return this.getMoveChildRequest()
    } else if (this.currentParent !== this.targetParent) {
      return this.getAddChildRequest()
    }
    return null
  }

  cancel() {
    if (this.progress) {
      if (this.lastRequest !== null && this.targetParent !== null) {
        eraseFeedback(this.engine.editPolicies, this.lastRequest)
      }
      this.progress = false
      this.lastRequest = null
      this.offset = null
      this.coordinates = null
      this.targetParent = null
      this.target = null
      this.currentParent = null
    }
  }

  onMouseDown(e) {
    const part = this.engine.domHelper.findPart(e.target, partMatches(this.config.parts))
    if (!part) {
      return
    }
    this.target = part.domHelper.findClosest(e.target, typeMatches(this.config.types))
    if (this.target !== null) {
      const parent = part.domHelper.findClosest(
        this.target.dom.parentNode,
        (wrapper) => ACCEPTED_TYPES.indexOf(wrapper.component.type) >= 0,
      )
      this.currentParent = parent || part.registry.root
      this.offset = buildOffset(e, this.target.dom)
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
      perform(this.engine.editPolicies, this.getSelectionRequest())
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
      eraseFeedback(this.engine.editPolicies, this.lastRequest)
    }
    if (request !== null && this.mouseMoved) {
      perform(this.engine.editPolicies, request)
    }
    this.progress = false
  }
}
