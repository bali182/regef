import { AddIntent } from '../../src/index'
import { isRoot, isStep, isNode } from './typeUtils'
import { DIAGRAM } from './constants'
import { BaseSampleEditPolicy } from './BaseSampleEditPolicy'

export default class DisabledAddChildrenEditPolicy extends BaseSampleEditPolicy {
  requestAddFeedback({ components, delta, targetContainer }: AddIntent) {
    if (!isRoot(targetContainer) && !isStep(targetContainer) && !isNode(targetContainer)) {
      return
    }
    const toolkit = this.engine.toolkit.forPart(DIAGRAM)
    const containerOffset = this.containerOffset
    toolkit.root().setState({
      errorFeedback: components.map((c) =>
        toolkit
          .bounds(c)
          .translate(delta)
          .translate(containerOffset),
      ),
    })
  }

  eraseAddFeedback({ targetContainer }) {
    if (!isRoot(targetContainer) && !isStep(targetContainer) && !isNode(targetContainer)) {
      return
    }
    const toolkit = this.engine.toolkit.forPart(DIAGRAM)
    toolkit.root().setState({ errorFeedback: null })
  }
}
