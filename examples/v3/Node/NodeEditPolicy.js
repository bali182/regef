import { DispatchingEditPolicy } from '../../../src/index'

export default class NodeEditPolicy extends DispatchingEditPolicy {
  requestAddChildrenFeedback({ delta, components }) {
    const { toolkit } = this
    const bounds = components.map((moved) => toolkit.bounds(moved).translate(delta))
    toolkit.root().setState({ errorFeedback: bounds })
  }
  eraseAddChildrenFeedback() {
    this.toolkit.root().setState({ errorFeedback: null })
  }
}
