import React from 'react'
import { connect } from 'react-redux'
import { component } from '../../../src/index'
import { DIAGRAM, NODE, ROOT } from '../../diagram/constants'

import RootView from './RootView'

import LinkView from '../Link/LinkView'
import Container from '../Container'
import Node from '../Node'
import { DragFeedback, SelectionFeedback, ErrorFeedback } from './RectFeedback'

const stateToProps = ({ components, selection }) => ({
  components,
  selection,
  root: components.root,
})

export class _Root extends React.Component {
  constructor() {
    super()
    this.state = {
      errorFeedback: null,
      moveFeedback: null,
      selectionFeedback: null,
      connectionFeedback: null,
      links: null,
    }
  }
  componentDidMount() {
    this.buildConnectionsRepresentation()
  }
  componentDidUpdate(prevProps) {
    if (!Object.is(prevProps, this.props)) {
      this.buildConnectionsRepresentation()
    }
  }
  buildConnectionsRepresentation() {
    this.props.regef
      .toolkit()
      .then((tkRoot) => {
        const toolkit = tkRoot.forPart(DIAGRAM)
        const containerOffset = toolkit
          .bounds(toolkit.root())
          .topLeft()
          .negated()
        const nodes = toolkit.ofType(NODE)
        const conns = Object.keys(this.props.components)
          .map((source) => {
            const node = this.props.components[source]
            return (node.connections || []).map((target) => ({ source, target }))
          })
          .reduce((all, connection) => all.concat(connection), [])
        const bounds = conns.map(({ source, target }) => {
          const sourceNode = nodes.find(({ props: { id } }) => id === source)
          const targetNode = nodes.find(({ props: { id } }) => id === target)
          if (sourceNode === undefined || targetNode === undefined) {
            throw new Error(`source or target undefined ${source} ${target}`)
          }
          return {
            source: toolkit.bounds(sourceNode).translate(containerOffset),
            target: toolkit.bounds(targetNode).translate(containerOffset),
            key: `${source}-${target}`,
          }
        })
        const links = bounds.map(({ source, target, key }) => {
          // TODO better arrow display
          const sourceCenter = source.center()
          const targetCenter = target.center()
          const centerToCenter = sourceCenter.lineSegmentTo(targetCenter)
          const sourceIntersection = [source.top(), source.right(), source.bottom(), source.left()]
            .map((segment) => segment.intersection(centerToCenter))
            .find((intersection) => intersection !== null)

          const targetIntersection = [target.top(), target.right(), target.bottom(), target.left()]
            .map((segment) => segment.intersection(centerToCenter))
            .find((intersection) => intersection !== null)

          if (!sourceIntersection || !targetIntersection) {
            return null
          }
          const { x1, y1, x2, y2 } = sourceIntersection.lineSegmentTo(targetIntersection)
          return { x1, y1, x2, y2, key }
        })
        this.setState({ links: links.filter((link) => link !== null) })
      })
      .catch((e) => {
        throw e
      })
  }
  renderChildren() {
    const { components, root: rootComponent } = this.props
    return rootComponent.children.map((id) => {
      const comp = components[id]
      switch (comp.type) {
        case 'NODE':
          return <Node id={id} key={id} />
        case 'CONTAINER':
          return <Container id={id} key={id} />
        default:
          throw new TypeError(
            `Root's children must be either CONTAINER or NODE, ${comp.type} given.`,
          )
      }
    })
  }
  renderErrorFeedback() {
    if (this.state.errorFeedback) {
      return this.state.errorFeedback.map(({ x, y, width, height }, key) => (
        <ErrorFeedback
          // eslint-disable-next-line react/no-array-index-key
          key={`${key}-err`}
          x={x}
          y={y}
          width={width}
          height={height}
        />
      ))
    }
    return null
  }
  renderMoveFeedback() {
    if (this.state.moveFeedback) {
      return this.state.moveFeedback.map(({ x, y, width, height }, key) => (
        <DragFeedback
          // eslint-disable-next-line react/no-array-index-key
          key={`${key}-move`}
          x={x}
          y={y}
          width={width}
          height={height}
        />
      ))
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
  renderConnectionFeedback() {
    if (this.state.connectionFeedback) {
      const { x1, y1, x2, y2 } = this.state.connectionFeedback
      return <LinkView x1={x1} y1={y1} x2={x2} y2={y2} />
    }
    return null
  }
  renderLinks() {
    if (this.state.links) {
      return this.state.links.map(({ x1, y1, x2, y2, key }) => (
        <LinkView x1={x1} y1={y1} x2={x2} y2={y2} key={key} />
      ))
    }
    return null
  }
  render() {
    return (
      <RootView>
        {this.renderChildren()}
        {this.renderMoveFeedback()}
        {this.renderErrorFeedback()}
        {this.renderSelectionFeedback()}
        {this.renderLinks()}
        {this.renderConnectionFeedback()}
      </RootView>
    )
  }
}

export const RootWithRegef = component(ROOT)(_Root)
export default connect(stateToProps)(RootWithRegef)
