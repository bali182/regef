import React from 'react'
import { connect } from 'react-redux'
import RootView from './RootView'
import { root } from '../../../src/index'
import { setPosition, setSelection } from '../redux/actions'

import Container from '../Container'
import Node from '../Node'
import RootEditPolicy from './RootEditPolicy'
import { DragFeedback, SelectionFeedback } from './RectFeedback'

const stateToProps = ({ components, selection }) => ({
  components,
  selection,
})

const boundActions = { setPosition, setSelection }

@connect(stateToProps, boundActions)
@root(RootEditPolicy)
export default class Root extends React.Component {
  constructor() {
    super()
    this.state = {
      moveFeedback: null,
      selectionFeedback: null,
    }
  }
  renderChildren() {
    const { components } = this.props
    const { root: rootComponent } = this.props.components
    return rootComponent.children.map((id) => {
      const component = components[id]
      switch (component.type) {
        case 'NODE':
          return <Node id={id} key={id} />
        case 'CONTAINER':
          return <Container id={id} key={id} />
        default:
          throw new TypeError(`Root's children must be either CONTAINER or NODE, ${component.type} given.`)
      }
    })
  }
  renderMoveFeedback() {
    if (this.state.moveFeedback) {
      return this.state.moveFeedback.map(({ x, y, width, height }, key) => (<DragFeedback
        // eslint-disable-next-line react/no-array-index-key
        key={key}
        x={x}
        y={y}
        width={width}
        height={height}
      />))
    }
    return null
  }
  renderSelectionFeedback() {
    if (this.state.selectionFeedback) {
      const { x, y, width, height } = this.state.selectionFeedback
      return <SelectionFeedback x={x} y={y} width={width} height={height} />
    }
    return null
  }
  render() {
    return (<RootView>
      {this.renderChildren()}
      {this.renderMoveFeedback()}
      {this.renderSelectionFeedback()}
    </RootView>)
  }
}
