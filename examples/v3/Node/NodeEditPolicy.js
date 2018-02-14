import { DispatchingEditPolicy } from '../../../src/index'

export default class NodeEditPolicy extends DispatchingEditPolicy {
  requestAddChildFeedback({ delta, components }) {
    const { toolkit } = this
    const bounds = components.map((moved) => toolkit.bounds(moved).translate(delta))
    toolkit.root().setState({ errorFeedback: bounds })
  }
  eraseAddChildFeedback() {
    this.toolkit.root().setState({ errorFeedback: null })
  }
}
