import React from 'react'
import { connect } from 'react-redux'
import node from '../../src/node'

import renderNode from './renderNode'
import ChildNodeEditPolicy from './ChildNodeEditPolicy'
import { addChild, setPosition } from './actions'

const randomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`

const noChildrenStyle = {
  display: 'table-cell',
  verticalAlign: 'middle',
  textAlign: 'center',
  borderRadius: 4,
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
  padding: 15,
  userSelect: 'none',
  cursor: 'default',
  minHeight: 70,
  minWidth: 70,
}

// eslint-disable-next-line react/no-multi-comp
@connect((state, { id }) => ({ model: state[id] }), { addChild, setPosition })
@node(ChildNodeEditPolicy)
class ChildNode extends React.Component {
  renderWithoutChildren() {
    const { regef, id, style, model } = this.props
    const fullStyle = { ...noChildrenStyle, ...style, backgroundColor: model.color }
    return (<div style={fullStyle} {...regef}>
      {id}
    </div>)
  }

  renderWithChildren() {
    const { regef, id, model, style } = this.props
    const fullStyle = { ...withChildrenStyle, ...style, backgroundColor: model.color }
    return (<div style={fullStyle} {...regef}>
      {id} {model.children.map(renderNode)}
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
