import React from 'react'
import { selectedNodeStyle, normalNodeStyle } from './styles'

const NodeView = ({ id, x, y, selected, ...rest }) => {
  const nodeStyle = selected ? selectedNodeStyle : normalNodeStyle
  return (<div style={{ ...nodeStyle, top: y, left: x }} {...rest}>
    <span>{id}</span>
  </div>)
}

export default NodeView
