import { DispatchingEditPolicy } from '../../src'

class RootNodeEditPolict extends DispatchingEditPolicy {
  isValidChild(component) {
    return component && component.props && component.props.id
  }

  requestFeedback(request) {
    this.getComponent().setState({
      feedback: {
        x: request.componentX,
        y: request.componentY,
        width: request.componentWidth,
        height: request.componentHeight,
      },
    })
  }

  eraseFeedback() {
    this.getComponent().setState({
      feedback: null,
    })
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
