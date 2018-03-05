import { DispatchingEditPolicy } from '../../../src/index'

export default class RootEditPolicy extends DispatchingEditPolicy {
  checkRelevant(component) {
    return Boolean(component) && Boolean(component.props.root)
  }

  move({ components, delta, container }) {
    if (!this.checkRelevant(container)) {
      return
    }
    const partToolkit = this.toolkit.forDefaultPart()
    components.forEach((component) => {
      const { x, y } = partToolkit.bounds(component).location()
      container.props.setPosition({
        id: component.props.id,
        x: Math.round(x + delta.x),
        y: Math.round(y + delta.y),
      })
    })
  }

  select({ selection }) {
    const ids = selection.map((component) => component.props.id)
    this.toolkit.forDefaultPart().root().props.setSelection({ selection: ids })
  }

  delete({ selection }) {
    const partToolkit = this.toolkit.forDefaultPart()
    const ids = selection.map((component) => component.props.id)
    ids.forEach((id) => partToolkit.root().props.deleteComponent({ id }))
  }

  requestMoveFeedback({ components, delta, container }) {
    if (!this.checkRelevant(container)) {
      return
    }
    const partToolkit = this.toolkit.forDefaultPart()
    partToolkit.root().setState({
      moveFeedback: components.map((c) => partToolkit.bounds(c).translate(delta)),
    })
  }

  eraseMoveFeedback({ container }) {
    if (!this.checkRelevant(container)) {
      return
    }
    this.toolkit.forDefaultPart().root().setState({
      moveFeedback: null,
    })
  }

  requestSelectFeedback({ bounds }) {
    this.toolkit.forDefaultPart().root().setState({ selectionFeedback: bounds })
  }

  eraseSelectFeedback() {
    this.toolkit.forDefaultPart().root().setState({
      selectionFeedback: null,
    })
  }

  requestAddFeedback({ components, delta, targetContainer }) {
    if (!this.checkRelevant(targetContainer)) {
      return
    }
    if (components.some((c) => c.props.step)) {
      const partToolkit = this.toolkit.forDefaultPart()
      partToolkit.root().setState({
        errorFeedback: components.map((c) => partToolkit.bounds(c).translate(delta)),
      })
    }
  }

  eraseAddFeedback({ targetContainer }) {
    if (!this.checkRelevant(targetContainer)) {
      return
    }
    this.toolkit.forDefaultPart().root().setState({ errorFeedback: null })
  }
}
