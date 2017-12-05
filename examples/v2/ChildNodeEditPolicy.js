import { DispatchingEditPolicy } from '../../src/'

class ChildNodeEditPolicy extends DispatchingEditPolicy {
  isValidChild(component) {
    return component && component.props && component.props.id
  }

  addChild({ component }) {
    if (this.isValidChild(component)) {
      const { props: { id: childId } } = component
      const { props: { id, addChild } } = this.getComponent()
      addChild({ id, childId })
    }
  }

  requestAddChildFeedback({ componentWidth, componentHeight }) {
    this.getComponent().setState({
      feedback: {
        width: componentWidth,
        height: componentHeight,
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
