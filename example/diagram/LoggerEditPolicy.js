import { EditPolicy } from '../../src/index'

export default class LoggerEditPolicy extends EditPolicy {
  requestFeedback(intent) {
    console.log('requestFeedback', intent)
  }
  eraseFeedback(intent) {
    console.log('eraseFeedback', intent)
  }
  perform(intent) {
    console.log('preform', intent)
  }
}
