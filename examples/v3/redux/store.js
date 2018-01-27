import { createStore, combineReducers } from 'redux'
import components from './nodesReducer'
import selection from './selectionReducer'

const reducer = combineReducers({
  components,
  selection,
})

export default createStore(reducer)
