import {
  addChildren,
  addConnection,
  deleteComponent,
  setChildren,
  setPosition,
  setSelection,
} from './state/actions'
import { Component } from 'react'
import { Store } from 'react-redux'

export type NodeType = {
  type: 'NODE'
  x: number
  y: number
  connections: string[]
}

export type ContainerType = {
  type: 'CONTAINER'
  x: number
  y: number
  children: string[]
  connections: string[]
}

export type RootType = {
  type: 'ROOT'
  children: string[]
}

export type StepType = {
  type: 'STEP'
}

export type ComponentType = Partial<RootType & NodeType & StepType & ContainerType>

export type ComponentsState = {
  [id: string]: ComponentType
}

export type SelectionState = string[]

export type ApplicationState = {
  components: ComponentsState
  selection: SelectionState
}

export type ActionCreators = {
  addChildren: typeof addChildren
  addConnection: typeof addConnection
  deleteComponent: typeof deleteComponent
  setChildren: typeof setChildren
  setPosition: typeof setPosition
  setSelection: typeof setSelection
  store: Store<ApplicationState>
}

export type ReactCompWithId = Component<{ id: string }>
