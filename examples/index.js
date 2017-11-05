import React from 'react'
import { render } from 'react-dom'

import MyDiagram from './MyDiagram'

const baseStyle = {
  width: 500,
  height: 500,
  border: '1px solid red',
  overflow: 'auto',
  backgroundColor: 'yellow',
  userSelect: 'none',
}

render(
  <MyDiagram style={baseStyle}>
    <div style={{ minWidth: '100%', minHeight: '100%' }}>
      <div style={{ backgroundColor: 'red' }}>red</div>
      <div style={{ backgroundColor: 'green' }}>green</div>
      <div style={{ backgroundColor: 'blue' }}>blue</div>
    </div>
  </MyDiagram>,
  document.getElementById('app'),
)
