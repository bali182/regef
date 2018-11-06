import { EditPolicy } from './EditPolicy'

import {
  AddIntent,
  MoveIntent,
  StartConnectionIntent,
  EndConnectionIntent,
  SelectionIntent,
  DeleteIntent,
  IntentType,
  RecognizedIntent,
} from './typings'

export class DispatchingEditPolicy extends EditPolicy {
  perform(intent: RecognizedIntent): void {
    const { type } = intent
    switch (intent.type) {
      case IntentType.ADD:
        return this.add(intent)
      case IntentType.MOVE:
        return this.move(intent)
      case IntentType.START_CONNECTION:
        return this.startConnection(intent)
      case IntentType.END_CONNECTION:
        return this.endConnection(intent)
      case IntentType.SELECT:
        return this.select(intent)
      case IntentType.DELETE:
        return this.delete(intent)
      default:
        throw new Error(`Unknown intent type ${type}`)
    }
  }

  requestFeedback(intent: RecognizedIntent): void {
    switch (intent.type) {
      case IntentType.ADD:
        return this.requestAddFeedback(intent)
      case IntentType.MOVE:
        return this.requestMoveFeedback(intent)
      case IntentType.START_CONNECTION:
        return this.requestStartConnectionFeedback(intent)
      case IntentType.END_CONNECTION:
        return this.requestEndConnectionFeedback(intent)
      case IntentType.SELECT:
        return this.requestSelectFeedback(intent)
      default:
        throw new Error(`Unknown intent type ${intent.type}`)
    }
  }

  eraseFeedback(intent: RecognizedIntent): void {
    switch (intent.type) {
      case IntentType.ADD:
        return this.eraseAddFeedback(intent)
      case IntentType.MOVE:
        return this.eraseMoveFeedback(intent)
      case IntentType.START_CONNECTION:
        return this.eraseStartConnectionFeedback(intent)
      case IntentType.END_CONNECTION:
        return this.eraseEndConnectionFeedback(intent)
      case IntentType.SELECT:
        return this.eraseSelectFeedback(intent)
      default:
        throw new Error(`Unknown intent type ${intent.type}`)
    }
  }

  add(intent: AddIntent): void {}
  move(intent: MoveIntent): void {}
  startConnection(intent: StartConnectionIntent): void {}
  endConnection(intent: EndConnectionIntent): void {}
  select(intent: SelectionIntent): void {}
  delete(intent: DeleteIntent): void {}

  requestAddFeedback(intent: AddIntent) {}
  requestMoveFeedback(intent: MoveIntent) {}
  requestStartConnectionFeedback(intent: StartConnectionIntent) {}
  requestEndConnectionFeedback(intent: EndConnectionIntent) {}
  requestSelectFeedback(intent: SelectionIntent) {}

  eraseAddFeedback(intent: AddIntent) {}
  eraseMoveFeedback(intent: MoveIntent) {}
  eraseStartConnectionFeedback(intent: StartConnectionIntent) {}
  eraseEndConnectionFeedback(intent: EndConnectionIntent) {}
  eraseSelectFeedback(intent: SelectionIntent) {}
}
