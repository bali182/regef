import React from 'react'
import { connect } from 'react-redux'
import { node } from '../../../src/index'

import NodeView from './NodeView'
import NodeEditPolicy from './NodeEditPolicy'

const stateToProps = ({ components, selection }, { id }) => ({
  node: components[id],
  selected: selection.indexOf(id) >= 0,
})

@connect(stateToProps)
@node(NodeEditPolicy)
export default class Node extends React.Component {
  render() {
    const { id, selected } = this.props
    const { x, y } = this.props.node
    return <NodeView x={x} y={y} id={id} selected={selected} />
  }
}
