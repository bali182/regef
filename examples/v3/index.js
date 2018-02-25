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
})

render(
  <Provider store={store}>
    <Diagram engine={engine}>
      <Root />
    </Diagram>
  </Provider>,
  document.getElementById('app'),
)
