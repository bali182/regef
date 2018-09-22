import React from 'react'
import { connect } from 'react-redux'
import { component } from '../../../index'

import NodeView from './NodeView'
import Port from '../Port'
import { NODE } from '../../diagram/constants'

const stateToProps = ({ components, selection }, { id }) => ({
  node: components[id],
  selected: selection.indexOf(id) >= 0,
})

export class _Node extends React.Component {
  constructor() {
    super()
    this.state = {
      portVisible: false,
    }
    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
  }

  onMouseEnter() {
    this.setState({ portVisible: true })
  }

  onMouseLeave() {
    this.setState({ portVisible: false })
  }

  render() {
    const {
      id,
      selected,
      node: { x, y },
    } = this.props
    return (
      <NodeView
        x={x}
        y={y}
        id={id}
        selected={selected}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <Port visible={this.state.portVisible} />
      </NodeView>
    )
  }
}

export const NodeWithRegef = component(NODE)(_Node)
export default connect(stateToProps)(NodeWithRegef)
