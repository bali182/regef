import React from 'react'
import { connect } from 'react-redux'

import node from '../../src/node'
import renderNode from './renderNode'
import { addChild, setPosition } from './actions'
import RootNodeEditPolicy from './RootNodeEditPolicy'
import FeedbackNode from './FeedbackNode'

const rootNodeStyle = {
  marginTop: '25vh',
  marginLeft: '25vw',
  width: '50vw',
  minHeight: '50vh',
  overflow: 'hidden',
  backgroundColor: 'yellow',
  position: 'relative',
}
const position = ({ x, y }) => ({
  position: 'absolute',
  top: y,
  left: x,
})

@connect((nodes) => ({ nodes }), { addChild, setPosition })
@node(RootNodeEditPolicy)
class RootNode extends React.Component {
  constructor() {
    super()
    this.state = {
      feedback: null,
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

  render() {
    const { regef } = this.props
    return (<div style={rootNodeStyle} {...regef}>
      {this.renderChildren()}
      {this.renderFeedback()}
    </div>)
  }
}

export default RootNode
