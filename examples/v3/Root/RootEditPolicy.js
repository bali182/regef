import { DispatchingEditPolicy } from '../../../src/index'

export default class RootEditPolicy extends DispatchingEditPolicy {
  moveChild({ component, delta }) {
    const { x, y } = this.toolkit.bounds(component).location()
    this.component.props.setPosition({
      id: component.props.id,
      x: Math.round(x + delta.x),
      y: Math.round(y + delta.y),
    })
  }

  select({ selection }) {
    const ids = selection.map((component) => component.props.id)
    this.component.props.setSelection({ selection: ids })
  }

  requestMoveChildFeedback({ component, delta }) {
    this.component.setState({
      moveFeedback: this.toolkit.bounds(component).translate(delta),
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
