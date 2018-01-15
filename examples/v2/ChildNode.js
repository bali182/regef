import React from 'react'
import { connect } from 'react-redux'
import { node, compose } from '../../src'

import renderNode from './renderNode'
import ChildNodeEditPolicy from './ChildNodeEditPolicy'
import Port from './Port'
import { addChild, setPosition } from './redux/actions'

import FeedbackNode from './FeedbackNode'

const selectedStyle = {
  boxShadow: '0px 5px 5px 0px rgba(0,0,0,0.5)',
}

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

const stateToProps = ({ nodes, selection }, { id }) => ({
  model: nodes[id],
  selected: selection.indexOf(id) >= 0,
})

const boundActions = { addChild, setPosition }

// eslint-disable-next-line react/no-multi-comp
@connect(stateToProps, boundActions)
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
    const { model, id, style, selected } = this.props
    const baseStyle = model.children.length > 0 || this.state.feedback
      ? withChildrenStyle
      : noChildrenStyle
    const selectionStyle = selected ? selectedStyle : {}
    const fullStyle = {
      ...baseStyle,
      ...style,
      ...selectionStyle,
      backgroundColor: model.color,
    }
    return (<div style={fullStyle}>
      <div style={portContainer}>
        {id} {model.children.map(renderNode)} {this.renderFeedback()}
        <Port />
      </div>
    </div>)
  }
}

export default ChildNode
