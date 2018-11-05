import { Engine, DispatchingEditPolicy } from '../../src/index'
import { point } from 'regef-geometry'

import { ActionCreators } from '../types'
import { DIAGRAM } from './constants'

export class BaseSampleEditPolicy extends DispatchingEditPolicy {
  protected readonly engine: Engine
  protected readonly dependencies: ActionCreators
  constructor(engine: Engine, dependencies: ActionCreators) {
    super()
    this.engine = engine
    this.dependencies = dependencies
  }
  get toolkit() {
    return this.engine.toolkit.forPart(DIAGRAM)
  }
  get containerOffset() {
    const toolkit = this.toolkit
    const { x, y } = toolkit.bounds(toolkit.root()).topLeft()
    return point(-x, -y)
  }
}
