import React from 'react'
import { connect } from 'react-redux'

import ContainerView from './ContainerView'
import Step from '../Step'

const stateToProps = ({ components }, { id }) => ({
  container: components[id],
  components,
})

@connect(stateToProps)
export default class Container extends React.Component {
  renderChildren() {
    const { components, container: { children } } = this.props
    return children.map((id) => {
      const component = components[id]
      switch (component.type) {
        case 'STEP':
          return <Step id={id} key={id} />
        default:
          throw new TypeError(`Expected child STEP got ${component.type} instead`)
      }
    })
  }

  render() {
    const { id } = this.props
    const { x, y } = this.props.container
    return (<ContainerView x={x} y={y} id={id}>
      {this.renderChildren()}
    </ContainerView>)
  }
}
