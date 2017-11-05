import React from 'react'
import { render } from 'react-dom'

import MyNodeLayer from './MyNodeLayer'
import MyDiagram from './MyDiagram'

const baseStyle = {
  width: '100vw',
  height: '100vh',
  overflow: 'auto',
  backgroundColor: 'yellow',
}

const itemStyle = (backgroundColor) => ({
  display: 'inline-block',
  padding: 10,
  backgroundColor,
  userSelect: 'none',
})

const r = itemStyle('red')
const g = itemStyle('green')
const b = itemStyle('blue')

render(
  <MyDiagram style={baseStyle}>
    <MyNodeLayer>
      <div style={r}>red</div>
      <div style={g}>green</div>
      <div style={b}>blue</div>
    </MyNodeLayer>
  </MyDiagram>,
  document.getElementById('app'),
)
