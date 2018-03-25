import { SelectionProvider } from '../../src/index'
import { DIAGRAM } from './constants'

export default class DiagramSelectionProvider extends SelectionProvider {
  constructor(engine, dependencies) {
    super()
    this.engine = engine
    this.dependencies = dependencies
  }

  selection() {
    const store = this.dependencies.store
    const { selection } = store.getState()
    const toolkit = this.engine.toolkit.forPart(DIAGRAM)
    return toolkit.nodes()
      .filter(({ props: { id } }) => selection.indexOf(id) >= 0)
  }
}
