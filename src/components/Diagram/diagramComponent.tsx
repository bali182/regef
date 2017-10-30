import * as React from 'react'
import { DiagramConfig } from './diagramConfig'
import { bind } from '../../utils/bind'

interface DiagramProps {
  config: DiagramConfig
  ChildComponent: any
}

export class Diagram extends React.Component<DiagramProps, {}> {
  private _childRef: any = null
  private _deltaX?: number = null
  private _deltaY?: number = null

  @bind onWheel(e: React.WheelEvent<any>) {
    const component = this._childRef
    const currentZoom = this.props.config.getZoomLevel(component) || 100
    const deltaY = -e.deltaY
    const delta = (e.ctrlKey && deltaY % 1 !== 0) ? (deltaY / 3) : (deltaY / 10)
    const level = currentZoom + delta
    this.props.config.setZoomLevel(component, { level, delta })
  }

  @bind onMouseDown(e: React.MouseEvent<HTMLElement>) {
    const { clientX, clientY, currentTarget } = e
    const offsetX = this.props.config.getOffsetX(this._childRef)
    const offsetY = this.props.config.getOffsetY(this._childRef)
    // const { top, left } = currentTarget.getBoundingClientRect()
    this._deltaX = clientX - offsetX
    this._deltaY = clientY - offsetY
  }
  @bind onMouseMove(e: React.MouseEvent<HTMLElement>) {
    const { _deltaX, _deltaY } = this
    if (_deltaX !== null && _deltaY !== null) {
      const { clientX, clientY } = e
      const x = clientX - _deltaX
      const y = clientY - _deltaY
      this.props.config.setOffset(this._childRef, { x, y })
    }
  }
  @bind onMouseUp(e: React.MouseEvent<HTMLElement>) {
    this.clearDeltas()
  }
  @bind onMouseLeave(e: React.MouseEvent<HTMLElement>) {
    this.clearDeltas()
  }

  @bind saveRef(childRef: any) {
    this._childRef = childRef
  }

  private clearDeltas() {
    this._deltaX = null
    this._deltaY = null
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
