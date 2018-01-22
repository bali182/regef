import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'

import store from './redux/store'
import {
  Diagram,
  Engine,
  NodeMouseHandler,
  ConnectMouseHandler,
  SingleSelectionMouseHandler,
  MultiSelectionMouseHandler,
  CancelMouseHandlersKeyHandler,
  DeleteKeyHandler,
} from '../../src/index'
import RootNode from './RootNode'
import NodeSelectionProvider from './NodeSelectionProvider'

const rootStyle = {
  marginTop: '25vh',
  marginLeft: '25vw',
  width: '50vw',
  minHeight: '50vh',
  overflow: 'hidden',
  backgroundColor: 'yellow',
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
}

const engine = new Engine({
  mouseHandlers: [
    new NodeMouseHandler(),
    new ConnectMouseHandler(),
    new SingleSelectionMouseHandler(),
    new MultiSelectionMouseHandler(),
  ],
  keyHandlers: [
    new CancelMouseHandlersKeyHandler(),
    new DeleteKeyHandler(),
  ],
  selectionProvider: new NodeSelectionProvider(),
})

render(
  <Provider store={store}>
    <div style={rootStyle}>
      <Diagram engine={engine}>
        <RootNode />
      </Diagram>
    </div>
  </Provider>,
  document.getElementById('app'),
)
