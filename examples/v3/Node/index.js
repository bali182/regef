import React from 'react'
import { connect } from 'react-redux'

import NodeView from './NodeView'

const stateToProps = ({ components }, { id }) => ({
  node: components[id],
})

@connect(stateToProps)
export default class Node extends React.Component {
  render() {
    const { id } = this.props
    const { x, y } = this.props.node
    return <NodeView x={x} y={y} id={id} />
  }
}
