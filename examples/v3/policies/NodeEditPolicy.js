import { DispatchingEditPolicy } from '../../../src/index'

export default class NodeEditPolicy extends DispatchingEditPolicy {
  constructor(toolkit) {
    super()
    this.toolkit = toolkit
  }
  checkRelevant(component) {
    return Boolean(component) && Boolean(component.props.node)
  }

  requestAddFeedback({ delta, components, targetContainer }) {
    if (!this.checkRelevant(targetContainer)) {
      return
    }
    const { toolkit } = this
    const partToolkit = toolkit.forDefaultPart()
    const bounds = components.map((moved) => partToolkit.bounds(moved).translate(delta))
    partToolkit.root().setState({ errorFeedback: bounds })
  }
  eraseAddFeedback({ targetContainer }) {
    if (!this.checkRelevant(targetContainer)) {
      return
    }
    this.toolkit.forDefaultPart().root().setState({ errorFeedback: null })
  }
}
