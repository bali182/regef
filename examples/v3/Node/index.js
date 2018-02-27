import React from 'react'
import { connect } from 'react-redux'
import { node } from '../../../src/index'

import NodeView from './NodeView'

const stateToProps = ({ components, selection }, { id }) => ({
  node: components[id],
  selected: selection.indexOf(id) >= 0,
})

@connect(stateToProps)
@node()
export default class Node extends React.Component {
  render() {
    const { id, selected } = this.props
    const { x, y } = this.props.node
    return <NodeView x={x} y={y} id={id} selected={selected} />
  }
}
