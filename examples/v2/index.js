import React from 'react'
import { render } from 'react-dom'

import Diagram from '../../src/diagram'
import DefaultTool from '../../src/tools/DefaultTool'
import { MyNode, MyRootNode, MyCompositeNode } from './MyNode'

const externalNodeStyle = {
  marginLeft: '25vw',
  width: '50vw',
  height: '10vh',
  overflow: 'hidden',
  backgroundColor: 'blue',
  color: 'white',
}

render(
  <div>
    <Diagram tool={new DefaultTool()}>
      <MyRootNode>
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
      </MyRootNode>
    </Diagram>
    <div style={externalNodeStyle}>
      External DOM tree
    </div>
  </div>,
  document.getElementById('app'),
)
