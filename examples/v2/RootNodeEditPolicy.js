import EditPolicy from '../../src/editPolicy'

class RootNodeEditPolict extends EditPolicy {
  isValidChild(component) {
    return component && component.props && component.props.id
  }

  getCommand(request) {
    const { type, component, x, y } = request
    const receiver = this.getComponent()
    switch (type) {
      case 'add-child': {
        if (this.isValidChild(component)) {
          return () => {
            receiver.props.addChild({ id: 'root', childId: component.props.id })
            receiver.props.setPosition({ id: component.props.id, x, y })
          }
        }
        return null
      }
      case 'move-child': {
        if (this.isValidChild(component)) {
          return () => {
            receiver.props.setPosition({ x, y, id: component.props.id })
          }
        }
        return null
      }
      default: return null
    }
  }
}

export default RootNodeEditPolict
