import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'

import store from './store'
import { Diagram, DefaultTool } from '../../src'
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

render(
  <Provider store={store}>
    <div style={rootStyle}>
      <Diagram tool={new DefaultTool()}>
        <RootNode />
      </Diagram>
    </div>
  </Provider>,
  document.getElementById('app'),
)
