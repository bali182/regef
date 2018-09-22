import { IntentType } from './constants'

type Intent = {
  type: IntentType
}

export class EditPolicy {
  perform(intent: Intent): void {}
  requestFeedback(intent: Intent): void {}
  eraseFeedback(intent: Intent): void {}
}
