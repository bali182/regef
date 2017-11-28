import React from 'react'
import { connect } from 'react-redux'
import node from '../../src/node'

import renderNode from './renderNode'
import ChildNodeEditPolicy from './ChildNodeEditPolicy'
import { addChild, setPosition } from './actions'

import FeedbackNode from './FeedbackNode'

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
  constructor() {
    super()
    this.state = {
      feedback: null,
    }
  }

  renderFeedback() {
    const { feedback } = this.state
    if (feedback === null) {
      return null
    }
    return (<FeedbackNode
      absolute={false}
      width={feedback.width || 50}
      height={feedback.height}
    />)
  }

  render() {
    const { model, regef, id, style } = this.props
    const baseStyle = model.children.length > 0 || this.state.feedback
      ? withChildrenStyle
      : noChildrenStyle
    const fullStyle = { ...baseStyle, ...style, backgroundColor: model.color }
    return (<div style={fullStyle} {...regef}>
      {id} {model.children.map(renderNode)} {this.renderFeedback()}
    </div>)
  }
}

export default ChildNode
