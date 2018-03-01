import { DispatchingEditPolicy } from '../../../src/index'

export default class StepEditPolicy extends DispatchingEditPolicy {
  checkRelevant(component) {
    return Boolean(component) && Boolean(component.props.step)
  }
  requestAddFeedback({ delta, components, targetContainer }) {
    if (!this.checkRelevant(targetContainer)) {
      return
    }
    const { toolkit } = this
    const bounds = components.map((moved) => toolkit.bounds(moved).translate(delta))
    toolkit.root().setState({ errorFeedback: bounds })
  }
  eraseAddFeedback({ targetContainer }) {
    if (!this.checkRelevant(targetContainer)) {
      return
    }
    this.toolkit.root().setState({ errorFeedback: null })
  }
}
