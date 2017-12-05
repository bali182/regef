import React from 'react'
import { DATA_ID, REGEF_TYPE } from './constants'
import id from './utils/id'
import bind from './utils/bind'

const node = (...Policies) => (Wrapped) => {
  class DecoratedNode extends React.Component {
    constructor() {
      super()
      this.policies = Policies.map((Policy) => new Policy())
      this.id = id()
      this.childRef = null
      this.domData = {
        [DATA_ID]: this.id,
      }
    }

    getUserComponent() {
      return this.childRef
    }

    @bind saveChildRef(ref) {
      this.childRef = ref
      this.policies.forEach((policy) => policy.setComponent(ref))
    }

    componentDidMount() {
      this.context.registry.register(this.id, this)
    }

    componentWillUnmount() {
      this.context.registry.unregister(this.id, this)
      this.policies.forEach((policy) => policy.setComponent(null))
    }

    getEditPolicies() {
      return this.policies
    }

    getCommand(request) {
      return this.policies.map((policy) => policy.getCommand(request))
    }

    requestFeedback(request) {
      const policies = this.policies
      for (let i = 0, len = policies.length; i < len; i += 1) {
        const policy = policies[i]
        policy.requestFeedback(request)
      }
    }

    eraseFeedback(request) {
      const policies = this.policies
      for (let i = 0, len = policies.length; i < len; i += 1) {
        const policy = policies[i]
        policy.eraseFeedback(request)
      }
    }

    render() {
      const { children, ...rest } = this.props
      return (<Wrapped {...rest} ref={this.saveChildRef} regef={this.domData}>
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
