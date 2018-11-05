import { MoveIntent } from '../../src/index'
import { isRoot } from './typeUtils'
import { DIAGRAM } from './constants'
import { BaseSampleEditPolicy } from './BaseSampleEditPolicy'
import { ReactCompWithId } from '../types'

export default class MoveRootChildrenEditPolicy extends BaseSampleEditPolicy {
  move({ components, delta, container }: MoveIntent) {
    if (!isRoot(container)) {
      return
    }
    const toolkit = this.engine.toolkit.forPart(DIAGRAM)
    const containerOffset = this.containerOffset
    components.forEach((component: ReactCompWithId) => {
      const { x, y } = toolkit
        .bounds(component)
        .location()
        .translate(delta)
        .translate(containerOffset)
      this.dependencies.setPosition({
        id: component.props.id,
        x,
        y,
      })
    })
  }

  requestMoveFeedback({ components, delta, container }: MoveIntent) {
    if (!isRoot(container)) {
      return
    }
    const toolkit = this.engine.toolkit.forPart(DIAGRAM)
    const containerOffset = this.containerOffset
    const moveFeedback = components.map((c) =>
      toolkit
        .bounds(c)
        .translate(delta)
        .translate(containerOffset),
    )
    container.setState({ moveFeedback })
  }

  eraseMoveFeedback({ container }: MoveIntent) {
    if (!isRoot(container)) {
      return
    }
    container.setState({
      moveFeedback: null,
    })
  }
}
