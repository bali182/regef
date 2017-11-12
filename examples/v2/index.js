import React from 'react'
import { render } from 'react-dom'

import Diagram from '../../src/diagram'
import DefaultTool from '../../src/tools/DefaultTool'
import { MyNode, MyRootNode, MyCompositeNode } from './MyNode'

render(
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
  </Diagram>,
  document.getElementById('app'),
)
