import React from 'react'
import bind from '../../utils/bind'

class Diagram extends React.Component {
  constructor() {
    super()
    this._childRef = null
    this._deltaX = null
    this._deltaY = null
    this._document = null
    this._events = {
      onWheel: this.onWheel,
      onMouseDown: this.onMouseDown,
    }
  }

  componentDidMount() {
    this._document = window.document
  }

  @bind onWheel(e) {
    e.preventDefault() // TODO detect if scroll happened on scrollbar
    const component = this._childRef
    const currentZoom = this.props.config.getZoomLevel(component)
    const maxZoom = this.props.config.getMaxZoomLevel(component)
    const minZoom = this.props.config.getMinZoomLevel(component)
    const deltaY = -e.deltaY
    const delta = (e.ctrlKey && deltaY % 1 !== 0) ? (deltaY / 3) : (deltaY / 10)
    const level = Math.min(Math.max(currentZoom + delta, minZoom), maxZoom)
    if (level !== currentZoom) {
      this.props.config.setZoomLevel(component, { level, delta })
    }
  }

  @bind onMouseDown(e) {
    const { clientX, clientY } = e
    const offsetX = this.props.config.getOffsetX(this._childRef)
    const offsetY = this.props.config.getOffsetY(this._childRef)
    this._deltaX = clientX - offsetX
    this._deltaY = clientY - offsetY
    this.addDocumentListeners()
  }
  @bind onMouseMove(e) {
    const { _deltaX, _deltaY } = this
    if (_deltaX !== null && _deltaY !== null) {
      const { clientX, clientY } = e
      const x = clientX - _deltaX
      const y = clientY - _deltaY
      this.props.config.setOffset(this._childRef, { x, y })
    }
  }
  @bind onMouseUp() {
    this.clearDeltas()
    this.removeDocumentListeners()
  }

  @bind saveRef(childRef) {
    this._childRef = childRef
  }

  addDocumentListeners() {
    if (this._document) {
      this._document.addEventListener('mousemove', this.onMouseMove)
      this._document.addEventListener('mouseup', this.onMouseUp)
    }
  }

  removeDocumentListeners() {
    if (this._document) {
      this._document.removeEventListener('mousemove', this.onMouseMove)
      this._document.removeEventListener('mouseup', this.onMouseUp)
    }
  }

  clearDeltas() {
    this._deltaX = null
    this._deltaY = null
  }

  render() {
    const { children, config, ChildComponent, ...rest } = this.props
    return (<ChildComponent ref={this.saveRef} eventHandlers={this._events} {...rest}>
      {children}
    </ChildComponent>)
  }
}

export default Diagram
