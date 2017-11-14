import EditPolicy from '../../src/editPolicy'

class MyEditPolicy extends EditPolicy {
  getCommand({ target, type }) {
    if (target.props.id) {
      const id = target.props.id
      const receiver = this.getComponent()
      switch (type) {
        case 'add-child': return () => {
          receiver.setState({ items: receiver.state.items.concat([id]) })
        }
        case 'remove-child': return () => {
          receiver.setState({ items: receiver.state.items.filter((e) => e !== id) })
        }
        default: return null
      }
    }
    return null
  }
}

export default MyEditPolicy
