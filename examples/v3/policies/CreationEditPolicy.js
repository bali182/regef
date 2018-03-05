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
  add(intent) {
    console.log('add', intent)
  }
  requestAddFeedback(intent) {
    console.log('requestAddFeedback', intent)
  }
  eraseAddFeedback(intent) {
    console.log('eraseAddFeedback', intent)
  }
  move(intent) {
    console.log('move', intent)
  }
  requestMoveFeedback(intent) {
    console.log('requestMoveFeedback', intent)
  }
  eraseMoveFeedback(intent) {
    console.log('eraseMoveFeedback', intent)
  }
}
