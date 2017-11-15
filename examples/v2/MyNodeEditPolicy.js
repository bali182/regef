import EditPolicy from '../../src/editPolicy'

class MyEditPolicy extends EditPolicy {
  isValidChild(component) {
    return component && component.props && component.props.id
  }

  isValidSource(component) {
    return component && component.state && component.state.items
  }

  getCommand({ component, source, type }) {
    if (this.isValidChild(component) && this.isValidSource(source)) {
      const id = component.props.id
      const receiver = this.getComponent()
      switch (type) {
        case 'add-child': return () => {
          receiver.setState({ items: receiver.state.items.concat([id]) })
          source.setState({ items: source.state.items.filter((e) => id !== e) })
        }
        default: return null
      }
    }
    return null
  }
}

export default MyEditPolicy
