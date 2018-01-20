import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'

import store from './redux/store'
import { Diagram, Engine, NodeDragTracker, ConnectDragTracker, SingleSelectionDragTracker, MultiSelectionDragTracker } from '../../src/index'
import RootNode from './RootNode'

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
  dragTrackers: [
    new NodeDragTracker(),
    new ConnectDragTracker(),
    new SingleSelectionDragTracker(),
    new MultiSelectionDragTracker(),
  ],
  keyHandlers: [],
  selectionProvider: null,
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
