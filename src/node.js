import React from 'react'
import { DATA_ID, REGEF_TYPE } from './constants'
import id from './id'
import bind from './utils/bind'
import { compose } from './command'

const node = (...Policies) => (Wrapped) => {
  class DecoratedNode extends React.Component {
    constructor() {
      super()
      this.__policies = Policies.map((Policy) => new Policy())
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
      this.__policies.forEach((policy) => policy.setComponent(ref))
    }

    componentDidMount() {
      this.context.registry.register(this.__id, this)
    }

    componentWillUnmount() {
      this.context.registry.unregister(this.__id, this)
      this.__policies.forEach((policy) => policy.setComponent(null))
    }

    getEditPolicies() {
      return this.__policies
    }

    getCommand(request) {
      return compose(this.__policies.map((policy) => policy.getCommand(request)))
    }

    requestFeedback(request) {
      const policies = this.__policies
      for (let i = 0, len = policies.length; i < len; i += 1) {
        const policy = policies[i]
        policy.requestFeedback(request)
      }
    }

    eraseFeedback(request) {
      const policies = this.__policies
      for (let i = 0, len = policies.length; i < len; i += 1) {
        const policy = policies[i]
        policy.eraseFeedback(request)
      }
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
