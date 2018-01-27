import React from 'react'
import { connect } from 'react-redux'
import RootView from './RootView'

import Container from '../Container'
import Node from '../Node'

const stateToProps = ({ components }) => ({ components })

@connect(stateToProps)
export default class Root extends React.Component {
  renderChildren() {
    const { components } = this.props
    const { root } = this.props.components
    return root.children.map((id) => {
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
  render() {
    return (<RootView>
      {this.renderChildren()}
    </RootView>)
  }
}
