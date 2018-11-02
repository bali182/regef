import { EditPolicy } from './EditPolicy'

import {
  ADD,
  MOVE,
  START_CONNECTION,
  END_CONNECTION,
  SELECT,
  DELETE,
  AddIntent,
  MoveIntent,
  StartConnectionIntent,
  EndConnectionIntent,
  SelectionIntent,
  DeleteIntent,
} from './constants'

type RecognizedIntent =
  | AddIntent
  | MoveIntent
  | StartConnectionIntent
  | EndConnectionIntent
  | SelectionIntent
  | DeleteIntent

export class DispatchingEditPolicy extends EditPolicy {
  perform(intent: RecognizedIntent): void {
    const { type } = intent
    switch (intent.type) {
      case ADD:
        return this.add(intent)
      case MOVE:
        return this.move(intent)
      case START_CONNECTION:
        return this.startConnection(intent)
      case END_CONNECTION:
        return this.endConnection(intent)
      case SELECT:
        return this.select(intent)
      case DELETE:
        return this.delete(intent)
      default:
        throw new Error(`Unknown intent type ${type}`)
    }
  }

  requestFeedback(intent: RecognizedIntent): void {
    switch (intent.type) {
      case ADD:
        return this.requestAddFeedback(intent)
      case MOVE:
        return this.requestMoveFeedback(intent)
      case START_CONNECTION:
        return this.requestStartConnectionFeedback(intent)
      case END_CONNECTION:
        return this.requestEndConnectionFeedback(intent)
      case SELECT:
        return this.requestSelectFeedback(intent)
      default:
        throw new Error(`Unknown intent type ${intent.type}`)
    }
  }

  eraseFeedback(intent: RecognizedIntent): void {
    switch (intent.type) {
      case ADD:
        return this.eraseAddFeedback(intent)
      case MOVE:
        return this.eraseMoveFeedback(intent)
      case START_CONNECTION:
        return this.eraseStartConnectionFeedback(intent)
      case END_CONNECTION:
        return this.eraseEndConnectionFeedback(intent)
      case SELECT:
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
