import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { DiagramPart } from '../src/DiagramPart'

import createStore from './state'
import createEngine from './diagram'
import { Root } from './components/Root'
import { DIAGRAM, ROOT } from './diagram/constants'

const rootContainerStyle = {
  margin: '10vh',
}

const store = createStore()
const engine = createEngine(store)

type WrapperState = {
  mounted: boolean
}

class Wrapper extends React.Component<object, WrapperState> {
  state: WrapperState = { mounted: true }
  constructor(props: object) {
    super(props)
  }
  changeMounted = () => {
    this.setState({ mounted: !this.state.mounted })
  }
  renderDiagram() {
    if (this.state.mounted) {
      return (
        <DiagramPart engine={engine} id={DIAGRAM} rootType={ROOT}>
          <Root />
        </DiagramPart>
      )
    }
    return null
  }
  render() {
    return (
      <div style={rootContainerStyle}>
        <button onClick={this.changeMounted}>Mount/Unmount</button>
        {this.renderDiagram()}
      </div>
    )
  }
}

render(
  <Provider store={store}>
    <Wrapper />
  </Provider>,
  document.getElementById('app'),
)
