import React from 'react'

const normalContainerStyle = {
  display: 'flex',
  position: 'absolute',
  flexDirection: 'column',
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid #ddd',
  borderRadius: '4px',
  fontSize: '.8em',
  whiteSpace: 'nowrap',
  userSelect: 'none',
  boxSizing: 'border-box',
  cursor: 'default',
}

const selectedConteinerStyle = {
  ...normalContainerStyle,
  borderColor: '#006db6',
  boxShadow: '0px 0px 20px -5px #006db6',
}

const normalTitleStyle = {
  boxSizing: 'border-box',
  padding: '5px 10px',
  textAlign: 'center',
  borderBottom: '1px solid #ddd',
  minHeight: '20px',
  width: '100%',
}

const selectedTitleStyle = {
  ...normalTitleStyle,
  borderColor: '#006db6',
}

const laneStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center',
}

const ContainerComponent = ({ id, x, y, children, selected, ...rest }) => {
  const containerStyle = selected ? selectedConteinerStyle : normalContainerStyle
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

export default ContainerComponent
