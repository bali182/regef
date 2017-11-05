import React from 'react'

import { REGEF_TYPE, DIAGRAM_TYPE } from '../constants'
import Diagram from './diagramComponent'
import DefaultConfig from './defaultConfig'

const diagram = (inputConfig = {}) => (Wrapped) => {
  const config = { ...DefaultConfig, ...inputConfig }

  class DecoratedDiagram extends React.Component {
    render() {
      const { children, ...rest } = this.props
      return (<Diagram ChildComponent={Wrapped} config={config} {...rest}>
        {children}
      </Diagram>)
    }
  }

  DecoratedDiagram[REGEF_TYPE] = DIAGRAM_TYPE

  return DecoratedDiagram
}

export default diagram
