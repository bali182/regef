import React from 'react'
import { component, RegefComponentProps } from '../src/index'

export const TEST_PART_ID = 'PART'

export const TEST_CONTAINER_TYPE = 'CONTAINER'
export const TEST_NODE_TYPE = 'NODE'
export const TEST_ROOT_TYPE = 'ROOT'

interface IdProps extends RegefComponentProps {
  id: string
}

export class _TestRoot extends React.Component<IdProps> {
  render() {
    const { id, children } = this.props
    return (
      <div data-tag={TEST_ROOT_TYPE} id={id}>
        {children}
      </div>
    )
  }
}

export class _TestContainer extends React.Component<IdProps> {
  render() {
    const { id, children } = this.props
    return (
      <div id={id} data-tag={TEST_CONTAINER_TYPE}>
        {children}
      </div>
    )
  }
}

export class _TestNode extends React.Component<IdProps> {
  render() {
    const { id } = this.props
    return (
      <div id={id} data-tag={TEST_NODE_TYPE}>
        {id}
      </div>
    )
  }
}

export const TestContainer = component<IdProps>(TEST_CONTAINER_TYPE)(_TestContainer)
export const TestNode = component<IdProps>(TEST_CONTAINER_TYPE)(_TestNode)
export const TestRoot = component<IdProps>(TEST_ROOT_TYPE)(_TestRoot)
