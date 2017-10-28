import * as React from 'react'
import { LayerConfig } from './layerConfig'
import { bind } from '../../utils/bind'

interface LayerState {
  childRef: any
}

interface LayerProps {
  config: LayerConfig
  ChildComponent: any
}

export class LayerComponent extends React.Component<LayerProps, LayerState> {
  constructor() {
    super()
    this.state = {
      childRef: null,
    }
  }
  @bind onWheel(e: React.WheelEvent<any>) {
    const component = this.state.childRef
    const currentZoom = this.props.config.getZoomLevel(component) || 100
    const deltaY = -e.deltaY
    const delta = (e.ctrlKey && deltaY % 1 !== 0) ? (deltaY / 3) : (deltaY / 10)
    const level = currentZoom + delta
    this.props.config.setZoomLevel(component, { level, delta })
  }
  @bind onMouseDown(e: React.MouseEvent<any>) {
  }
  @bind onMouseLeave(e: React.MouseEvent<any>) {
  }
  @bind onMouseUp(e: React.MouseEvent<any>) {
  }
  @bind onMouseMove(e: React.MouseEvent<any>) {
  }
  @bind saveRef(childRef: any) {
    this.setState({ childRef })
  }

  render() {
    const { children, config, ChildComponent, ...rest } = this.props
    return <ChildComponent
      ref={this.saveRef}
      onWheel={this.onWheel}
      onMouseDown={this.onMouseDown}
      onMouseMove={this.onMouseMove}
      onMouseUp={this.onMouseUp}
      onMouseLeave={this.onMouseLeave}
      {...rest}>
      {children}
    </ChildComponent>
  }
}
