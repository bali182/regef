import React from 'react'
import { RegefContext } from './RegefContext'
import { Engine } from './Engine'
import { Id } from './typings'

type DiagramPartProps = {
  engine: Engine
  id: Id
}

export class DiagramPart extends React.PureComponent<DiagramPartProps> {
  componentDidMount(): void {
    const { engine } = this.props
    if (!engine.eventManager.hooked) {
      engine.eventManager.hookListeners()
    }
  }
  componentWillUnmount(): void {
    const { id, engine } = this.props
    const part = engine.__parts.get(id)
    if (part && part.registry) {
      part.registry.setRoot(null)
    }
    engine.__parts.delete(id)
    if (engine.__parts.size === 0) {
      engine.eventManager.unhookListeners()
    }
  }
  render(): React.ReactNode {
    const { id, engine } = this.props
    return (
      <RegefContext.Provider value={{ id, engine }}>
        {React.Children.only(this.props.children)}
      </RegefContext.Provider>
    )
  }
}
