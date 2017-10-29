import * as React from 'react'
import { DiagramConfig } from './diagramConfig'
import { bind } from '../../utils/bind'

interface DiagramState {
  childRef: any
  deltaX?: number
  deltaY?: number
}

interface DiagramProps {
  config: DiagramConfig
  ChildComponent: any
}

export class Diagram extends React.Component<DiagramProps, DiagramState> {
  constructor() {
    super()
    this.state = {
      childRef: null,
      deltaX: null,
      deltaY: null
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

  @bind onMouseDown(e: React.MouseEvent<HTMLElement>) {
    const { clientX, clientY, currentTarget } = e
    const offsetX = this.props.config.getOffsetX(this.state.childRef)
    const offsetY = this.props.config.getOffsetY(this.state.childRef)
    // const { top, left } = currentTarget.getBoundingClientRect()
    const deltaX = clientX - offsetX
    const deltaY = clientY - offsetY
    this.setState({ deltaX, deltaY })
  }
  @bind onMouseMove(e: React.MouseEvent<HTMLElement>) {
    const { deltaX, deltaY } = this.state
    if (deltaX !== null && deltaY !== null) {
      const { clientX, clientY } = e
      const x = clientX - deltaX
      const y = clientY - deltaY
      this.props.config.setOffset(this.state.childRef, { x, y })
    }
  }
  @bind onMouseUp(e: React.MouseEvent<HTMLElement>) {
    this.setState({
      deltaX: null,
      deltaY: null
    })
  }
  @bind onMouseLeave(e: React.MouseEvent<HTMLElement>) {
    this.setState({
      deltaX: null,
      deltaY: null
    })
  }

  /*@autobind() onDrag(e) {
    consumeEvent(e)
    const { clientX, clientY } = e
    const { _deltaX, _deltaY } = this
    this.props.moveComponent(this.props.id, clientX - _deltaX, clientY - _deltaY)
  }

  @autobind() onDragStart(e) {
    consumeEvent(e)
    if (!this.props.selection.includes(this.props.id)) {
      this.props.selectionChanged([this.props.id])
    }
    const { clientX, clientY } = e
    const { x, y } = this.props
    this._deltaX = clientX - x
    this._deltaY = clientY - y
  }

  @autobind() onDragEnd(e) {
    consumeEvent(e)
    delete this._deltaX
    delete this._deltaY
  }*/


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
