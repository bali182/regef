import React from 'react'
import { connect } from 'react-redux'
import { component } from '../../../index'
import StepView from './StepView'
import { NODE } from '../../diagram/constants'

const stateToProps = ({ components, selection }, { id }) => ({
  step: components[id],
  selected: selection.indexOf(id) >= 0,
})

export class _Step extends React.Component {
  render() {
    const { id, selected } = this.props
    return <StepView id={id} selected={selected} />
  }
}

export const StepWithRegef = component(NODE)(_Step)
export default connect(stateToProps)(StepWithRegef)
