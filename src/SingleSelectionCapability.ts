import React from 'react'
import { point, rectangle, dimension, Point } from 'regef-geometry'
import { SELECT, Id, SelectionIntent } from './constants'
import { Capability } from './Capability'
import { typeMatches, partMatches, perform, getSelection, isLeftButton } from './utils'
import { Engine } from './Engine'

const locationOf = ({ clientX, clientY }: MouseEvent, rootDom: Element) => {
  const { top, left } = rootDom.getBoundingClientRect()
  return point(clientX - left, clientY - top)
}

type SingleSelectionCapabilityConfig = {
  parts: Id[]
  selectables: Id[]
}

const DEFAULT_CONFIG: SingleSelectionCapabilityConfig = {
  parts: null,
  selectables: [],
}

export class SingleSelectionCapability extends Capability<SingleSelectionCapabilityConfig> {
  private location: Point
  private possibleSingleSelection: boolean
  private additional: boolean
  private selection: React.Component[]

  constructor(engine: Engine, config: Partial<SingleSelectionCapabilityConfig> = {}) {
    super(engine, { ...DEFAULT_CONFIG, ...config })
    this.init()
  }

  init(): void {
    this.progress = false
    this.location = null
    this.possibleSingleSelection = false
    this.additional = false
    this.selection = []
  }

  createSingleSelectionRequest(): SelectionIntent {
    const { location, selection, additional } = this
    return {
      type: SELECT,
      bounds: rectangle(location, dimension(0, 0)),
      selection: additional ? getSelection(this.engine).concat(selection) : selection,
      startLocation: location,
      endLocation: location,
    }
  }

  cancel(): void {
    if (this.progress) {
      this.init()
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
      typeMatches(this.config.selectables),
    )
    if (!target) {
      return
    }
    this.location = locationOf(e, part.registry.root.dom)
    this.selection = [target.userComponent]
    this.possibleSingleSelection = true
    this.progress = true
  }

  onMouseMove(): void {
    this.possibleSingleSelection = false
  }

  onMouseUp({ ctrlKey, metaKey }: MouseEvent): void {
    if (!this.progress) {
      return
    }
    if (this.possibleSingleSelection) {
      this.additional = metaKey || ctrlKey
      perform(this.engine.editPolicies, this.createSingleSelectionRequest())
      this.additional = false
    }
    this.init()
  }
}
