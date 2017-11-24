export const SET_POSITION = 'SET_POSITION'
export const ADD_CHILD = 'ADD_CHILD'

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
