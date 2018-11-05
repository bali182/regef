import React from 'react'
import { connect } from 'react-redux'
import { component, RegefComponentProps } from '../../../src/index'

import ContainerView from './ContainerView'
import { Port } from '../Port'
import { Step } from '../Step'
import LineFeedback from './LineFeedback'
import { NODE } from '../../diagram/constants'
import { ApplicationState, ComponentsState } from '../../types'
import { ComponentClass } from 'react'

type ReduxProps = {
  components: ComponentsState
  container: any
  selected: boolean
}

type OwnProps = {
  id: string
}

type ContainerProps = ReduxProps & OwnProps & RegefComponentProps

type ContainerState = {
  insertionFeedback: any
  portVisible: boolean
}

export class _Container extends React.Component<ContainerProps, ContainerState> {
  constructor(props: ContainerProps) {
    super(props)
    this.state = {
      insertionFeedback: null,
      portVisible: false,
    }
    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
  }

  onMouseEnter() {
    this.setState({ portVisible: true })
  }

  onMouseLeave() {
    this.setState({ portVisible: false })
  }

  renderChildren() {
    const {
      components,
      container: { children },
    } = this.props
    const { insertionFeedback } = this.state
    const childComponents = children.map((id) => {
      const { type } = components[id]
      switch (type) {
        case 'STEP': {
          return <Step id={id} key={id} />
        }
        default:
          throw new TypeError(`Expected child STEP got "${type}" instead`)
      }
    })
    if (insertionFeedback !== null) {
      return [
        ...childComponents.slice(0, insertionFeedback),
        <LineFeedback key="feedback" />,
        ...childComponents.slice(insertionFeedback),
      ]
    }
    return childComponents
  }

  render() {
    const {
      id,
      selected,
      container: { x, y },
    } = this.props
    return (
      <ContainerView
        x={x}
        y={y}
        id={id}
        selected={selected}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        {this.renderChildren()}
        <Port visible={this.state.portVisible} />
      </ContainerView>
    )
  }
}

function stateToProps({ components, selection }: ApplicationState, { id }: OwnProps): ReduxProps {
  return {
    container: components[id],
    selected: selection.indexOf(id) >= 0,
    components,
  }
}

export const ContainerWithRegef = component<ContainerProps>(NODE)(_Container)
export const Container = connect<ReduxProps, {}, OwnProps>(stateToProps)(
  ContainerWithRegef,
) as ComponentClass<OwnProps>
