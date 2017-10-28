import * as React from 'react'
import { LayerConfig } from './layerConfig'
import { LayerComponent } from './layerComponent'


export const layer = (config: LayerConfig) => (Wraped: any) => {
  class LayerComp extends React.Component {
    render(): JSX.Element {
      const { children, ...rest } = this.props
      return <LayerComponent
        ChildComponent={Wraped}
        config={config}
        {...rest}>
        {children}
      </LayerComponent>
    }
  }
  return LayerComp as any
}