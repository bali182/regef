import { createStore, combineReducers } from 'redux'
import components from './componentsReducer'
import selection from './selectionReducer'
import initialState from './initialState.json'
import { ApplicationState } from '../types'

const reducer = combineReducers<ApplicationState>({
  components,
  selection,
})

export default () => createStore(reducer, initialState as ApplicationState)
