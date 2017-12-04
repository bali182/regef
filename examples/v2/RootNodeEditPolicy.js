import EditPolicy from '../../src/editPolicy'

class RootNodeEditPolict extends EditPolicy {
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

  getCommand(request) {
    const { type, component, componentX, componentY } = request
    const receiver = this.getComponent()
    switch (type) {
      case 'add-child': {
        if (this.isValidChild(component)) {
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
        break
      }
      case 'move-child': {
        if (this.isValidChild(component)) {
          receiver.props.setPosition({
            id: component.props.id,
            x: componentX,
            y: componentY,
          })
        }
        break
      }
      default:
    }
  }
}

export default RootNodeEditPolict
