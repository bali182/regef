import React, { Children, cloneElement } from 'react'
import { render } from 'react-dom'

import { diagram } from './components/Diagram'

const config = {
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
      transform: `translate(${offsetX}px, ${offsetY}px) scale(${zoomLevel / 100})`,
    }
  }

  render() {
    const { eventHandlers, children, style } = this.props
    const transform = this.buildTransform()
    return (<div
      {...eventHandlers}
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

const baseStyle = {
  width: 500,
  height: 500,
  border: '1px solid red',
  overflow: 'auto',
  backgroundColor: 'yellow',
  userSelect: 'none',
}

render(
  <MyDiagram style={baseStyle}>
    <div style={{ minWidth: '100%', minHeight: '100%' }}>
      <div style={{ backgroundColor: 'red' }}>red</div>
      <div style={{ backgroundColor: 'green' }}>green</div>
      <div style={{ backgroundColor: 'blue' }}>blue</div>
    </div>
  </MyDiagram>,
  document.getElementById('app'),
)
