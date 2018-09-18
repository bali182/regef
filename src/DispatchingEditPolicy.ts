import { EditPolicy } from './EditPolicy'

import { ADD, MOVE, START_CONNECTION, END_CONNECTION, SELECT, DELETE, Intent, AddIntent, MoveIntent, StartConnectionIntent, EndConnectionIntent, SelectionIntent, DeleteIntent } from './constants'

type RecognizedIntent = AddIntent | MoveIntent | StartConnectionIntent | EndConnectionIntent | SelectionIntent | DeleteIntent

export default class DispatchingEditPolicy extends EditPolicy {
  perform(intent: RecognizedIntent): void {
    const { type } = intent
    switch (intent.type) {
      case ADD: return this.add(intent)
      case MOVE: return this.move(intent)
      case START_CONNECTION: return this.startConnection(intent)
      case END_CONNECTION: return this.endConnection(intent)
      case SELECT: return this.select(intent)
      case DELETE: return this.delete(intent)
      default: throw new Error(`Unknown intent type ${type}`)
    }
  }

  intentFeedback(intent: RecognizedIntent): void {
    switch (intent.type) {
      case ADD: return this.intentAddFeedback(intent)
      case MOVE: return this.intentMoveFeedback(intent)
      case START_CONNECTION: return this.intentStartConnectionFeedback(intent)
      case END_CONNECTION: return this.intentEndConnectionFeedback(intent)
      case SELECT: return this.intentSelectFeedback(intent)
      default: throw new Error(`Unknown intent type ${intent.type}`)
    }
  }

  eraseFeedback(intent: RecognizedIntent): void {
    switch (intent.type) {
      case ADD: return this.eraseAddFeedback(intent)
      case MOVE: return this.eraseMoveFeedback(intent)
      case START_CONNECTION: return this.eraseStartConnectionFeedback(intent)
      case END_CONNECTION: return this.eraseEndConnectionFeedback(intent)
      case SELECT: return this.eraseSelectFeedback(intent)
      default: throw new Error(`Unknown intent type ${intent.type}`)
    }
  }

  add(intent: AddIntent): void { }
  move(intent: MoveIntent): void { }
  startConnection(intent: StartConnectionIntent): void { }
  endConnection(intent: EndConnectionIntent): void { }
  select(intent: SelectionIntent): void { }
  delete(intent: DeleteIntent): void { }

  intentAddFeedback(intent: AddIntent) { }
  intentMoveFeedback(intent: MoveIntent) { }
  intentStartConnectionFeedback(intent: StartConnectionIntent) { }
  intentEndConnectionFeedback(intent: EndConnectionIntent) { }
  intentSelectFeedback(intent: SelectionIntent) { }

  eraseAddFeedback(intent: AddIntent) { }
  eraseMoveFeedback(intent: MoveIntent) { }
  eraseStartConnectionFeedback(intent: StartConnectionIntent) { }
  eraseEndConnectionFeedback(intent: EndConnectionIntent) { }
  eraseSelectFeedback(intent: SelectionIntent) { }
}
