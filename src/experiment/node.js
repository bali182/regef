import React from 'react'
import { DATA_ID } from '../constants'
import id from './id'
import bind from '../utils/bind'

const node = (policy) => (Wrapped) => {
  class DecoratedNode extends React.Component {
    constructor() {
      super()
      this.__policy = policy
      this.__id = id()
      this.__regef = {
        [DATA_ID]: this.__id,
      }
    }

    @bind saveChildRef(ref) {
      policy.setComponent(ref)
    }

    componentDidMount() {
      this.context.registry.register(this.__id, this)
      policy.setComponent(this)
    }

    componentWillUnmount() {
      this.context.registry.unregister(this.__id, this)
      policy.setComponent(null)
    }

    getEditPolicy() {
      return this.__policy
    }

    render() {
      const { children, ...rest } = this.props
      return (<Wrapped ref={this.saveChildRef} {...rest} regef={this.__regef}>
        {children}
      </Wrapped>)
    }
  }

  DecoratedNode.contextTypes = {
    registry: () => null,
  }

  return DecoratedNode
}

export default node
