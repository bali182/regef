import React from 'react'
import { connect } from 'react-redux'
import node from '../../src/node'

import renderNode from './renderNode'
import MyNodeEditPolicy from './MyNodeEditPolicy'
import { addChild, setPosition } from './actions'

const noChildrenStyle = {
  display: 'table-cell',
  verticalAlign: 'middle',
  textAlign: 'center',
  borderRadius: 4,
  backgroundColor: 'red',
  padding: 10,
  userSelect: 'none',
  cursor: 'default',
  width: 50,
  height: 50,
  MozUserSelect: '-moz-none',
}

const withChildrenStyle = {
  display: 'inline-block',
  marginRight: 5,
  borderRadius: 4,
  backgroundColor: 'green',
  padding: 15,
  userSelect: 'none',
  cursor: 'default',
  minHeight: 70,
  minWidth: 70,
}

// eslint-disable-next-line react/no-multi-comp
@connect((state, { id }) => ({ model: state[id] }), { addChild, setPosition })
@node(MyNodeEditPolicy)
class ChildNode extends React.Component {
  renderWithoutChildren() {
    const { regef, id, style } = this.props
    return (<div style={{ ...noChildrenStyle, ...style }} {...regef}>
      {id}
    </div>)
  }

  renderWithChildren() {
    const { regef, id, model: { children }, style } = this.props
    return (<div style={{ ...withChildrenStyle, ...style }} {...regef}>
      {id} {children.map(renderNode)}
    </div>)
  }

  render() {
    const { model: { children } } = this.props
    if (children.length === 0) {
      return this.renderWithoutChildren()
    }
    return this.renderWithChildren()
  }
}

export default ChildNode
