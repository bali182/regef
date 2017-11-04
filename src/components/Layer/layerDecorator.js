import React from 'react'
import Layer from './layerComponent'
import DefaultConfig from './defaultConfig'

const diagram = (inputConfig = {}) => (Wrapped) => {
  const config = { ...DefaultConfig, ...inputConfig }
  class DecoratedLayer extends React.Component {
    render() {
      const { children, ...rest } = this.props
      return (<Layer ChildComponent={Wrapped} config={config} {...rest}>
        {children}
      </Layer>)
    }
  }
  return DecoratedLayer
}

export default diagram
