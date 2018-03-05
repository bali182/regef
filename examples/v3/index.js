import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import {
  Diagram,
  Attachment,
  Engine,
  ConnectCapability,
  SingleSelectionCapability,
  MultiSelectionCapability,
  CancelCapability,
  DeleteCapability,
  CreationCapability,
  DragCapability,
} from '../../src/index'

import store from './redux/store'
import Root from './Root'
import Palette from './Palette'

import DiagramSelectionProvider from './DiagramSelectionProvider'

import RootEditPolicy from './policies/RootEditPolicy'
import NodeEditPolicy from './policies/NodeEditPolicy'
import StepEditPolicy from './policies/StepEditPolicy'
import ContainerEditPolicy from './policies/ContainerEditPolicy'
import CreationEditPolicy from './policies/CreationEditPolicy'

const engine = new Engine({
  selectionProvider: new DiagramSelectionProvider(),
  capabilities: [
    new DragCapability(),
    new ConnectCapability(),
    new SingleSelectionCapability(),
    new MultiSelectionCapability(),
    new CancelCapability(),
    new DeleteCapability(),
    new CreationCapability(),
  ],
  editPolicies: [
    new RootEditPolicy(),
    new NodeEditPolicy(),
    new StepEditPolicy(),
    new ContainerEditPolicy(),
    new CreationEditPolicy(),
  ],
  dependencies: {
    hello: 'world',
  },
})

render(
  <Provider store={store}>
    <div>
      <Diagram engine={engine}>
        <Root />
      </Diagram>
      <Attachment id="palette" engine={engine}>
        <Palette />
      </Attachment>
    </div>
  </Provider>,
  document.getElementById('app'),
)
