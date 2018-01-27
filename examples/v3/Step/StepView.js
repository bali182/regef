import React from 'react'

import { selectedStepStyle, normalStepStyle } from './styles'

const StepView = ({ id, selected, ...rest }) => {
  const stepStyle = selected ? selectedStepStyle : normalStepStyle
  return (<div style={stepStyle} {...rest}>
    <span>{id}</span>
  </div>)
}

export default StepView
