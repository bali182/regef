import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import {
  Diagram,
  Engine,
  DragCapability,
  ConnectCapability,
  SingleSelectionCapability,
  MultiSelectionCapability,
  CancelCapability,
  DeleteCapability,
} from '../../src/index'

import store from './redux/store'
import Root from './Root'

import DiagramSelectionProvider from './DiagramSelectionProvider'

import RootEditPolicy from './policies/RootEditPolicy'
import NodeEditPolicy from './policies/NodeEditPolicy'
import StepEditPolicy from './policies/StepEditPolicy'
import ContainerEditPolicy from './policies/ContainerEditPolicy'

const engine = new Engine({
  selectionProvider: new DiagramSelectionProvider(),
  capabilities: [
    new DragCapability(),
    new ConnectCapability(),
    new SingleSelectionCapability(),
    new MultiSelectionCapability(),
    new CancelCapability(),
    new DeleteCapability(),
  ],
  editPolicies: [
    new RootEditPolicy(),
    new NodeEditPolicy(),
    new StepEditPolicy(),
    new ContainerEditPolicy(),
  ],
  dependencies: {
    hello: 'world',
  },
})

render(
  <Provider store={store}>
    <Diagram engine={engine}>
      <Root />
    </Diagram>
  </Provider>,
  document.getElementById('app'),
)
