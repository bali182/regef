import { DispatchingEditPolicy } from '../../../src/index'

export default class CreationEditPolicy extends DispatchingEditPolicy {
  create(intent) {
    console.log('create', intent)
  }
  requestCreateFeedback(intent) {
    console.log('requestCreateFeedback', intent)
  }
  eraseCreateFeedback(intent) {
    console.log('eraseCreateFeedback', intent)
  }
}
