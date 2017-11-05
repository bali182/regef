import React from 'react'
import { REGEF_TYPE, LAYER_TYPE } from '../constants'

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

  DecoratedLayer[REGEF_TYPE] = LAYER_TYPE

  return DecoratedLayer
}

export default diagram
