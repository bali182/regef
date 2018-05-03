import React, { Children, PureComponent } from 'react'
import { instanceOf, string, symbol, oneOfType } from 'prop-types'
import { RegefContext } from './RegefContext'
import Engine from './Engine'

export default class DiagramPart extends PureComponent {
  componentDidMount() {
    const { engine } = this.props
    if (!engine.eventManager.hooked) {
      engine.eventManager.hookListeners()
    }
  }
  componentWillUnmount() {
    const { id, engine } = this.props
    const parts = engine.__partsMap()
    const part = parts.get(id)
    if (part && part.registry) {
      part.registry.setRoot(null)
    }
    parts.delete(id)
    if (parts.size === 0) {
      engine.eventManager.unhookListeners()
    }
  }
  render() {
    const { id, engine } = this.props
    return (<RegefContext.Provider value={{ id, engine }}>
      {Children.only(this.props.children)}
    </RegefContext.Provider>)
  }
}

DiagramPart.propTypes = {
  engine: instanceOf(Engine).isRequired,
  id: oneOfType([string, symbol]).isRequired,
}
