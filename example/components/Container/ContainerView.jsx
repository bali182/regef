import React from 'react'
import {
  selectedContainerStyle,
  normalContainerStyle,
  selectedTitleStyle,
  normalTitleStyle,
  laneStyle,
} from './styles'

const ContainerView = ({ id, x, y, children, selected, ...rest }) => {
  const containerStyle = selected ? selectedContainerStyle : normalContainerStyle
  const titleStyle = selected ? selectedTitleStyle : normalTitleStyle
  return (<div style={{ ...containerStyle, top: y, left: x }} {...rest}>
    <div style={titleStyle}>
      <span>{id}</span>
    </div>
    <div style={laneStyle}>
      {children}
    </div>
  </div>)
}

export default ContainerView
