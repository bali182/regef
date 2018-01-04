import { DispatchingEditPolicy } from '../../src/index'

class ChildNodeEditPolicy extends DispatchingEditPolicy {
  isValidChild(component) {
    return component && component.props && component.props.id
  }

  addChild({ component }) {
    if (this.isValidChild(component)) {
      const { props: { id: childId } } = component
      const { props: { id, addChild } } = this.component
      addChild({ id, childId })
    }
  }

  endConnection({ source, target }) {
    const sourceId = this.toolkit.parent(source).props.id
    const targetId = target.props.id
    this.toolkit.root().props.addConnection({
      source: sourceId,
      target: targetId,
    })
  }

  requestAddChildFeedback({ componentWidth, componentHeight }) {
    this.component.setState({
      feedback: {
        width: componentWidth,
        height: componentHeight,
      },
    })
  }

  requestEndConnectionFeedback(request) {
    const sourceLocation = this.toolkit.bounds(this.toolkit.parent(request.source)).center()
    const targetLocation = this.toolkit.bounds(request.target).center()
    const connectionFeedback = sourceLocation.lineSegmentTo(targetLocation)
    this.toolkit.root().setState({ connectionFeedback })
  }

  eraseAddChildFeedback() {
    this.component.setState({
      feedback: null,
    })
  }

  eraseEndConnectionFeedback() {
    this.toolkit.root().setState({ connectionFeedback: null })
  }
}

export default ChildNodeEditPolicy
