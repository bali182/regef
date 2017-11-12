import React from 'react'
import { DATA_ID, REGEF_TYPE } from '../constants'
import id from './id'
import bind from '../utils/bind'

const node = (policy) => (Wrapped) => {
  class DecoratedNode extends React.Component {
    constructor() {
      super()
      this.__policy = policy
      this.__id = id()
      this.__ref = null
      this.__regef = {
        [DATA_ID]: this.__id,
      }
    }

    getUserComponent() {
      return this.__ref
    }

    @bind saveChildRef(ref) {
      this.__ref = ref
      policy.setComponent(ref)
    }

    componentDidMount() {
      this.context.registry.register(this.__id, this)
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
      return (<Wrapped {...rest} ref={this.saveChildRef} regef={this.__regef}>
        {children}
      </Wrapped>)
    }
  }

  DecoratedNode[REGEF_TYPE] = true

  DecoratedNode.contextTypes = {
    registry: () => null,
  }

  return DecoratedNode
}

export default node
