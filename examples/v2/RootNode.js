import React from 'react'
import { connect } from 'react-redux'

import { root } from '../../src'
import { addChild, setPosition, addConnection } from './actions'
import renderNode from './renderNode'
import RootNodeEditPolicy from './RootNodeEditPolicy'
import FeedbackNode from './FeedbackNode'
import Connection from './Connection'

const rootNodeStyle = {
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: 1,
  minWidth: 0,
  minHeight: '100%',
  overflow: 'hidden',
  backgroundColor: 'white',
  position: 'relative',
  boxSizing: 'border-box',
  border: '1px solid #ccc',
}
const position = ({ x, y }) => ({
  position: 'absolute',
  top: y,
  left: x,
})

const stateToProps = ({ nodes, connections }) => ({ nodes, connections })
const boundActions = { addChild, setPosition, addConnection }

@connect(stateToProps, boundActions)
@root(RootNodeEditPolicy)
class RootNode extends React.Component {
  constructor() {
    super()
    this.state = {
      feedback: null,
      connectionFeedback: null,
      connections: null,
    }
  }

  renderChildren() {
    const { nodes } = this.props
    return nodes.root.children.map((id) => {
      const model = nodes[id]
      return renderNode(id, { style: position(model) })
    })
  }

  renderFeedback() {
    const { feedback } = this.state
    if (feedback !== null) {
      return (<FeedbackNode
        x={feedback.x || 0}
        y={feedback.y || 0}
        width={feedback.width || 50}
        height={feedback.height || 50}
      />)
    }
    return null
  }

  renderConnectionFeedback() {
    if (this.state.connectionFeedback !== null) {
      const { x1, y1, x2, y2 } = this.state.connectionFeedback
      return <Connection x1={x1} y1={y1} x2={x2} y2={y2} />
    }
    return null
  }

  renderConnections() {
    if (this.state.connections !== null) {
      return this.state.connections
        .map(({ x1, y1, x2, y2, key }) => (<Connection
          key={key}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
        />))
    }
    return null
  }

  buildConnectionsRepresentation() {
    this.props.regef.toolkit().then((toolkit) => {
      const nodes = toolkit.nodes()
      const connections = this.props.connections.map(({ source, target }) => {
        const sourceNode = nodes.find(({ props: { id } }) => id === source)
        const targetNode = nodes.find(({ props: { id } }) => id === target)
        if (sourceNode === undefined || targetNode === undefined) {
          throw new Error(`source or target undefined ${source} ${target}`)
        }
        return {
          source: toolkit.bounds(sourceNode),
          target: toolkit.bounds(targetNode),
          key: `${source}-${target}`,
        }
      }).map(({ source, target, key }) => {
        // TODO better arrow display
        const centerToCenter = source.center().lineSegmentTo(target.center())
        const { x1, y1, x2, y2 } = centerToCenter
        return { x1, y1, x2, y2, key }
      })
      this.setState({ connections })
    }).catch((e) => { throw e })
  }

  componentDidMount() {
    this.buildConnectionsRepresentation()
  }

  componentDidUpdate(prevProps) {
    if (!Object.is(prevProps, this.props)) {
      this.buildConnectionsRepresentation()
    }
  }

  render() {
    return (<div style={rootNodeStyle}>
      {this.renderConnectionFeedback()}
      {this.renderConnections()}
      {this.renderChildren()}
      {this.renderFeedback()}
    </div>)
  }
}

export default RootNode
