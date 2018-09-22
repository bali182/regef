import { DispatchingEditPolicy } from '../../index'
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
    const containerOffset = toolkit.bounds(toolkit.root()).topLeft().negated()
    components.forEach((component) => {
      const { x, y } = toolkit.bounds(component).location()
        .translate(delta)
        .translate(containerOffset)
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
    const containerOffset = toolkit.bounds(toolkit.root()).topLeft().negated()
    container.setState({
      moveFeedback: components.map((c) => toolkit.bounds(c)
        .translate(delta)
        .translate(containerOffset)),
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
