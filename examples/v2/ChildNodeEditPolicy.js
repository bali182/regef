import { DispatchingEditPolicy } from '../../src/'

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

  requestAddChildFeedback({ componentWidth, componentHeight }) {
    this.component.setState({
      feedback: {
        width: componentWidth,
        height: componentHeight,
      },
    })
  }

  eraseAddChildFeedback() {
    this.component.setState({
      feedback: null,
    })
  }
}

export default ChildNodeEditPolicy
