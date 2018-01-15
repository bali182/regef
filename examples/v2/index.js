import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'

import store from './redux/store'
import { Diagram, DefaultTool, NodeDragTracker, ConnectDragTracker, SingleSelectionDragTracker, MultiSelectionDragTracker } from '../../src'
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

const tool = new DefaultTool([
  new NodeDragTracker(),
  new ConnectDragTracker(),
  new SingleSelectionDragTracker(),
  new MultiSelectionDragTracker(),
])

render(
  <Provider store={store}>
    <div style={rootStyle}>
      <Diagram tool={tool}>
        <RootNode />
      </Diagram>
    </div>
  </Provider>,
  document.getElementById('app'),
)
