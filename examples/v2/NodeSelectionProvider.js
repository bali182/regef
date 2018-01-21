import { SelectionProvider } from '../../src/index'

export default class NodeSelectionProvider extends SelectionProvider {
  selection() {
    const ids = this.toolkit.root().props.selection
    return this.toolkit.nodes()
      .filter(({ props: { id } }) => ids.indexOf(id) >= 0)
  }
}
