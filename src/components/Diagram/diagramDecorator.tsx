import * as React from 'react'
import { DiagramConfig } from './diagramConfig'
import { Diagram } from './diagramComponent'


export const diagram = (config: DiagramConfig) => (Wraped: any) => {
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