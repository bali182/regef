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
  private _document: Document = null
  private _events: { [key: string]: React.EventHandler<any> }

  constructor() {
    super()
    this._events = {
      onWheel: this.onWheel,
      onMouseDown: this.onMouseDown
    }
  }

  @bind onWheel(e: React.WheelEvent<any>) {
    const component = this._childRef
    const currentZoom = this.props.config.getZoomLevel(component) || 100
    const deltaY = -e.deltaY
    const delta = (e.ctrlKey && deltaY % 1 !== 0) ? (deltaY / 3) : (deltaY / 10)
    const level = Math.max(currentZoom + delta, 5) // TODO make min/max zoom level configurable
    this.props.config.setZoomLevel(component, { level, delta })
  }

  @bind onMouseDown(e: React.MouseEvent<HTMLElement>) {
    const { clientX, clientY, currentTarget } = e
    const offsetX = this.props.config.getOffsetX(this._childRef)
    const offsetY = this.props.config.getOffsetY(this._childRef)
    this._deltaX = clientX - offsetX
    this._deltaY = clientY - offsetY
    this.addDocumentListeners()
  }
  @bind onMouseMove(e: MouseEvent) {
    const { _deltaX, _deltaY } = this
    if (_deltaX !== null && _deltaY !== null) {
      const { clientX, clientY } = e
      const x = clientX - _deltaX
      const y = clientY - _deltaY
      this.props.config.setOffset(this._childRef, { x, y })
    }
  }
  @bind onMouseUp(e: MouseEvent) {
    this.clearDeltas()
    this.removeDocumentListeners()
  }

  @bind saveRef(childRef: any) {
    this._childRef = childRef
  }

  private addDocumentListeners() {
    if (this._document) {
      this._document.addEventListener('mousemove', this.onMouseMove)
      this._document.addEventListener('mouseup', this.onMouseUp)
    }
  }

  private removeDocumentListeners() {
    if (this._document) {
      this._document.removeEventListener('mousemove', this.onMouseMove)
      this._document.removeEventListener('mouseup', this.onMouseUp)
    }
  }

  private clearDeltas() {
    this._deltaX = null
    this._deltaY = null
  }

  componentDidMount() {
    this._document = window.document
  }

  render() {
    const { children, config, ChildComponent, ...rest } = this.props
    return <ChildComponent
      ref={this.saveRef}
      eventHandlers={this._events}
      {...rest}>
      {children}
    </ChildComponent>
  }
}
