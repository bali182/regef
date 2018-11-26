import React, { PureComponent, ReactNode } from 'react'
import { RegefContext } from './RegefContext'
import { DiagramPartProps } from './typings'

export class DiagramPart extends PureComponent<DiagramPartProps> {
  componentDidMount(): void {
    const { engine } = this.props
    if (!engine.eventManager.hooked) {
      engine.eventManager.hookListeners()
    }
  }
  componentWillUnmount(): void {
    const { id, engine } = this.props
    const part = engine.part(id)
    if (part && part.registry && part.registry.wrappers.size === 0) {
      engine.__parts.delete(id)
    }
    if (engine.__parts.size === 0) {
      engine.eventManager.unhookListeners()
    }
  }
  render(): ReactNode {
    return <RegefContext.Provider value={this.props}>{this.props.children}</RegefContext.Provider>
  }
}
