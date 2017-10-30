import * as React from 'react'
import { Children, cloneElement } from 'react'
import * as ReactDOM from 'react-dom'

import { diagram, DiagramConfig } from './components/Diagram'

const config: DiagramConfig = {
  getZoomLevel(component) {
    return (component.state as any).zoomLevel
  },
  setZoomLevel(component, { level }) {
    (component as any).setZoom(level)
    console.log(level)
  },
  getOffsetX(component) {
    return (component as any).state.offsetX
  },
  getOffsetY(component) {
    return (component as any).state.offsetY
  },
  setOffset(component, { x, y }) {
    (component as any).setOffset(x, y)
  }
}

type State = {
  zoomLevel: number,
  offsetX: number,
  offsetY: number
}

@diagram(config)
class MyDiagram extends React.Component<any, State> {

  constructor() {
    super()
    this.state = {
      zoomLevel: 100,
      offsetX: 0,
      offsetY: 0,
    }
  }

  setOffset(offsetX: number, offsetY: number) {
    this.setState({ offsetX, offsetY })
  }
  setZoom(zoomLevel: number) {
    this.setState({ zoomLevel })
  }

  buildTransform() {
    const { zoomLevel, offsetX, offsetY } = this.state
    return {
      transform: `translate(${offsetX}px, ${offsetY}px) scale(${zoomLevel / 100})`
    }
  }

  render() {
    const { eventHandlers, children, style } = this.props
    const transform = this.buildTransform()
    return <div
      {...eventHandlers}
      style={style}>
      {Children.map(children, (child: any) => {
        if (typeof child !== 'string') {
          const { props } = child
          const newStyle = { ...props.style, ...transform }
          const newProps = { ...props, style: newStyle }
          return cloneElement(child, newProps)
        }
        return child
      })}
    </div>
  }
}

const baseStyle = {
  width: 500,
  height: 500,
  border: '1px solid red',
  overflow: 'scroll',
  backgroundColor: 'yellow',
  userSelect: 'none'
}

ReactDOM.render(
  <MyDiagram style={baseStyle}>
    <div style={{ minWidth: '100%', minHeight: '100%' }}>
      <div style={{ backgroundColor: 'red' }}>red</div>
      <div style={{ backgroundColor: 'green' }}>green</div>
      <div style={{ backgroundColor: 'blue' }}>blue</div>
    </div>
  </MyDiagram>,
  document.getElementById('app')
)