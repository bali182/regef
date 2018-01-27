import React from 'react'
import StepView from './StepView'

export default class Step extends React.Component {
  render() {
    return <StepView {...this.props} />
  }
}
