import React from 'react'
import { connect, ComponentClass } from 'react-redux'
import { component, RegefComponentProps } from '../../../src/index'
import StepView from './StepView'
import { NODE } from '../../diagram/constants'

const stateToProps = ({ components, selection }, { id }) => ({
  step: components[id],
  selected: selection.indexOf(id) >= 0,
})

type ReduxProps = {
  step: any
  selected: boolean
}

type OwnProps = {
  id: string
}

type StepProps = ReduxProps & OwnProps & RegefComponentProps

export class _Step extends React.Component<StepProps> {
  render() {
    const { id, selected } = this.props
    return <StepView id={id} selected={selected} />
  }
}

export const StepWithRegef = component<StepProps>(NODE)(_Step)
export const Step = connect<ReduxProps, {}, OwnProps>(stateToProps)(
  StepWithRegef,
) as ComponentClass<OwnProps>
