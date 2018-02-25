import EditPolicy from './EditPolicy'

import { ADD_CHILDREN, MOVE_CHILDREN, START_CONNECTION, END_CONNECTION, SELECT, DELETE } from './constants'

export default class DispatchingEditPolicy extends EditPolicy {
  perform(request) {
    switch (request.type) {
      case ADD_CHILDREN: return this.addChildren(request)
      case MOVE_CHILDREN: return this.moveChildren(request)
      case START_CONNECTION: return this.startConnection(request)
      case END_CONNECTION: return this.endConnection(request)
      case SELECT: return this.select(request)
      case DELETE: return this.delete(request)
      default: throw new Error(`Unknown request type ${request.type}`)
    }
  }

  requestFeedback(request) {
    switch (request.type) {
      case ADD_CHILDREN: return this.requestAddChildrenFeedback(request)
      case MOVE_CHILDREN: return this.requestMoveChildrenFeedback(request)
      case START_CONNECTION: return this.requestStartConnectionFeedback(request)
      case END_CONNECTION: return this.requestEndConnectionFeedback(request)
      case SELECT: return this.requestSelectFeedback(request)
      default: throw new Error(`Unknown request type ${request.type}`)
    }
  }

  eraseFeedback(request) {
    switch (request.type) {
      case ADD_CHILDREN: return this.eraseAddChildrenFeedback(request)
      case MOVE_CHILDREN: return this.eraseMoveChildrenFeedback(request)
      case START_CONNECTION: return this.eraseStartConnectionFeedback(request)
      case END_CONNECTION: return this.eraseEndConnectionFeedback(request)
      case SELECT: return this.eraseSelectFeedback(request)
      default: throw new Error(`Unknown request type ${request.type}`)
    }
  }

  addChildren(/* request */) { }
  moveChildren(/* request */) { }
  startConnection(/* request */) { }
  endConnection(/* request */) { }
  select(/* request */) { }
  delete(/* request */) { }

  requestAddChildrenFeedback(/* request */) { }
  requestMoveChildrenFeedback(/* request */) { }
  requestStartConnectionFeedback(/* request */) { }
  requestEndConnectionFeedback(/* request */) { }
  requestSelectFeedback(/* request */) { }

  eraseAddChildrenFeedback(/* request */) { }
  eraseMoveChildrenFeedback(/* request */) { }
  eraseStartConnectionFeedback(/* request */) { }
  eraseEndConnectionFeedback(/* request */) { }
  eraseSelectFeedback(/* request */) { }
}
