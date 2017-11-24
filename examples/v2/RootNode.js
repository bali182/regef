import React from 'react'
import { connect } from 'react-redux'
import node from '../../src/node'
import renderNode from './renderNode'


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

@node()
@connect((nodes) => ({ nodes }))
class RootNode extends React.Component {
  render() {
    const { regef } = this.props
    const { nodes } = this.props
    return (<div style={rootNodeStyle} {...regef}>
      {nodes.root.children.map((id) => {
        const model = nodes[id]
        return renderNode(id, { style: position(model) })
      })}
    </div>)
  }
}

export default RootNode
