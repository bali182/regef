import EditPolicy from '../../src/editPolicy'

class ChildNodeEditPolicy extends EditPolicy {
  isValidChild(component) {
    return component && component.props && component.props.id
  }

  getCommand({ component, type }) {
    if (this.isValidChild(component)) {
      const { props: { id: childId } } = component
      const { props: { id, addChild } } = this.getComponent()
      switch (type) {
        case 'add-child': return () => addChild({ id, childId })
        default: return null
      }
    }
    return null
  }

  requestFeedback({ type, componentWidth, componentHeight }) {
    switch (type) {
      case 'add-child': {
        this.getComponent().setState({
          feedback: {
            width: componentWidth,
            height: componentHeight,
          },
        })
        break
      }
      default:
    }
  }

  eraseFeedback() {
    this.getComponent().setState({
      feedback: null,
    })
  }
}

export default ChildNodeEditPolicy
