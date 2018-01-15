import { createStore, combineReducers } from 'redux'
import nodes from './nodesReducer'
import connections from './connectionsReducer'
import selection from './selectionReducer'

const reducer = combineReducers({
  nodes,
  connections,
  selection,
})

export default createStore(reducer)
