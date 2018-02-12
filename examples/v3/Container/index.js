import React from 'react'
import { connect } from 'react-redux'

import ContainerView from './ContainerView'
import Step from '../Step'
import { node } from '../../../src/index'
import ContainerEditPolicy from './ContainerEditPolicy'
import { setChildren } from '../redux/actions'
import LineFeedback from './LineFeedback'

const stateToProps = ({ components, selection }, { id }) => ({
  container: components[id],
  selected: selection.indexOf(id) >= 0,
  components,
})

@connect(stateToProps, { setChildren })
@node(ContainerEditPolicy)
export default class Container extends React.Component {
  constructor() {
    super()
    this.state = {
      insertionFeedback: null,
    }
  }

  renderChildren() {
    const { components, container: { children } } = this.props
    const childEls = []
    if (this.state.insertionFeedback === 0) {
      childEls.push(<LineFeedback first key="feedback" />)
    }
    for (let i = 0; i < children.length; i += 1) {
      if (this.state.insertionFeedback === i && i > 0) {
        childEls.push(<LineFeedback key="feedback" />)
      }
      const id = children[i]
      const component = components[id]
      switch (component.type) {
        case 'STEP': {
          childEls.push(<Step id={id} key={id} />)
          break
        }
        default:
          throw new TypeError(`Expected child STEP got ${component.type} instead`)
      }
    }
    if (this.state.insertionFeedback === children.length) {
      childEls.push(<LineFeedback last key="feedback" />)
    }
    return childEls
  }

  render() {
    const { id, selected } = this.props
    const { x, y } = this.props.container
    return (<ContainerView x={x} y={y} id={id} selected={selected}>
      {this.renderChildren()}
    </ContainerView>)
  }
}
