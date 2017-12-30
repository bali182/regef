import React from 'react'
import { connection } from '../../src'

@connection()
class Connection extends React.Component {
  calculateWidth() {
    const { x1, x2 } = this.props
    return Math.abs(Math.abs(x2) - Math.abs(x1))
  }

  calculateHeight() {
    const { y1, y2 } = this.props
    return Math.abs(Math.abs(y2) - Math.abs(y1))
  }

  calculateCoordinates() {
    const { x1, x2, y1, y2 } = this.props
    const width = this.calculateWidth()
    const height = this.calculateHeight()
    return {
      x1: (x2 > x1) ? 0 : width,
      x2: (x2 > x1) ? width : 0,
      y1: (y2 > y1) ? 0 : height,
      y2: (y2 > y1) ? height : 0,
    }
  }

  calculateStyles() {
    const { x1, x2, y1, y2 } = this.props
    return {
      position: 'absolute',
      width: this.calculateWidth() + 5,
      height: this.calculateHeight() + 5,
      top: Math.min(y1, y2) - 2.5,
      left: Math.min(x1, x2) - 2.5,
    }
  }

  render() {
    const { regef } = this.props
    const style = this.calculateStyles()
    const coordinates = this.calculateCoordinates()
    return (<svg style={style} shapeRendering="geometricPrecision" {...regef.domAttributes}>
      <defs>
        <marker id="arrow" markerWidth={10} markerHeight={10} refX={9} refY={3} orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L9,3 z" fill="#000" />
        </marker>
      </defs>
      <line
        x1={coordinates.x1 + 2.5}
        y1={coordinates.y1 + 2.5}
        x2={coordinates.x2 + 2.5}
        y2={coordinates.y2 + 2.5}
        strokeWidth={1}
        stroke="#000"
        markerEnd="url(#arrow)"
      />
    </svg>)
  }
}

export default Connection
