import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import {
  DiagramPart,
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
  selectionProvider: ({ toolkit }) => new DiagramSelectionProvider(toolkit),
  capabilities: [
    new DragCapability(),
    new ConnectCapability(),
    new SingleSelectionCapability(),
    new MultiSelectionCapability(),
    new CancelCapability(),
    new DeleteCapability(),
    new CreationCapability(),
  ],
  editPolicies: ({ toolkit }) => [
    new RootEditPolicy(toolkit),
    new NodeEditPolicy(toolkit),
    new StepEditPolicy(toolkit),
    new ContainerEditPolicy(toolkit),
    new CreationEditPolicy(toolkit),
  ],
})

render(
  <Provider store={store}>
    <div>
      <DiagramPart engine={engine}>
        <Root />
      </DiagramPart>
      <DiagramPart id="palette" engine={engine}>
        <Palette />
      </DiagramPart>
    </div>
  </Provider>,
  document.getElementById('app'),
)
