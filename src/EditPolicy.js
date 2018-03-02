export default class EditPolicy {
  constructor() {
    this.toolkit = null
    this.dependencies = {}
  }
  perform(/* intent */) { }
  requestFeedback(/* intent */) { }
  eraseFeedback(/* intent */) { }
}

export const perform = (policies, intent) => policies
  .forEach((policy) => policy.perform(intent))

export const requestFeedback = (policies, intent) => policies
  .forEach((policy) => policy.requestFeedback(intent))

export const eraseFeedback = (policies, intent) => policies
  .forEach((policy) => policy.eraseFeedback(intent))
