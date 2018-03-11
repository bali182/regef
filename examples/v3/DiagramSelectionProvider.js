import { SelectionProvider } from '../../src/index'

export default class DiagramSelectionProvider extends SelectionProvider {
  constructor(toolkit) {
    super()
    this.toolkit = toolkit
  }
  selection() {
    const partToolkit = this.toolkit.forDefaultPart()
    const ids = partToolkit.root().props.selection
    return partToolkit.nodes()
      .filter(({ props: { id } }) => ids.indexOf(id) >= 0)
  }
}
