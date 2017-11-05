import React from 'react'
import { object } from 'prop-types'
import { DIAGRAM_TYPE, DATA_TYPE } from '../constants'
import bind from '../utils/bind'
import createDataIdUpdater from '../utils/updateDataId'
import ComponentRegistry from '../ComponentRegistry'
import createHandler from '../EventManager'

class Diagram extends React.Component {
  constructor() {
    super()
    this._registry = new ComponentRegistry()
    this._childRef = null
    this._domRef = null
    this._deltaX = null
    this._deltaY = null
    this._document = null
    this._handler = null
    this._events = {
      ref: this.saveDomRef,
      onWheel: this.onWheel,
      onMouseDown: this.onMouseDown,
      [DATA_TYPE]: DIAGRAM_TYPE,
    }
    this.updateDataId = createDataIdUpdater(
      this,
      () => this._events,
      (_events) => {
        this._events = _events
      },
    )
  }

  getChildContext() {
    return { registry: this._registry }
  }

  componentDidMount() {
    this._document = window.document
    this._registry.register(this.props.config.getId(), DIAGRAM_TYPE, this)
  }

  componentWillUnmount() {
    this.removeDocumentListeners()
    this._registry.unregister(this.props.config.getId(), DIAGRAM_TYPE)
    this._document = null
    this._childRef = null
    this._domRef = null
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
    this._handler = createHandler(e, this._registry)
    this._handler.onStart(e)
    this.addDocumentListeners()
  }
  @bind onMouseMove(e) {
    this._handler.onChange(e)
  }
  @bind onMouseUp(e) {
    this._handler.onEnd(e)
    this._handler = null
    this.removeDocumentListeners()
  }

  @bind saveDomRef(domRef) {
    this._domRef = domRef
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
    const regef = this.updateDataId(this.props.config.getId())
    return (<ChildComponent ref={this.saveRef} regef={regef} {...rest}>
      {children}
    </ChildComponent>)
  }
}

Diagram.childContextTypes = {
  registry: object,
}

export default Diagram
