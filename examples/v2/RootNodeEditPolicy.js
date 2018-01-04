import { DispatchingEditPolicy } from '../../src/index'

class RootNodeEditPolict extends DispatchingEditPolicy {
  isValidChild(component) {
    return component && component.props && component.props.id
  }

  requestAddOrMoveFeedback(request) {
    this.component.setState({
      feedback: {
        x: request.componentX,
        y: request.componentY,
        width: request.componentWidth,
        height: request.componentHeight,
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

  eraseMoveChildFeedback(request) {
    this.eraseAddOrMoveFeedback(request)
  }

  eraseAddChildFeedback(request) {
    this.eraseAddOrMoveFeedback(request)
  }


  eraseEndConnectionFeedback() {
    this.component.setState({ connectionFeedback: null })
  }

  addChild({ component, componentX, componentY }) {
    if (this.isValidChild(component)) {
      const receiver = this.component
      receiver.props.addChild({
        id: 'root',
        childId: component.props.id,
      })
      receiver.props.setPosition({
        id: component.props.id,
        x: componentX,
        y: componentY,
      })
    }
  }

  moveChild({ component, componentX, componentY }) {
    if (this.isValidChild(component)) {
      const receiver = this.component
      receiver.props.setPosition({
        id: component.props.id,
        x: componentX,
        y: componentY,
      })
    }
  }
}

export default RootNodeEditPolict
