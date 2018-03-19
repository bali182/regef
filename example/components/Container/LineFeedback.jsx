import React from 'react'

const containerStyle = {
  position: 'relative',
  width: 0,
  height: '100%',
  minHeight: '40px',
}

const lineStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: 0,
  height: '100%',
  boxSizing: 'content-box',
  userSelect: 'none',
  borderLeft: '1px dashed #006db6',
}

const LineFeedback = () => (<div style={containerStyle}>
  <div style={lineStyle} />
</div>)

export default LineFeedback
