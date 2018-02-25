import EditPolicy from './EditPolicy'

const TOOLKIT = Symbol('TOOLKIT')
const COMPONENT = Symbol('COMPONENT')

export default class CompositeEditPolicy extends EditPolicy {
  constructor(policies = []) {
    super()
    this.policies = policies
    this[TOOLKIT] = null
    this[COMPONENT] = null
  }

  get toolkit() {
    return this[TOOLKIT]
  }

  set toolkit(toolkit) {
    this._toolkit = toolkit
    if (this.policies === null || this.policies === undefined) {
      return
    }
    for (let i = 0, len = this.policies.length; i < len; i += 1) {
      const policy = this.policies[i]
      policy.toolkit = toolkit
    }
  }

  get host() {
    return this[COMPONENT]
  }

  set host(component) {
    this._component = component
    if (this.policies === null || this.policies === undefined) {
      return
    }
    for (let i = 0, len = this.policies.length; i < len; i += 1) {
      const policy = this.policies[i]
      policy.host = component
    }
  }

  perform(request) {
    for (let i = 0, len = this.policies.length; i < len; i += 1) {
      const policy = this.policies[i]
      policy.perform(request)
    }
  }

  requestFeedback(request) {
    for (let i = 0, len = this.policies.length; i < len; i += 1) {
      const policy = this.policies[i]
      policy.requestFeedback(request)
    }
  }

  eraseFeedback(request) {
    for (let i = 0, len = this.policies.length; i < len; i += 1) {
      const policy = this.policies[i]
      policy.eraseFeedback(request)
    }
  }
}

export const compose = (...Policies) => {
  class CustomizedCompositeEditPolicy extends CompositeEditPolicy {
    constructor() {
      super(Policies.map((Policy) => new Policy()))
    }
  }
  return CustomizedCompositeEditPolicy
}
