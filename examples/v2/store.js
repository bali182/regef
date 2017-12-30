import { createStore, combineReducers } from 'redux'
import nodes from './nodesReducer'
import connections from './connectionsReducer'

const reducer = combineReducers({
  nodes,
  connections,
})

export default createStore(reducer)
