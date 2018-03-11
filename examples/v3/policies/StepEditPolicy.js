import { DispatchingEditPolicy } from '../../../src/index'

export default class StepEditPolicy extends DispatchingEditPolicy {
  constructor(toolkit) {
    super()
    this.toolkit = toolkit
  }
  checkRelevant(component) {
    return Boolean(component) && Boolean(component.props.step)
  }
  requestAddFeedback({ delta, components, targetContainer }) {
    if (!this.checkRelevant(targetContainer)) {
      return
    }
    const partToolkit = this.toolkit.forDefaultPart()
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
