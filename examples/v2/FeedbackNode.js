
import React from 'react'

const feedbackNodeStyle = {
  display: 'table-cell',
  verticalAlign: 'middle',
  borderRadius: 4,
  pointerEvents: 'none',
  cursor: 'default',
  backgroundColor: '#efefef',
  border: '2px dashed #ccc',
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
