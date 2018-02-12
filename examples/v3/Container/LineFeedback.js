import React from 'react'

const baseStyle = {
  boxSizing: 'content-box',
  userSelect: 'none',
  width: 0,
  height: '100%',
  minHeight: '40px',
  borderLeft: '1px dashed #ccc',
}

const firstStyle = {
  ...baseStyle,
  position: 'relative',
  left: 5,
}

const lastStyle = {
  ...baseStyle,
  position: 'relative',
  left: -5,
}

const LineFeedback = ({ first, last }) => {
  let style = baseStyle
  if (first) {
    style = firstStyle
  }
  if (last) {
    style = lastStyle
  }
  return (<div style={style} />)
}


export default LineFeedback
