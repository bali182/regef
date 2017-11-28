import EditPolicy from '../../src/editPolicy'

class ChildNodeEditPolicy extends EditPolicy {
  isValidChild(component) {
    return component && component.props && component.props.id
  }

  getCommand({ component, type }) {
    if (this.isValidChild(component)) {
      const receiver = this.getComponent()
      switch (type) {
        case 'add-child': return () => {
          const id = receiver.props.id
          const childId = component.props.id
          receiver.props.addChild({ id, childId })
        }
        default: return null
      }
    }
    return null
  }

  requestFeedback(request) {
    this.getComponent().setState({
      feedback: {
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
}

export default ChildNodeEditPolicy
