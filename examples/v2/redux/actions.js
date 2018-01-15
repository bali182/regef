export const SET_POSITION = 'SET_POSITION'
export const SET_SELECTION = 'SET_SELECTION'
export const ADD_CHILD = 'ADD_CHILD'
export const ADD_CONNECTION = 'ADD_CONNECTION'

export const setPosition = ({ id, x, y }) => ({
  type: SET_POSITION,
  payload: {
    id,
    x,
    y,
  },
})

export const addChild = ({ id, childId }) => ({
  type: ADD_CHILD,
  payload: {
    id,
    childId,
  },
})

export const addConnection = ({ source, target }) => ({
  type: ADD_CONNECTION,
  payload: {
    source,
    target,
  },
})

export const setSelection = ({ selection }) => ({
  type: SET_SELECTION,
  payload: {
    selection,
  },
})
