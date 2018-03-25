import { DispatchingEditPolicy } from '../../src/index'
import { isRoot } from './typeUtils'
import { DIAGRAM } from './constants'

export default class MoveRootChildrenEditPolicy extends DispatchingEditPolicy {
  constructor(engine, dependencies) {
    super()
    this.engine = engine
    this.dependencies = dependencies
  }

  move({ components, delta, container }) {
    if (!isRoot(container)) {
      return
    }
    const toolkit = this.engine.toolkit.forPart(DIAGRAM)
    components.forEach((component) => {
      const { x, y } = toolkit.bounds(component).location().translate(delta)
      this.dependencies.setPosition({
        id: component.props.id,
        x,
        y,
      })
    })
  }

  requestMoveFeedback({ components, delta, container }) {
    if (!isRoot(container)) {
      return
    }
    const toolkit = this.engine.toolkit.forPart(DIAGRAM)
    container.setState({
      moveFeedback: components.map((c) => toolkit.bounds(c).translate(delta)),
    })
  }

  eraseMoveFeedback({ container }) {
    if (!isRoot(container)) {
      return
    }
    container.setState({
      moveFeedback: null,
    })
  }
}