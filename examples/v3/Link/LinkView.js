import React from 'react'

const calculateWidth = (x1, x2) => Math.abs(Math.abs(x2) - Math.abs(x1))
const calculateHeight = (y1, y2) => Math.abs(Math.abs(y2) - Math.abs(y1))
const calculateCoordinates = (x1, y1, x2, y2) => {
  const width = calculateWidth(x1, x2)
  const height = calculateHeight(y1, y2)
  return {
    x1: (x2 > x1) ? 0 : width,
    x2: (x2 > x1) ? width : 0,
    y1: (y2 > y1) ? 0 : height,
    y2: (y2 > y1) ? height : 0,
  }
}

const calculateStyles = (x1, y1, x2, y2) => ({
  position: 'absolute',
  pointerEvents: 'none',
  width: calculateWidth(x1, x2) + 5,
  height: calculateHeight(y1, y2) + 5,
  top: Math.min(y1, y2) - 2.5,
  left: Math.min(x1, x2) - 2.5,
})

const LinkView = ({ x1, y1, x2, y2, selected }) => {
  const coordinates = calculateCoordinates(x1, y1, x2, y2)
  const linkStyle = calculateStyles(x1, y1, x2, y2)
  const color = selected ? '#006db6' : '#888'
  // TODO this is not robust
  const id = selected ? 'arrow-selected' : 'arrow'
  return (<svg style={linkStyle} shapeRendering="geometricPrecision">
    <defs>
      <marker id={id} markerWidth={10} markerHeight={10} refX={9} refY={3} orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill={color} />
      </marker>
    </defs>
    <line
      x1={coordinates.x1 + 2.5}
      y1={coordinates.y1 + 2.5}
      x2={coordinates.x2 + 2.5}
      y2={coordinates.y2 + 2.5}
      strokeWidth={1}
      stroke={color}
      markerEnd={`url(#${id})`}
    />
  </svg>)
}

export default LinkView
