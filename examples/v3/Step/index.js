import React from 'react'
import { connect } from 'react-redux'
import StepView from './StepView'

import { node } from '../../../src/index'
import StepEditPolicy from './StepEditPolicy'

const stateToProps = ({ components, selection }, { id }) => ({
  step: components[id],
  selected: selection.indexOf(id) >= 0,
})

@connect(stateToProps)
@node(StepEditPolicy)
export default class Step extends React.Component {
  render() {
    const { id, selected } = this.props
    return <StepView id={id} selected={selected} />
  }
}
