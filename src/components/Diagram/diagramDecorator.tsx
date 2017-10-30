import * as React from 'react'
import { DiagramConfig } from './diagramConfig'
import { Diagram } from './diagramComponent'
import { noop, constant } from '../../utils/functions'
import { merge } from '../../utils/merge'

const DefaultConfig: DiagramConfig = {
  // setters
  setZoomLevel: noop,
  setOffset: noop,

  // getters
  getZoomLevel: constant(100),
  getMinZoomLevel: constant(10),
  getMaxZoomLevel: constant(300),
  getOffsetX: constant(0),
  getOffsetY: constant(0),
}

export const diagram = (inputConfig: DiagramConfig = {}) => (Wraped: any) => {
  const config = merge(DefaultConfig, inputConfig)
  class DecoratedDiagram extends React.Component {
    render(): JSX.Element {
      const { children, ...rest } = this.props
      return <Diagram
        ChildComponent={Wraped}
        config={config}
        {...rest}>
        {children}
      </Diagram>
    }
  }
  return DecoratedDiagram as any
}