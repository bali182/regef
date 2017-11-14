import React from 'react'
import { render } from 'react-dom'

import Diagram from '../../src/diagram'
import DefaultTool from '../../src/tools/DefaultTool'
import { MyNode, MyRootNode, MyCompositeNode } from './MyNode'

const externalNodeStyle = {
  marginLeft: '25vw',
  width: '50vw',
  minHeight: '10vh',
  overflow: 'hidden',
  backgroundColor: 'blue',
  color: 'white',
}

render(
  <div>
    <Diagram tool={new DefaultTool()}>
      <MyRootNode>
        <MyCompositeNode items={['a', 'b']} />
        <MyNode id="c" />
        <MyCompositeNode items={['d', 'e', 'f', 'g']} />
      </MyRootNode>
    </Diagram>
    <div style={externalNodeStyle}>
      External DOM tree
    </div>
  </div>,
  document.getElementById('app'),
)
