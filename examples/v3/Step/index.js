import React from 'react'
import StepView from './StepView'

import { node } from '../../../src/index'
import StepEditPolicy from './StepEditPolicy'

@node(StepEditPolicy)
export default class Step extends React.Component {
  render() {
    return <StepView {...this.props} />
  }
}
