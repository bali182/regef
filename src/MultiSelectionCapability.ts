import React from 'react'
import { point, rectangle, Point, Rectangle } from 'regef-geometry'
import { SelectionIntent, IntentType, MultiSelectionCapabilityConfig } from './typings'
import { Capability } from './Capability'
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
import { Engine } from './Engine'
import { ComponentWrapper } from './ComponentWrapper'

const locationOf = ({ clientX, clientY }: MouseEvent) => point(clientX, clientY)

const DEFAULT_CONFIG: MultiSelectionCapabilityConfig = {
  parts: null,
  selectables: [],
  intersection: false,
  containment: true,
}

export class MultiSelectionCapability extends Capability<MultiSelectionCapabilityConfig> {
  private startLocation: Point
  private endLocation: Point
  private lastRequest: SelectionIntent
  private selectionBounds: Rectangle
  private selection: React.Component[]
  private additional: boolean

  constructor(engine: Engine, config: Partial<MultiSelectionCapabilityConfig> = {}) {
    super(engine, { ...DEFAULT_CONFIG, ...config })
    this.init()
  }

  init(): void {
    this.progress = false
    this.startLocation = null
    this.endLocation = null
    this.lastRequest = null
    this.selectionBounds = null
    this.selection = null
    this.additional = false
  }

  createMultiSelectionRequest(): SelectionIntent {
    const { startLocation, endLocation, selectionBounds, selection } = this
    return {
      type: IntentType.SELECT,
      bounds: selectionBounds,
      selection: selection || [],
      startLocation,
      endLocation,
    }
  }

  buildSelectionBounds(): void {
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

  buildSelection(): void {
    const { config, engine, selectionBounds, additional } = this

    const parts = getParts(engine, config.parts).filter((part) => {
      const { top, left, width, height } = part.registry.root.dom.getBoundingClientRect()
      const bounds = rectangle(left, top, width, height)
      return bounds.intersection(selectionBounds) !== null
    })

    const currentSelection = getSelection(engine)
    const newSelection: React.Component[] = []

    const isRelevant = typeMatches(config.selectables)
    const additionalFilter = additional
      ? ({ userComponent }: ComponentWrapper) => currentSelection.indexOf(userComponent) < 0
      : alwaysTrue
    const boundsMatch = config.containment
      ? (itemBounds: Rectangle) => selectionBounds.containsRectangle(itemBounds)
      : (itemBounds: Rectangle) => selectionBounds.intersection(itemBounds) !== null

    parts.forEach((part) => {
      part.registry.all().forEach((wrapper) => {
        const { top, left, width, height } = wrapper.dom.getBoundingClientRect()
        const bounds = rectangle(left, top, width, height)
        if (isRelevant(wrapper) && additionalFilter(wrapper) && boundsMatch(bounds)) {
          newSelection.push(wrapper.userComponent)
        }
      })
    })

    this.selection = additional ? currentSelection.concat(newSelection) : newSelection
  }

  cancel(): void {
    if (this.progress) {
      if (this.lastRequest !== null) {
        eraseFeedback(this.engine.editPolicies, this.lastRequest)
      }
      this.startLocation = null
      this.endLocation = null
      this.progress = false
      this.selection = null
      this.selectionBounds = null
    }
  }

  onMouseDown(e: MouseEvent): void {
    if (!isLeftButton(e)) {
      return
    }
    const part = this.engine.domHelper.findPart(e.target as Element, partMatches(this.config.parts))
    if (!part) {
      return
    }
    const target = part.domHelper.findClosest(
      e.target as Element,
      typeMatches(this.engine.rootType),
    )
    if (target !== null) {
      this.startLocation = locationOf(e)
      this.progress = true
    }
  }

  onMouseMove(e: MouseEvent): void {
    if (!this.progress) {
      return
    }
    this.endLocation = locationOf(e)
    this.additional = Boolean(e.shiftKey)

    this.buildSelectionBounds()
    this.buildSelection()

    const request = this.createMultiSelectionRequest()
    requestFeedback(this.engine.editPolicies, request)
    this.lastRequest = request
  }

  onMouseUp(e: MouseEvent): void {
    if (!this.progress) {
      return
    }
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
