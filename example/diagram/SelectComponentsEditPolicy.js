import { DispatchingEditPolicy } from '../../src/index'

export default class SelectComponentsEditPolicy extends DispatchingEditPolicy {
  constructor(engine, dependencies) {
    super()
    this.engine = engine
    this.dependencies = dependencies
  }

  select({ selection }) {
    const ids = selection.map((component) => component.props.id)
    this.dependencies.setSelection({ selection: ids })
  }

  requestSelectFeedback({ bounds }) {
    const toolkit = this.engine.toolkit.forDefaultPart()
    toolkit.root().setState({ selectionFeedback: bounds })
  }

  eraseSelectFeedback() {
    const toolkit = this.engine.toolkit.forDefaultPart()
    toolkit.root().setState({ selectionFeedback: null })
  }
}
