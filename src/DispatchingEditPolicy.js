import EditPolicy from './EditPolicy'

import { ADD_CHILD, MOVE_CHILD, START_CONNECTION, END_CONNECTION, SELECT } from './constants'

export default class DispatchingEditPolicy extends EditPolicy {
  getCommand(request) {
    switch (request.type) {
      case ADD_CHILD: return this.addChild(request)
      case MOVE_CHILD: return this.moveChild(request)
      case START_CONNECTION: return this.startConnection(request)
      case END_CONNECTION: return this.endConnection(request)
      case SELECT: return this.select(request)
      default: throw new Error(`Unknown request type ${request.type}`)
    }
  }

  requestFeedback(request) {
    switch (request.type) {
      case ADD_CHILD: return this.requestAddChildFeedback(request)
      case MOVE_CHILD: return this.requestMoveChildFeedback(request)
      case START_CONNECTION: return this.requestStartConnectionFeedback(request)
      case END_CONNECTION: return this.requestEndConnectionFeedback(request)
      case SELECT: return this.requestSelectFeedback(request)
      default: throw new Error(`Unknown request type ${request.type}`)
    }
  }

  eraseFeedback(request) {
    switch (request.type) {
      case ADD_CHILD: return this.eraseAddChildFeedback(request)
      case MOVE_CHILD: return this.eraseMoveChildFeedback(request)
      case START_CONNECTION: return this.eraseStartConnectionFeedback(request)
      case END_CONNECTION: return this.eraseEndConnectionFeedback(request)
      case SELECT: return this.eraseSelectFeedback(request)
      default: throw new Error(`Unknown request type ${request.type}`)
    }
  }

  addChild(/* request */) { }
  moveChild(/* request */) { }
  startConnection(/* request */) { }
  endConnection(/* request */) { }
  select(/* request */) { }

  requestAddChildFeedback(/* request */) { }
  requestMoveChildFeedback(/* request */) { }
  requestStartConnectionFeedback(/* request */) { }
  requestEndConnectionFeedback(/* request */) { }
  requestSelectFeedback(/* request */) { }

  eraseAddChildFeedback(/* request */) { }
  eraseMoveChildFeedback(/* request */) { }
  eraseStartConnectionFeedback(/* request */) { }
  eraseEndConnectionFeedback(/* request */) { }
  eraseSelectFeedback(/* request */) { }
}
