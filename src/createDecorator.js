import React from 'react'

import { DATA_ID } from './constants'
import bind from './bind'

const createDecorator = ({ type, activate, deactivate }) => (...Policies) => (Wrapped) => {
  class DecoratedComponent extends React.Component {
    constructor(props, context) {
      super(props, context)
      const { registry, idGenerator } = context.regef
      this.registry = registry
      this.policies = Policies.map((Policy) => new Policy())
      this.id = idGenerator.next()
      this.childRef = null
      this.type = type
      this.domData = {
        [DATA_ID]: this.id,
      }
    }

    getUserComponent() {
      return this.childRef
    }

    @bind saveChildRef(ref) {
      this.childRef = ref
    }

    componentDidMount() {
      activate(this)
    }

    componentWillUnmount() {
      deactivate(this)
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

  DecoratedComponent.contextTypes = {
    regef: () => null,
  }

  return DecoratedComponent
}

export default createDecorator
