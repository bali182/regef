import { DispatchingEditPolicy } from '../../src/index'
import { isRoot, isStep, isNode } from './typeUtils'
import { DIAGRAM } from './constants'

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
    const toolkit = this.engine.toolkit.forPart(DIAGRAM)
    const root = toolkit.root()
    const containerOffset = toolkit.bounds(root).topLeft().negated()
    toolkit.root().setState({
      errorFeedback: components.map((c) => toolkit.bounds(c)
        .translate(delta)
        .translate(containerOffset)),
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
