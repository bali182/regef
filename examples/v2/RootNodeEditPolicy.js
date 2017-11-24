import EditPolicy from '../../src/editPolicy'

class RootNodeEditPolict extends EditPolicy {
  isValidChild(component) {
    return component && component.props && component.props.id
  }

  getCommand(request) {
    const { type } = request
    const receiver = this.getComponent()
    switch (type) {
      case 'add-child': {
        const { component, x, y } = request
        if (this.isValidChild(component)) {
          return () => {
            receiver.props.addChild({ id: 'root', childId: component.props.id })
            receiver.props.setPosition({ id: component.props.id, x, y })
          }
        }
        return null
      }
      case 'move-child': {
        const { target, x, y } = request
        if (this.isValidChild(target)) {
          return () => {
            receiver.props.setPosition({ x, y, id: target.props.id })
          }
        }
        return null
      }
      default: return null
    }
  }
}

export default RootNodeEditPolict
