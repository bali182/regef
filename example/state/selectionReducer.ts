import { SET_SELECTION } from './actions'

const connectionsReducer = (state = [], { type, payload }) => {
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
