import React from 'react'

import { normalPortStyle, hiddenPortStyle } from './styles'

const PortView = ({ visible }) => (<div style={visible ? normalPortStyle : hiddenPortStyle}>
  +
</div>)

export default PortView
