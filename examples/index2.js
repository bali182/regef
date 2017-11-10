import React from 'react'
import { render } from 'react-dom'

import MyNodeLayer from './MyNodeLayer'
import MyDiagram from './MyDiagram'
import MyNode from './MyNode'

const baseStyle = {
  width: '100vw',
  height: '100vh',
  overflow: 'auto',
  backgroundColor: 'yellow',
}

render(
  <MyDiagram style={baseStyle}>
    <MyNodeLayer>
      <MyNode color="red" id="red" />
      <MyNode color="green" id="green" />
      <MyNode color="blue" id="blue" />
      <div>Hello</div>
    </MyNodeLayer>
  </MyDiagram>,
  document.getElementById('app'),
)
