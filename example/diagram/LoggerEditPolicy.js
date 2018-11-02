import { EditPolicy } from '../../index'

export default class LoggerEditPolicy extends EditPolicy {
  requestFeedback(intent) {
    // eslint-disable-next-line no-console
    console.log('requestFeedback', intent)
  }
  eraseFeedback(intent) {
    // eslint-disable-next-line no-console
    console.log('eraseFeedback', intent)
  }
  perform(intent) {
    // eslint-disable-next-line no-console
    console.log('preform', intent)
  }
}
