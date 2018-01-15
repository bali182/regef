import { DispatchingEditPolicy } from '../../src/index'

class RootNodeEditPolict extends DispatchingEditPolicy {
  isValidChild(component) {
    return component && component.props && component.props.id
  }

  requestAddOrMoveFeedback({ location: { x, y }, component }) {
    const { width, height } = this.toolkit.bounds(component)
    this.component.setState({
      feedback: {
        x,
        y,
        width,
        height,
      },
    })
  }

  eraseAddOrMoveFeedback() {
    this.component.setState({
      feedback: null,
    })
  }

  requestAddChildFeedback(request) {
    this.requestAddOrMoveFeedback(request)
  }

  requestMoveChildFeedback(request) {
    this.requestAddOrMoveFeedback(request)
  }

  requestEndConnectionFeedback(request) {
    const sourceLocation = this.toolkit.bounds(this.toolkit.parent(request.source)).center()
    const targetLocation = request.location
    const connectionFeedback = sourceLocation.lineSegmentTo(targetLocation)
    this.component.setState({ connectionFeedback })
  }

  requestSelectFeedback({ bounds }) {
    this.component.setState({ selectionFeedback: bounds })
  }

  eraseMoveChildFeedback(request) {
    this.eraseAddOrMoveFeedback(request)
  }

  eraseAddChildFeedback(request) {
    this.eraseAddOrMoveFeedback(request)
  }


  eraseEndConnectionFeedback() {
    this.component.setState({ connectionFeedback: null })
  }

  eraseSelectFeedback() {
    this.component.setState({ selectionFeedback: null })
  }

  addChild({ component, location: { x, y } }) {
    if (this.isValidChild(component)) {
      const receiver = this.component
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

  moveChild({ component, location, delta }) {
    if (this.isValidChild(component)) {
      const root = this.component
      const { selection, nodes } = root.props
      const id = component.props.id
      console.log(delta)
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
    this.component.props.setSelection({ selection: ids })
  }
}

export default RootNodeEditPolict
