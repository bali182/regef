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
    const vdom = (<div style={style} {...regef} {...rest} >
      {children}
    </div>)
    return vdom
  }
}

export default MyNodeLayer
