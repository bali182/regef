import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { DiagramPart } from '../src/index'

import createStore from './state'
import createEngine from './diagram'
import Root from './components/Root'
import { DIAGRAM } from './diagram/constants'

const rootContainerStyle = {
  margin: '10vh',
}

const store = createStore()
const engine = createEngine(store)

render(
  <Provider store={store}>
    <div style={rootContainerStyle}>
      <DiagramPart engine={engine} id={DIAGRAM}>
        <Root />
      </DiagramPart>
    </div>
  </Provider>,
  document.getElementById('app'),
)
