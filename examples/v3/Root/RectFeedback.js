import React from 'react'

const RectFeedback = ({ x, y, width, height, fill, stroke }) => {
  const style = {
    position: 'absolute',
    backgroundColor: fill,
    border: stroke,
    borderRadius: '2px',
    userSelect: 'none',
    pointerEvents: 'none',
    width,
    height,
    top: y,
    left: x,
  }
  return <div style={style}>&nbsp;</div>
}

export const DragFeedback = ({ x, y, width, height }) => (<RectFeedback
  x={x}
  y={y}
  width={width}
  height={height}
  fill="rgba(255, 255, 255, .8)"
  stroke="1px dashed #ccc"
/>)

export const ErrorFeedback = ({ x, y, width, height }) => (<RectFeedback
  x={x}
  y={y}
  width={width}
  height={height}
  fill="rgba(255, 0, 51, .3)"
  stroke="1px dashed #ff0033"
/>)

export const SelectionFeedback = ({ x, y, width, height }) => (<RectFeedback
  x={x}
  y={y}
  width={width}
  height={height}
  fill="rgba(63, 159, 233, 0.4)"
  stroke="1px dashed #3f9fe9"
/>)

export default RectFeedback
