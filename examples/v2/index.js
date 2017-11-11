import React from 'react'
import { render } from 'react-dom'

import Diagram from '../../src/experiment/diagram'
import DefaultTool from '../../src/experiment/defaultTool'
import { MyNode, MyCompositeNode } from './MyNode'

const baseStyle = {
  marginTop: '25vh',
  marginLeft: '25vw',
  width: '50vw',
  height: '50vh',
  overflow: 'hidden',
  backgroundColor: 'yellow',
}

render(
  <Diagram tool={new DefaultTool()}>
    <div style={baseStyle}>
      <MyCompositeNode>
        <MyNode text="1" />
        <MyNode text="2" />
        <MyNode text="3" />
      </MyCompositeNode>
      <MyNode text="4" />
      <MyCompositeNode>
        <div style={{ padding: 10, backgroundColor: 'yellow' }}>
          <MyNode text="5" />
          <MyNode text="6" />
          <MyNode text="7" />
        </div>
      </MyCompositeNode>
    </div>
  </Diagram>,
  document.getElementById('app'),
)
