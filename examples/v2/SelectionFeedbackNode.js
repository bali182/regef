
import React from 'react'

const feedbackNodeStyle = {
  boxSizing: 'border-box',
  pointerEvents: 'none',
  cursor: 'default',
  backgroundColor: 'rgba(63, 159, 233, 0.48)',
  border: '2px dashed #3f9fe9',
}

const FeedbackNode = ({ x, y, width, height }) => {
  const fullStyle = {
    ...feedbackNodeStyle,
    position: 'absolute',
    top: y,
    left: x,
    width,
    height,
  }
  return (<div style={fullStyle}>
    &nbsp;
  </div>)
}


export default FeedbackNode
