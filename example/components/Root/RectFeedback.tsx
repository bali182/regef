import React from 'react'

type SpecialisedRectFeedbackProps = {
  x: number
  y: number
  width: number
  height: number
}

type BaseRectFeedbackProps = SpecialisedRectFeedbackProps & {
  fill: string
  stroke: string
}

const RectFeedback = ({ x, y, width, height, fill, stroke }: BaseRectFeedbackProps) => {
  const style: React.CSSProperties = {
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

export const DragFeedback = ({ x, y, width, height }: SpecialisedRectFeedbackProps) => (
  <RectFeedback
    x={x}
    y={y}
    width={width}
    height={height}
    fill="rgba(255, 255, 255, .6)"
    stroke="1px dashed #ccc"
  />
)

export const ErrorFeedback = ({ x, y, width, height }: SpecialisedRectFeedbackProps) => (
  <RectFeedback
    x={x}
    y={y}
    width={width}
    height={height}
    fill="rgba(255, 0, 51, .2)"
    stroke="1px dashed #ff0033"
  />
)

export const SelectionFeedback = ({ x, y, width, height }: SpecialisedRectFeedbackProps) => (
  <RectFeedback
    x={x}
    y={y}
    width={width}
    height={height}
    fill="rgba(63, 159, 233, .4)"
    stroke="1px dashed #3f9fe9"
  />
)

export default RectFeedback
