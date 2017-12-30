import { ADD_CONNECTION } from './actions'
import initialState from './initialState'

const connectionsReducer = (state = initialState.connections, { type, payload }) => {
  switch (type) {
    case ADD_CONNECTION: {
      const { source, target } = payload
      return state.concat({ source, target })
    }
    default:
      return state
  }
}

export default connectionsReducer
