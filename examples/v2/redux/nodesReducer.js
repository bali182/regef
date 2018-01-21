import { ADD_CHILD, SET_POSITION, DELETE_NODE, ADD_CONNECTION } from './actions'
import initialState from './initialState'

const withAllNestedChildren = (state, id, children = []) => {
  children.push(id)
  const node = state[id]
  if (node.children.length === 0) {
    return children
  }
  node.children.forEach((child) => withAllNestedChildren(state, child, children))
  return children
}

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
    case ADD_CONNECTION: {
      const { source, target } = payload
      const node = state[source]
      return {
        ...state,
        [source]: {
          ...node,
          connections: node.connections.indexOf(target) >= 0
            ? node.connections
            : node.connections.concat([target]),
        },
      }
    }
    case DELETE_NODE: {
      const { id } = payload
      const affected = withAllNestedChildren(state, id)
      return Object.keys(state)
        .filter((key) => affected.indexOf(key) < 0)
        .reduce((newState, key) => {
          const node = state[key]
          return Object.assign(newState, {
            [key]: {
              ...node,
              children: node.children.filter((c) => affected.indexOf(c) < 0),
              connections: node.connections.filter((t) => affected.indexOf(t) < 0),
            },
          })
        }, {})
    }
    default:
      return state
  }
}

export default nodesReducer
