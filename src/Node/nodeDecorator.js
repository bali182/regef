import React from 'react'
import { REGEF_TYPE, NODE_TYPE } from '../constants'

import Node from './nodeComponent'
import DefaultConfig from './defaultConfig'

const node = (inputConfig = {}) => (Wrapped) => {
  const config = { ...DefaultConfig, ...inputConfig }

  class DecoratedNode extends React.Component {
    render() {
      const { children, ...rest } = this.props
      return (<Node ChildComponent={Wrapped} config={config} {...rest}>
        {children}
      </Node>)
    }
  }

  DecoratedNode[REGEF_TYPE] = NODE_TYPE

  return DecoratedNode
}

export default node
