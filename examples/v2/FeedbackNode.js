
import React from 'react'

const feedbackNodeStyle = {
  boxSizing: 'border-box',
  borderRadius: 4,
  pointerEvents: 'none',
  cursor: 'default',
  backgroundColor: '#efefef',
  border: '2px dashed #ccc',
  margin: '0px 10px',
}

const FeedbackNode = ({ x, y, width, height, absolute = true }) => {
  const fullStyle = absolute
    ? { ...feedbackNodeStyle, top: y, left: x, width, height, position: 'absolute' }
    : { ...feedbackNodeStyle, width, height }
  return (<div style={fullStyle}>
    &nbsp;
  </div>)
}


export default FeedbackNode
