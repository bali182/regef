import React, { Children, cloneElement } from 'react'
import { diagram } from '../src/Diagram'

const config = {
  getId() {
    return 'diagram'
  },
  getZoomLevel({ state: { zoomLevel } }) {
    return zoomLevel
  },
  getOffsetX({ state: { offsetX } }) {
    return offsetX
  },
  getOffsetY({ state: { offsetY } }) {
    return offsetY
  },
  setOffset(component, { x, y }) {
    component.setOffset(Math.max(x, 0), Math.max(y, 0))
  },
  setZoomLevel(component, { level }) {
    component.setZoom(level)
  },
}

@diagram(config)
class MyDiagram extends React.Component {
  constructor() {
    super()
    this.state = {
      zoomLevel: 100,
      offsetX: 0,
      offsetY: 0,
    }
  }

  setOffset(offsetX, offsetY) {
    this.setState({ offsetX, offsetY })
  }
  setZoom(zoomLevel) {
    this.setState({ zoomLevel })
  }

  buildTransform() {
    const { zoomLevel, offsetX, offsetY } = this.state
    return {
      width: 'max-content',
      transformOrigin: 'top left',
      transform: `translate(${offsetX}px, ${offsetY}px) scale(${zoomLevel / 100})`,
    }
  }

  render() {
    const { regef, children, style } = this.props
    const transform = this.buildTransform()
    return (<div
      {...regef}
      style={style}
    >
      {Children.map(children, (child) => {
        if (typeof child !== 'string') {
          const { props } = child
          const newStyle = { ...props.style, ...transform }
          const newProps = { ...props, style: newStyle }
          return cloneElement(child, newProps)
        }
        return child
      })}
    </div>)
  }
}

export default MyDiagram
