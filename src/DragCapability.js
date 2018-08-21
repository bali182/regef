import { point, rectangle, dimension } from 'regef-geometry'
import { MOVE, ADD, SELECT } from './constants'
import Capability from './Capability'
import {
  typeMatches,
  partMatches,
  eraseFeedback,
  requestFeedback,
  perform,
  getSelection,
  isLeftButton,
} from './utils'

const buildOffset = ({ clientX, clientY }, element) => {
  const { x, y } = element.getBoundingClientRect()
  return point(clientX - x, clientY - y)
}

const DEFAULT_CONFIG = {
  parts: null,
  draggables: [],
  hosts: [],
}

export default class DragCapability extends Capability {
  constructor(engine, config = {}) {
    super(engine)
    this.config = { ...DEFAULT_CONFIG, ...config }
    this.init()
  }

  init() {
    this.progress = false
    this.target = null
    this.lastTargetParent = null
    this.targetParent = null
    this.currentParent = null
    this.coordinates = null
    this.offset = null
    this.lastRequest = null
    this.mouseMoved = false
    this.startLocation = null
  }

  findTargetedParent(eventTarget, part) {
    const { target, currentParent } = this
    if (!part) {
      return null
    }
    const newTarget = part.domHelper.findClosest(eventTarget, typeMatches(this.config.hosts))
    if (
      newTarget === null ||
      newTarget === target ||
      (target !== null && target.dom.contains(newTarget.dom))
    ) {
      return currentParent
    }
    const selection = getSelection(this.engine)
    const affectedParts = selection.map((comp) => this.engine.toolkit.forComponent(comp))
    if (new Set(affectedParts).size !== 1) {
      return newTarget
    }
    const affectedParents = selection.map((comp, i) => affectedParts[i].toolkit.parent(comp))
    if (new Set(affectedParents).size !== 1) {
      return newTarget
    }
    const targets = [newTarget.userComponent, target.userComponent]
    if (targets.every((userComponent) => selection.indexOf(userComponent) >= 0)) {
      return currentParent
    }
    return newTarget
  }

  deltaCoordinates({ clientX, clientY }) {
    return point(clientX - this.startLocation.x, clientY - this.startLocation.y)
  }

  screenCoordinates({ clientX, clientY }) {
    return point(clientX, clientY)
  }

  offsetCoordinates() {
    return this.offset
  }

  locationCoordinates({ clientX, clientY }) {
    return point(clientX, clientY)
  }

  updateCoordinates(e, part) {
    this.coordinates = {
      offset: this.offsetCoordinates(),
      delta: this.deltaCoordinates(e),
      location: this.locationCoordinates(e, part),
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
    const selection = getSelection(this.engine)
    if (selection.indexOf(target) >= 0) {
      return selection
    }
    return [target]
  }

  getMoveChildRequest() {
    return {
      type: MOVE,
      components: this.getMovedComponents(),
      container: this.currentParent.component.userComponent,
      ...this.coordinates,
    }
  }

  getAddChildRequest() {
    const { targetParent, currentParent } = this
    return {
      type: ADD,
      components: this.getMovedComponents(),
      targetContainer: targetParent === null ? null : targetParent.component.userComponent,
      container: currentParent.component.userComponent,
      ...this.coordinates,
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
    if (lastRequest !== null && lastTargetParent !== targetParent) {
      eraseFeedback(this.engine.editPolicies, lastRequest)
    }
    if (request !== null) {
      requestFeedback(this.engine.editPolicies, request)
    }
  }

  buildDragRequest(e) {
    const part = this.engine.domHelper.findPart(e.target, partMatches(this.config.parts))

    this.updateParents(e, part)
    this.updateCoordinates(e, part)

    const { currentParent, targetParent } = this

    if (currentParent === targetParent) {
      return this.getMoveChildRequest()
    } else if (currentParent !== targetParent) {
      return this.getAddChildRequest()
    }
    return null
  }

  cancel() {
    if (this.progress) {
      if (this.lastRequest !== null && this.targetParent !== null) {
        eraseFeedback(this.engine.editPolicies, this.lastRequest)
      }
      this.init()
    }
  }

  onMouseDown(e) {
    if (!isLeftButton(e)) {
      return
    }
    const part = this.engine.domHelper.findPart(e.target, partMatches(this.config.parts))
    if (!part) {
      return
    }
    this.target = part.domHelper.findClosest(e.target, typeMatches(this.config.draggables))
    if (this.target !== null) {
      const parent = part.domHelper.findClosest(
        this.target.dom.parentNode,
        (wrapper) => this.config.hosts.indexOf(wrapper.component.type) >= 0,
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
    if (getSelection(this.engine).indexOf(this.target.userComponent) < 0) {
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
    this.init()
  }
}
