import { SelectionProvider, Engine } from '../../src/index'
import { DIAGRAM, NODE } from './constants'
import { ActionCreators, ReactCompWithId } from '../types'

export default class DiagramSelectionProvider extends SelectionProvider {
  protected readonly engine: Engine
  protected readonly dependencies: ActionCreators
  constructor(engine: Engine, dependencies: ActionCreators) {
    super()
    this.engine = engine
    this.dependencies = dependencies
  }
  selection() {
    const store = this.dependencies.store
    const { selection } = store.getState()
    const toolkit = this.engine.toolkit.forPart(DIAGRAM)
    return (toolkit.ofType(NODE) as ReactCompWithId[]).filter(
      ({ props: { id } }) => selection.indexOf(id) >= 0,
    )
  }
}
