import EditPolicy from './EditPolicy'

import { ADD_CHILD, MOVE_CHILD, START_CONNECTION, END_CONNECTION } from './constants'

class DispatchingEditPolicy extends EditPolicy {
  getCommand(request) {
    switch (request.type) {
      case ADD_CHILD: return this.addChild(request)
      case MOVE_CHILD: return this.moveChild(request)
      case START_CONNECTION: return this.startConnection(request)
      case END_CONNECTION: return this.endConnection(request)
      default: throw new Error(`Unknown request type ${request.type}`)
    }
  }

  requestFeedback(request) {
    switch (request.type) {
      case ADD_CHILD: return this.requestAddChildFeedback(request)
      case MOVE_CHILD: return this.requestMoveChildFeedback(request)
      case START_CONNECTION: return this.requestStartConnectionFeedback(request)
      case END_CONNECTION: return this.requestEndConnectionFeedback(request)
      default: throw new Error(`Unknown request type ${request.type}`)
    }
  }

  eraseFeedback(request) {
    switch (request.type) {
      case ADD_CHILD: return this.eraseAddChildFeedback(request)
      case MOVE_CHILD: return this.eraseMoveChildFeedback(request)
      case START_CONNECTION: return this.eraseStartConnectionFeedback(request)
      case END_CONNECTION: return this.eraseEndConnectionFeedback(request)
      default: throw new Error(`Unknown request type ${request.type}`)
    }
  }

  addChild(/* request */) { }
  moveChild(/* request */) { }
  startConnection(/* request */) { }
  endConnection(/* request */) { }

  requestAddChildFeedback(/* request */) { }
  requestMoveChildFeedback(/* request */) { }
  requestStartConnectionFeedback(/* request */) { }
  requestEndConnectionFeedback(/* request */) { }

  eraseAddChildFeedback(/* request */) { }
  eraseMoveChildFeedback(/* request */) { }
  eraseStartConnectionFeedback(/* request */) { }
  eraseEndConnectionFeedback(/* request */) { }
}

export default DispatchingEditPolicy
