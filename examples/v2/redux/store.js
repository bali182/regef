import { createStore, combineReducers } from 'redux'
import nodes from './nodesReducer'
import selection from './selectionReducer'

const reducer = combineReducers({
  nodes,
  selection,
})

export default createStore(reducer)
