import EditPolicy from '../../src/editPolicy'

class MyEditPolicy extends EditPolicy {
  isValidChild(component) {
    return component
      && component.props
      && component.props.id
      && component.props.addChild
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
}

export default MyEditPolicy
