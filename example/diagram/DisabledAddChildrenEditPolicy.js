import { DispatchingEditPolicy } from '../../src/index'
import { isRoot, isStep, isNode } from './typeUtils'

export default class DisabledAddChildrenEditPolicy extends DispatchingEditPolicy {
  constructor(engine, dependencies) {
    super()
    this.engine = engine
    this.dependencies = dependencies
  }

  requestAddFeedback({ components, delta, targetContainer }) {
    if (!isRoot(targetContainer) && !isStep(targetContainer) && !isNode(targetContainer)) {
      return
    }
    const toolkit = this.engine.toolkit.forDefaultPart()
    toolkit.root().setState({
      errorFeedback: components.map((c) => toolkit.bounds(c).translate(delta)),
    })
  }

  eraseAddFeedback({ targetContainer }) {
    if (!isRoot(targetContainer) && !isStep(targetContainer) && !isNode(targetContainer)) {
      return
    }
    const toolkit = this.engine.toolkit.forDefaultPart()
    toolkit.root().setState({ errorFeedback: null })
  }
}
