import React from 'react'
import { render } from 'react-dom'

import Diagram from '../src/experiment/diagram'
import Tool from '../src/experiment/tool'

const baseStyle = {
  width: '50vw',
  height: '50vh',
  overflow: 'hidden',
  backgroundColor: 'yellow',
}

render(
  <Diagram tool={new Tool()}>
    <div style={baseStyle}>
      Hi
    </div>
  </Diagram>,
  document.getElementById('app'),
)
