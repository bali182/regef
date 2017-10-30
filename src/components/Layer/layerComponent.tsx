import * as React from 'react'
import { bind } from '../../utils/bind'
import { LayerSettings } from './layerSettings'

interface LayerProps {
  ChildComponent: any
}

class Layer extends React.Component<LayerProps, {}> {
  render() {
    const { ChildComponent, children, ...props } = this.props
    return (<ChildComponent {...props}>
      {children}
    </ChildComponent>)
  }
}