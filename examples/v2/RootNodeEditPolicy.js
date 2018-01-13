import { DispatchingEditPolicy } from '../../src/index'

class RootNodeEditPolict extends DispatchingEditPolicy {
  isValidChild(component) {
    return component && component.props && component.props.id
  }

  requestAddOrMoveFeedback({ location: { x, y }, component }) {
    const { width, height } = this.toolkit.bounds(component)
    this.component.setState({
      feedback: {
        x,
        y,
        width,
        height,
      },
    })
  }

  eraseAddOrMoveFeedback() {
    this.component.setState({
      feedback: null,
    })
  }

  requestAddChildFeedback(request) {
    this.requestAddOrMoveFeedback(request)
  }

  requestMoveChildFeedback(request) {
    this.requestAddOrMoveFeedback(request)
  }

  requestEndConnectionFeedback(request) {
    const sourceLocation = this.toolkit.bounds(this.toolkit.parent(request.source)).center()
    const targetLocation = request.location
    const connectionFeedback = sourceLocation.lineSegmentTo(targetLocation)
    this.component.setState({ connectionFeedback })
  }

  requestSelectFeedback({ bounds }) {
    this.component.setState({ selectionFeedback: bounds })
  }

  eraseMoveChildFeedback(request) {
    this.eraseAddOrMoveFeedback(request)
  }

  eraseAddChildFeedback(request) {
    this.eraseAddOrMoveFeedback(request)
  }


  eraseEndConnectionFeedback() {
    this.component.setState({ connectionFeedback: null })
  }

  eraseSelectFeedback() {
    this.component.setState({ selectionFeedback: null })
  }

  addChild({ component, location: { x, y } }) {
    if (this.isValidChild(component)) {
      const receiver = this.component
      receiver.props.addChild({
        id: 'root',
        childId: component.props.id,
      })
      receiver.props.setPosition({
        x,
        y,
        id: component.props.id,
      })
    }
  }

  moveChild({ component, location: { x, y } }) {
    if (this.isValidChild(component)) {
      const receiver = this.component
      receiver.props.setPosition({
        x,
        y,
        id: component.props.id,
      })
    }
  }

  select({ selection }) {
    console.log(selection)
  }
}

export default RootNodeEditPolict
