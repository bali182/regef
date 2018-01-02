import React from 'react'
import { connect } from 'react-redux'

import { root } from '../../src'
import { addChild, setPosition } from './actions'
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

@connect(({ nodes }) => ({ nodes }), { addChild, setPosition })
@root(RootNodeEditPolicy)
class RootNode extends React.Component {
  constructor() {
    super()
    this.state = {
      feedback: null,
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

  renderConnections() {
    return <Connection x1={0} y1={100} x2={100} y2={110} />
  }

  componentDidUpdate() {
    const { regef: { toolkit } } = this.props
    // eslint-disable-next-line react/no-did-update-set-state
    const children = toolkit.getChildren(this)
    console.log(children)
    // this.setState({})
  }

  render() {
    return (<div style={rootNodeStyle}>
      {this.renderChildren()}
      {this.renderFeedback()}
      {this.renderConnections()}
    </div>)
  }
}

export default RootNode
