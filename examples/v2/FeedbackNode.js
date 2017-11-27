
import React from 'react'

const feedbackNodeStyle = {
  position: 'absolute',
  display: 'table-cell',
  verticalAlign: 'middle',
  borderRadius: 4,
  pointerEvents: 'none',
  cursor: 'default',
  backgroundColor: '#efefef',
  border: '2px dashed #ccc',
}

const FeedbackNode = ({ x, y, width, height }) => {
  const fullStyle = { ...feedbackNodeStyle, top: y, left: x, width, height }
  return (<div style={fullStyle}>
    &nbsp;
  </div>)
}


export default FeedbackNode
