import React from 'react'

import { normalPortStyle, hiddenPortStyle } from './styles'

export type PortViewProps = {
  visible: boolean
}

const PortView = ({ visible }: PortViewProps) => (
  <div style={visible ? normalPortStyle : hiddenPortStyle}>+</div>
)

export default PortView
