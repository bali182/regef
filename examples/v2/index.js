import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'

import store from './store'
import { Diagram, DefaultTool } from '../../src'
import RootNode from './RootNode'

const externalNodeStyle = {
  marginLeft: '25vw',
  width: '50vw',
  minHeight: '10vh',
  overflow: 'hidden',
  backgroundColor: 'blue',
  color: 'white',
}

render(
  <Provider store={store}>
    <div>
      <Diagram tool={new DefaultTool()}>
        <RootNode />
      </Diagram>
      <div style={externalNodeStyle}>
        External DOM tree
      </div>
    </div>
  </Provider>,
  document.getElementById('app'),
)
