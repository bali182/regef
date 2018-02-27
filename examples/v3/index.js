import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import {
  Diagram,
  Engine,
  DragMouseHandler,
  ConnectMouseHandler,
  SingleSelectionMouseHandler,
  MultiSelectionMouseHandler,
  CancelMouseHandlersKeyHandler,
  DeleteKeyHandler,
} from '../../src/index'

import store from './redux/store'
import Root from './Root'

import DiagramSelectionProvider from './DiagramSelectionProvider'

import RootEditPolicy from './policies/RootEditPolicy'
import NodeEditPolicy from './policies/NodeEditPolicy'
import StepEditPolicy from './policies/StepEditPolicy'
import ContainerEditPolicy from './policies/ContainerEditPolicy'

const engine = new Engine({
  mouseHandlers: [
    new DragMouseHandler(),
    new ConnectMouseHandler(),
    new SingleSelectionMouseHandler(),
    new MultiSelectionMouseHandler(),
  ],
  keyHandlers: [
    new CancelMouseHandlersKeyHandler(),
    new DeleteKeyHandler(),
  ],
  selectionProvider: new DiagramSelectionProvider(),
  editPolicies: [
    new RootEditPolicy(),
    new NodeEditPolicy(),
    new StepEditPolicy(),
    new ContainerEditPolicy(),
  ],
})

render(
  <Provider store={store}>
    <Diagram engine={engine}>
      <Root />
    </Diagram>
  </Provider>,
  document.getElementById('app'),
)
