import { SelectionProvider } from '../../src/index'

export default class DiagramSelectionProvider extends SelectionProvider {
  constructor(engine, dependencies) {
    super()
    this.engine = engine
    this.dependencies = dependencies
  }

  selection() {
    const store = this.dependencies.store
    const { selection } = store.getState()
    const toolkit = this.engine.toolkit.forDefaultPart()
    return toolkit.nodes()
      .filter(({ props: { id } }) => selection.indexOf(id) >= 0)
  }
}
