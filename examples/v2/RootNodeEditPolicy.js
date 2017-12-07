import { DispatchingEditPolicy } from '../../src'

class RootNodeEditPolict extends DispatchingEditPolicy {
  isValidChild(component) {
    return component && component.props && component.props.id
  }

  requestAddOrMoveFeedback(request) {
    this.getComponent().setState({
      feedback: {
        x: request.componentX,
        y: request.componentY,
        width: request.componentWidth,
        height: request.componentHeight,
      },
    })
  }

  eraseAddOrMoveFeedback() {
    this.getComponent().setState({
      feedback: null,
    })
  }

  requestAddChildFeedback(request) {
    this.requestAddOrMoveFeedback(request)
  }

  requestMoveChildFeedback(request) {
    this.requestAddOrMoveFeedback(request)
  }

  eraseMoveChildFeedback(request) {
    this.eraseAddOrMoveFeedback(request)
  }

  eraseAddChildFeedback(request) {
    this.eraseAddOrMoveFeedback(request)
  }

  addChild({ component, componentX, componentY }) {
    if (this.isValidChild(component)) {
      const receiver = this.getComponent()
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
      const receiver = this.getComponent()
      receiver.props.setPosition({
        id: component.props.id,
        x: componentX,
        y: componentY,
      })
    }
  }
}

export default RootNodeEditPolict
