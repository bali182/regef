import React from 'react'

const rootStyle = {
  marginTop: '10vh',
  marginLeft: '10vw',
  width: '80vw',
  minHeight: '80vh',
  overflow: 'hidden',
  backgroundColor: 'white',
  border: '1px solid #ccc',
  position: 'relative',
}

const RootComponent = ({ children, ...rest }) => (<div style={rootStyle} {...rest}>
  {children}
</div>)

export default RootComponent
