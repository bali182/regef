import React from 'react'
import { render } from 'react-dom'

import RootComponent from './RootComponent'
import ContainerComponent from './ContainerComponent'
import StepComponent from './StepComponent'
import NodeComponent from './NodeComponent'
import LinkComponent from './LinkComponent'

render(
  <RootComponent>
    <LinkComponent x1={10} y1={20} x2={100} y2={200} selected />
    <LinkComponent x1={10} y1={200} x2={200} y2={10} />
    <NodeComponent x={100} y={200} id="hello" selected />
    <NodeComponent x={50} y={80} id="hello" />
    <ContainerComponent x={200} y={70} id="container" selected >
      <StepComponent id="henlo" />
      <StepComponent id="henlo" selected />
    </ContainerComponent>
  </RootComponent>,
  document.getElementById('app'),
)
