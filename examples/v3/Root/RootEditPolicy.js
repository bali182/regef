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

  delete({ selection }) {
    const ids = selection.map((component) => component.props.id)
    ids.forEach((id) => this.component.props.deleteComponent({ id }))
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

  requestAddChildFeedback({ components, delta }) {
    if (components.some((c) => c.props.step)) {
      this.component.setState({
        errorFeedback: components.map((c) => this.toolkit.bounds(c).translate(delta)),
      })
    }
  }

  eraseAddChildFeedback() {
    this.component.setState({ errorFeedback: null })
  }
}
