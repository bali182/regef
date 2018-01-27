import React from 'react'

const normalStepStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '3px 5px',
  textAlign: 'center',
  borderRadius: '4px',
  userSelect: 'none',
  fontSize: '.8em',
  minWidth: '40px',
  minHeight: '40px',
  border: '1px solid #ddd',
  cursor: 'default',
  margin: '10px',
}

const selectedStepStyle = {
  ...normalStepStyle,
  borderColor: '#006db6',
  boxShadow: '0px 0px 20px -5px #006db6',
}

const StepComponent = ({ id, selected, ...rest }) => {
  const stepStyle = selected ? selectedStepStyle : normalStepStyle
  return (<div style={stepStyle} {...rest}>
    <span>{id}</span>
  </div>)
}

export default StepComponent
