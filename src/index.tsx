import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { layer, LayerConfig } from './components/Layer'

const config: LayerConfig = {
  getZoomLevel(component) {
    return (component.state as any).zoomLevel || 100
  },
  setZoomLevel(component, { level }) {
    (component as any).setZoom(level)
  }
}

@layer(config)
class MyLayer extends React.Component<any, { zoomLevel: number }> {

  constructor() {
    super()
    this.state = {
      zoomLevel: 100
    }
  }

  setZoom(zoomLevel: number) {
    this.setState({ zoomLevel })
  }

  buildTransform() {
    const { zoomLevel } = this.state
    return {
      transform: `scale(${zoomLevel / 100})`
    }
  }

  render() {
    const { onWheel, children } = this.props
    return <div onWheel={onWheel} style={this.buildTransform()}>
      {children}
    </div>
  }
}



ReactDOM.render(
  <div style={{ width: 200, height: 200 }}>
    <MyLayer>
      <div>Hello</div>
    </MyLayer>
  </div>,
  document.getElementById('app')
)