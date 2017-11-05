import React from 'react'
import { node } from '../src/Node'

const config = {
  getId(component) {
    return component.props.id
  },
}

@node(config)
class MyNode extends React.Component {
  render() {
    const { regef, children, style, color, ...rest } = this.props
    const basicStyle = {
      display: 'inline-block',
      padding: 10,
      backgroundColor: color,
      userSelect: 'none',
    }
    return (<div style={{ ...style, ...basicStyle }} {...regef} {...rest} >
      {color}
    </div>)
  }
}

export default MyNode
