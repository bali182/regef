import { ADD_CHILDREN, SET_POSITION, DELETE_COMPONENT, ADD_CONNECTION, SET_CHILDREN } from './actions'

const insert = (array, index, items) => [
  ...array.slice(0, index),
  ...items,
  ...array.slice(index),
]

const withAllNestedChildren = (state, id, children = []) => {
  children.push(id)
  const node = state[id]
  if (!Array.isArray(node.children)) {
    return children
  }
  if (node.children.length === 0) {
    return children
  }
  node.children.forEach((child) => withAllNestedChildren(state, child, children))
  return children
}

const componentsReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ADD_CHILDREN: {
      const { containerId, children, index } = payload
      return Object.keys(state).map((id) => {
        const node = state[id]
        if (id === containerId) {
          return [id, {
            ...node,
            children: insert(node.children, index, children),
          }]
        } else if (Array.isArray(node.children)) {
          return [id, {
            ...node,
            children: node.children.filter((cId) => children.indexOf(cId) < 0),
          }]
        }
        return [id, node]
      }).reduce((newState, [id, node]) => ({ ...newState, [id]: node }), {})
    }
    case SET_POSITION: {
      const { id, x, y } = payload
      const node = state[id]
      const newState = {
        ...state,
        [id]: { ...node, x, y },
      }
      return newState
    }
    case SET_CHILDREN: {
      const { id, children } = payload
      const node = state[id]
      const newState = {
        ...state,
        [id]: { ...node, children },
      }
      return newState
    }
    case ADD_CONNECTION: {
      const { source, target } = payload
      const node = state[source]
      const connections = node.connections ? node.connections : []
      return {
        ...state,
        [source]: {
          ...node,
          connections: connections.indexOf(target) >= 0
            ? connections
            : connections.concat([target]),
        },
      }
    }
    case DELETE_COMPONENT: {
      const { id } = payload
      const affected = withAllNestedChildren(state, id)
      return Object.keys(state)
        .filter((key) => affected.indexOf(key) < 0)
        .reduce((newState, key) => {
          const node = state[key]
          const newNode = { ...node }
          if (node.connections) {
            newNode.connections = node.connections.filter((t) => affected.indexOf(t) < 0)
          }
          if (node.children) {
            newNode.children = node.children.filter((c) => affected.indexOf(c) < 0)
          }
          return Object.assign(newState, { [key]: newNode })
        }, {})
    }
    default:
      return state
  }
}

export default componentsReducer
