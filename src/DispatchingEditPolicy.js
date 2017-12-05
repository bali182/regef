import EditPolicy from './EditPolicy'

import { ADD_CHILD, MOVE_CHILD } from './constants'

class DispatchingEditPolicy extends EditPolicy {
  // eslint-disable-next-line consistent-return
  getCommand(request) {
    switch (request.type) {
      case ADD_CHILD: return this.addChild(request)
      case MOVE_CHILD: return this.moveChild(request)
      default:
    }
  }

  // eslint-disable-next-line consistent-return
  requestFeedback(request) {
    switch (request.type) {
      case ADD_CHILD: return this.requestAddChildFeedback(request)
      case MOVE_CHILD: return this.requestMoveChildFeedback(request)
      default:
    }
  }

  // eslint-disable-next-line consistent-return
  eraseFeedback(request) {
    switch (request.type) {
      case ADD_CHILD: return this.eraseAddChildFeedback(request)
      case MOVE_CHILD: return this.eraseMoveChildFeedback(request)
      default:
    }
  }

  addChild(/* request */) { }
  moveChild(/* request */) { }

  requestAddChildFeedback(/* request */) { }
  requestMoveChildFeedback(/* request */) { }

  eraseAddChildFeedback(/* request */) { }
  eraseMoveChildFeedback(/* request */) { }
}

export default DispatchingEditPolicy
