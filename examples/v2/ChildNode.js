import React from 'react'
import { connect } from 'react-redux'
import { node, compose } from '../../src'

import renderNode from './renderNode'
import ChildNodeEditPolicy from './ChildNodeEditPolicy'
import Port from './Port'
import { addChild, setPosition } from './actions'

import FeedbackNode from './FeedbackNode'

const noChildrenStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'center',
  margin: '0px 10px',
  borderRadius: 4,
  userSelect: 'none',
  cursor: 'default',
  width: 50,
  height: 50,
  MozUserSelect: '-moz-none',
}

const withChildrenStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'center',
  margin: '0px 10px',
  borderRadius: 4,
  userSelect: 'none',
  cursor: 'default',
  minHeight: 70,
  minWidth: 70,
}

const portContainer = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  padding: '10px 20px 10px 10px',
}

// eslint-disable-next-line react/no-multi-comp
@connect(({ nodes }, { id }) => ({ model: nodes[id] }), { addChild, setPosition })
@node(compose(ChildNodeEditPolicy))
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
    const { model, id, style } = this.props
    const baseStyle = model.children.length > 0 || this.state.feedback
      ? withChildrenStyle
      : noChildrenStyle
    const fullStyle = { ...baseStyle, ...style, backgroundColor: model.color }
    return (<div style={fullStyle}>
      <div style={portContainer}>
        {id} {model.children.map(renderNode)} {this.renderFeedback()}
        <Port />
      </div>
    </div>)
  }
}

export default ChildNode
