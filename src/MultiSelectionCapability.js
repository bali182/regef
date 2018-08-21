import { point, rectangle } from 'regef-geometry'
import { SELECT } from './constants'
import Capability from './Capability'
import {
  eraseFeedback,
  requestFeedback,
  perform,
  getSelection,
  partMatches,
  typeMatches,
  getParts,
  alwaysTrue,
  isLeftButton,
} from './utils'

const locationOf = ({ clientX, clientY }) => point(clientX, clientY)

const DEFAULT_CONFIG = {
  parts: null,
  selectables: [],
  intersection: false,
  containment: true,
}

export default class MultiSelectionCapability extends Capability {
  constructor(engine, config = {}) {
    super(engine)
    this.config = { ...DEFAULT_CONFIG, ...config }
    this.init()
  }

  init() {
    this.progress = false
    this.startLocation = null
    this.endLocation = null
    this.lastRequest = null
    this.startPart = null
    this.endPart = null
    this.selectionBounds = null
    this.selection = null
    this.additional = false
  }

  createMultiSelectionRequest() {
    const { startLocation, endLocation, selectionBounds, selection } = this
    return {
      type: SELECT,
      bounds: selectionBounds,
      selection: selection || [],
      startLocation,
      endLocation,
    }
  }

  buildSelectionBounds() {
    const { startLocation, endLocation } = this
    if (!startLocation || !endLocation) {
      return
    }
    const { x: x1, y: y1 } = startLocation
    const { x: x2, y: y2 } = endLocation
    const x = Math.min(x1, x2)
    const y = Math.min(y1, y2)
    const width = Math.max(x1, x2) - x
    const height = Math.max(y1, y2) - y

    this.selectionBounds = rectangle(x, y, width, height)
  }

  buildSelection() {
    const { config, engine, selectionBounds, additional } = this

    const parts = getParts(engine, config.parts).filter((part) => {
      const bounds = rectangle(part.registry.root.dom.getBoundingClientRect())
      return bounds.intersection(selectionBounds) !== null
    })

    const currentSelection = getSelection(engine)
    const newSelection = []

    const isRelevant = typeMatches(config.selectables)
    const additionalFilter = additional
      ? ({ userComponent }) => currentSelection.indexOf(userComponent) < 0
      : alwaysTrue
    const boundsMatch = config.containment
      ? (itemBounds) => selectionBounds.containsRectangle(itemBounds)
      : (itemBounds) => selectionBounds.intersection(itemBounds) !== null

    parts.forEach((part) => {
      part.registry.all().forEach((wrapper) => {
        const bounds = rectangle(wrapper.dom.getBoundingClientRect())
        if (isRelevant(wrapper) && additionalFilter(wrapper) && boundsMatch(bounds)) {
          newSelection.push(wrapper.userComponent)
        }
      })
    })

    this.selection = additional ? currentSelection.concat(newSelection) : newSelection
  }

  cancel() {
    if (this.progress) {
      if (this.lastRequest !== null) {
        eraseFeedback(this.engine.editPolicies, this.lastRequest)
      }
      this.startLocation = null
      this.endLocation = null
      this.possibleSingleSelection = false
      this.progress = false
      this.selection = null
      this.selectionBounds = null
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
    const target = part.domHelper.findClosest(e.target, typeMatches(this.engine.rootType))
    if (target !== null) {
      this.startLocation = locationOf(e)
      this.progress = true
      this.startPart = part
    }
  }

  onMouseMove(e) {
    if (!this.progress) {
      return
    }
    this.endPart = this.engine.domHelper.findPart(e.target, partMatches(this.config.parts))
    this.endLocation = locationOf(e)
    this.additional = Boolean(e.shiftKey)

    this.buildSelectionBounds()
    this.buildSelection()

    const request = this.createMultiSelectionRequest()
    requestFeedback(this.engine.editPolicies, request)
    this.lastRequest = request
  }

  onMouseUp(e) {
    if (!this.progress) {
      return
    }
    this.endPart = this.engine.domHelper.findPart(e.target, partMatches(this.config.parts))
    this.endLocation = locationOf(e)
    this.additional = Boolean(e.shiftKey)

    const request = this.createMultiSelectionRequest()
    if (this.lastRequest !== null) {
      eraseFeedback(this.engine.editPolicies, this.lastRequest)
    }
    perform(this.engine.editPolicies, request)
    this.progress = false
    this.additional = false
    this.selection = null
    this.selectionBounds = null
  }
}
