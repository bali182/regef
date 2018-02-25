import { DispatchingEditPolicy } from '../../src/index'

class RootNodeEditPolict extends DispatchingEditPolicy {
  isValidChild(component) {
    return component && component.props && component.props.id
  }

  requestAddOrMoveFeedback({ location: { x, y }, component }) {
    const { width, height } = this.toolkit.bounds(component)
    this.host.setState({
      feedback: {
        x,
        y,
        width,
        height,
      },
    })
  }

  eraseAddOrMoveFeedback() {
    this.host.setState({
      feedback: null,
    })
  }

  requestAddChildrenFeedback(request) {
    this.requestAddOrMoveFeedback(request)
  }

  requestMoveChildrenFeedback(request) {
    this.requestAddOrMoveFeedback(request)
  }

  requestEndConnectionFeedback(request) {
    const sourceLocation = this.toolkit.bounds(this.toolkit.parent(request.source)).center()
    const targetLocation = request.location
    const connectionFeedback = sourceLocation.lineSegmentTo(targetLocation)
    this.host.setState({ connectionFeedback })
  }

  requestSelectFeedback({ bounds }) {
    this.host.setState({ selectionFeedback: bounds })
  }

  eraseMoveChildrenFeedback(request) {
    this.eraseAddOrMoveFeedback(request)
  }

  eraseAddChildrenFeedback(request) {
    this.eraseAddOrMoveFeedback(request)
  }


  eraseEndConnectionFeedback() {
    this.host.setState({ connectionFeedback: null })
  }

  eraseSelectFeedback() {
    this.host.setState({ selectionFeedback: null })
  }

  addChildren({ component, location: { x, y } }) {
    if (this.isValidChild(component)) {
      const receiver = this.host
      receiver.props.addChild({
        id: 'root',
        childId: component.props.id,
      })
      receiver.props.setPosition({
        x,
        y,
        id: component.props.id,
      })
    }
  }

  moveChildren({ component, location, delta }) {
    if (this.isValidChild(component)) {
      const root = this.host
      const { selection, nodes } = root.props
      const id = component.props.id
      if (selection.indexOf(id) >= 0) {
        // move all selected component using the delta
        selection.forEach((nodeId) => {
          const node = nodes[nodeId]
          root.props.setPosition({
            x: node.x + delta.x,
            y: node.y + delta.y,
            id: nodeId,
          })
        })
      } else {
        const { x, y } = location
        root.props.setSelection({ selection: [id] })
        root.props.setPosition({ x, y, id })
      }
    }
  }

  select({ selection }) {
    const ids = selection.map((component) => component.props.id)
    this.host.props.setSelection({ selection: ids })
  }

  delete({ selection }) {
    const ids = selection.map((component) => component.props.id)
    ids.forEach((id) => this.host.props.deleteNode({ id }))
  }
}

export default RootNodeEditPolict
