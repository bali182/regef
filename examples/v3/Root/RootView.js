import React from 'react'

import { rootStyle } from './styles'

// eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
const RootView = ({ children, ...rest }) => (<div tabIndex={0} style={rootStyle} {...rest}>
  {children}
</div>)

export default RootView
