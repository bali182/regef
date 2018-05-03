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

class Wrapper extends React.Component {
  constructor() {
    super()
    this.state = { mounted: true }
  }
  changeMounted = () => {
    this.setState({ mounted: !this.state.mounted })
  }
  diagram() {
    if (this.state.mounted) {
      return [
        <DiagramPart engine={engine} id={DIAGRAM} key={'DIAGRAM'}><Root /></DiagramPart>,
      ]
    }
    return null
  }
  render() {
    return (<div style={rootContainerStyle}>
      <button onClick={this.changeMounted}>Mount/Unmount</button>
      {this.diagram()}
    </div>)
  }
}

render(
  <Provider store={store}>
    <Wrapper />
  </Provider>,
  document.getElementById('app'),
)
