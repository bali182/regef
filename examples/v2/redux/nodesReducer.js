import { ADD_CHILD, SET_POSITION } from './actions'
import initialState from './initialState'

const nodesReducer = (state = initialState.nodes, { type, payload }) => {
  switch (type) {
    case ADD_CHILD: {
      const { id, childId } = payload
      return Object.keys(state).map((itId) => {
        const node = state[itId]
        if (itId === id) {
          return [itId, { ...node, children: node.children.concat([childId]) }]
        } else if (node.children.indexOf(childId) >= 0) {
          return [itId, { ...node, children: node.children.filter((cId) => cId !== childId) }]
        }
        return [itId, node]
      }).reduce((newState, [itId, node]) => ({ ...newState, [itId]: node }), {})
    }
    case SET_POSITION: {
      const { id, x, y } = payload
      const node = state[id]
      return {
        ...state,
        [id]: { ...node, x, y },
      }
    }
    default:
      return state
  }
}

export default nodesReducer
