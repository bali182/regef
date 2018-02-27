import EditPolicy from './EditPolicy'

const TOOLKIT = Symbol('TOOLKIT')

export default class CompositeEditPolicy extends EditPolicy {
  constructor(policies = []) {
    super()
    this.policies = policies
    this[TOOLKIT] = null
  }

  get toolkit() {
    return this[TOOLKIT]
  }

  set toolkit(toolkit) {
    this._toolkit = toolkit
    if (this.policies === null || this.policies === undefined) {
      return
    }
    this.policies.forEach((policy) => {
      // eslint-disable-next-line no-param-reassign
      policy.toolkit = toolkit
    })
  }

  perform(intent) {
    this.policies.forEach((policy) => policy.perform(intent))
  }

  requestFeedback(intent) {
    this.policies.forEach((policy) => policy.requestFeedback(intent))
  }

  eraseFeedback(intent) {
    this.policies.forEach((policy) => policy.eraseFeedback(intent))
  }
}

export const compose = (policies) => {
  if (policies === null || policies === undefined) {
    return new EditPolicy()
  } else if (policies instanceof EditPolicy) {
    return policies
  } else if (Array.isArray(policies)) {
    for (let i = 0, len = policies.length; i < len; i += 1) {
      const element = policies[i]
      if (!(element instanceof EditPolicy)) {
        throw new TypeError(`Expected policies[${i}] to be an EditPolicy, got ${policies[0]} instead.`)
      }
    }
    switch (policies.length) {
      case 0: return new EditPolicy()
      case 1: return policies[0]
      default: return new CompositeEditPolicy(policies)
    }
  } else {
    throw new TypeError(`Expected EditPolicy or Array<EditPolicy>, got ${policies} instead.`)
  }
}
