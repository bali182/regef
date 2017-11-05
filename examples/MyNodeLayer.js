import React from 'react'
import { layer } from '../src/Layer'

const config = {
  getId(component) {
    return component.props.id || 'layer'
  },
}

@layer(config)
class MyNodeLayer extends React.Component {
  render() {
    const { regef, children, style, ...rest } = this.props
    const fullStyle = { ...style, position: 'relative' }
    return (<div style={fullStyle} {...regef} {...rest} >
      {children}
    </div>)
  }
}

export default MyNodeLayer
