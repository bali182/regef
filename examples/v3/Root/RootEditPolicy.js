import { DispatchingEditPolicy } from '../../../src/index'

export default class RootEditPolicy extends DispatchingEditPolicy {
  moveChild({ components, delta }) {
    components.forEach((component) => {
      const { x, y } = this.toolkit.bounds(component).location()
      this.component.props.setPosition({
        id: component.props.id,
        x: Math.round(x + delta.x),
        y: Math.round(y + delta.y),
      })
    })
  }

  select({ selection }) {
    const ids = selection.map((component) => component.props.id)
    this.component.props.setSelection({ selection: ids })
  }

  requestMoveChildFeedback({ components, delta }) {
    this.component.setState({
      moveFeedback: components.map((c) => this.toolkit.bounds(c).translate(delta)),
    })
  }

  eraseMoveChildFeedback() {
    this.component.setState({
      moveFeedback: null,
    })
  }

  requestSelectFeedback({ bounds }) {
    this.component.setState({ selectionFeedback: bounds })
  }

  eraseSelectFeedback() {
    this.component.setState({
      selectionFeedback: null,
    })
  }
}
