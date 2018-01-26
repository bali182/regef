import { SET_SELECTION } from './actions'
import initialState from './initialState'

const connectionsReducer = (state = initialState.selection, { type, payload }) => {
  switch (type) {
    case SET_SELECTION: {
      const { selection } = payload
      return selection
    }
    default:
      return state
  }
}

export default connectionsReducer
