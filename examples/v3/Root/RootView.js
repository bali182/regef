import React from 'react'

import { rootStyle } from './styles'

const RootView = ({ children, ...rest }) => (<div style={rootStyle} {...rest}>
  {children}
</div>)

export default RootView
