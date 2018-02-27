import { DispatchingEditPolicy } from '../../../src/index'

export default class RootEditPolicy extends DispatchingEditPolicy {
  checkRelevant(component) {
    return Boolean(component) && Boolean(component.props.root)
  }

  moveChildren({ components, delta, container }) {
    if (!this.checkRelevant(container)) {
      return
    }
    components.forEach((component) => {
      const { x, y } = this.toolkit.bounds(component).location()
      container.props.setPosition({
        id: component.props.id,
        x: Math.round(x + delta.x),
        y: Math.round(y + delta.y),
      })
    })
  }

  select({ selection }) {
    const ids = selection.map((component) => component.props.id)
    this.toolkit.root().props.setSelection({ selection: ids })
  }

  delete({ selection }) {
    const ids = selection.map((component) => component.props.id)
    ids.forEach((id) => this.toolkit.root().props.deleteComponent({ id }))
  }

  requestMoveChildrenFeedback({ components, delta, container }) {
    if (!this.checkRelevant(container)) {
      return
    }
    this.toolkit.root().setState({
      moveFeedback: components.map((c) => this.toolkit.bounds(c).translate(delta)),
    })
  }

  eraseMoveChildrenFeedback({ container }) {
    if (!this.checkRelevant(container)) {
      return
    }
    this.toolkit.root().setState({
      moveFeedback: null,
    })
  }

  requestSelectFeedback({ bounds }) {
    this.toolkit.root().setState({ selectionFeedback: bounds })
  }

  eraseSelectFeedback() {
    this.toolkit.root().setState({
      selectionFeedback: null,
    })
  }

  requestAddChildrenFeedback({ components, delta, targetContainer }) {
    if (!this.checkRelevant(targetContainer)) {
      return
    }
    if (components.some((c) => c.props.step)) {
      this.toolkit.root().setState({
        errorFeedback: components.map((c) => this.toolkit.bounds(c).translate(delta)),
      })
    }
  }

  eraseAddChildrenFeedback({ targetContainer }) {
    if (!this.checkRelevant(targetContainer)) {
      return
    }
    this.toolkit.root().setState({ errorFeedback: null })
  }
}
