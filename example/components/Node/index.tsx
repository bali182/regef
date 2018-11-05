import React from 'react'
import { connect } from 'react-redux'
import { component, RegefComponentProps } from '../../../src/index'

import NodeView from './NodeView'
import { Port } from '../Port'
import { NODE } from '../../diagram/constants'
import { ComponentClass } from 'react'

type ReduxProps = {
  node: any
  selected: boolean
}

type OwnProps = {
  id: string
}

type NodeProps = ReduxProps & OwnProps & RegefComponentProps

type NodeState = {
  portVisible: boolean
}

export class _Node extends React.Component<NodeProps, NodeState> {
  constructor(props: NodeProps) {
    super(props)
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

function stateToProps({ components, selection }, { id }: OwnProps): ReduxProps {
  return {
    node: components[id],
    selected: selection.indexOf(id) >= 0,
  }
}

export const NodeWithRegef = component<NodeProps>(NODE)(_Node)
export const Node = connect<ReduxProps, {}, OwnProps>(stateToProps)(
  NodeWithRegef,
) as ComponentClass<OwnProps>
