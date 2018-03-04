import EditPolicy from './EditPolicy'

import { ADD, MOVE, START_CONNECTION, END_CONNECTION, SELECT, DELETE, CREATE } from './constants'

export default class DispatchingEditPolicy extends EditPolicy {
  perform(request) {
    switch (request.type) {
      case ADD: return this.add(request)
      case MOVE: return this.move(request)
      case START_CONNECTION: return this.startConnection(request)
      case END_CONNECTION: return this.endConnection(request)
      case SELECT: return this.select(request)
      case DELETE: return this.delete(request)
      case CREATE: return this.create(request)
      default: throw new Error(`Unknown request type ${request.type}`)
    }
  }

  requestFeedback(request) {
    switch (request.type) {
      case ADD: return this.requestAddFeedback(request)
      case MOVE: return this.requestMoveFeedback(request)
      case START_CONNECTION: return this.requestStartConnectionFeedback(request)
      case END_CONNECTION: return this.requestEndConnectionFeedback(request)
      case SELECT: return this.requestSelectFeedback(request)
      case CREATE: return this.requestCreateFeedback(request)
      default: throw new Error(`Unknown request type ${request.type}`)
    }
  }

  eraseFeedback(request) {
    switch (request.type) {
      case ADD: return this.eraseAddFeedback(request)
      case MOVE: return this.eraseMoveFeedback(request)
      case START_CONNECTION: return this.eraseStartConnectionFeedback(request)
      case END_CONNECTION: return this.eraseEndConnectionFeedback(request)
      case SELECT: return this.eraseSelectFeedback(request)
      case CREATE: return this.eraseCreateFeedback(request)
      default: throw new Error(`Unknown request type ${request.type}`)
    }
  }

  add(/* request */) { }
  move(/* request */) { }
  startConnection(/* request */) { }
  endConnection(/* request */) { }
  select(/* request */) { }
  delete(/* request */) { }
  create(/* request */) { }

  requestAddFeedback(/* request */) { }
  requestMoveFeedback(/* request */) { }
  requestStartConnectionFeedback(/* request */) { }
  requestEndConnectionFeedback(/* request */) { }
  requestSelectFeedback(/* request */) { }
  requestCreateFeedback(/* request */) { }

  eraseAddFeedback(/* request */) { }
  eraseMoveFeedback(/* request */) { }
  eraseStartConnectionFeedback(/* request */) { }
  eraseEndConnectionFeedback(/* request */) { }
  eraseSelectFeedback(/* request */) { }
  eraseCreateFeedback(/* request */) { }
}
