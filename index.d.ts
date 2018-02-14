import { Component as ReactComponent, ReactNode } from 'react'

declare export const SELECT
declare export const DELETE
declare export const MOVE_CHILD
declare export const ADD_CHILD
declare export const START_CONNECTION
declare export const END_CONNECTION

export type IntentType = 'select' | 'delete' | 'move-child' | 'add-child' | 'start-connection' | 'end-connection'

export interface Intent {
  type: IntentType
}

export interface SelectionIntent extends Intent {
  type: 'select'
  bounds: any // TODO
  startLocation: any // TODO
  endLocation: any // TODO
  selection: ReactComponent<any, any>[]
}

export interface MoveChildIntent extends Intent {
  type: 'move-child'
  components: ReactComponent<any, any>[]
  container: ReactComponent<any, any>
  location: any // TODO
  offset: any // TODO
  delta: any // TODO
}

export interface DeleteIntent extends Intent {
  type: 'delete'
  selection: ReactComponent<any, any>[]
}


export interface AddChildIntent extends Intent {
  type: 'add-child',
  components: ReactComponent<any, any>[]
  targetContainer: ReactComponent<any, any>
  container: ReactComponent<any, any>
  location: any //TODO
  offset: any // TODO
  delta: any // TODO
}

export interface StartConnectionIntent extends Intent {
  type: 'start-connection'
  source: ReactComponent<any, any>
  location: any // TODO
}

export interface EndConnectionIntent extends Intent {
  type: 'end-connection'
  source: ReactComponent<any, any>
  target: ReactComponent<any, any>
  location: any // TODO
}

export class EditPolicy {
  component: ReactComponent<any, any>
  toolkit: Toolkit

  perform(intent: Intent): void
  requestFeedback(intent: Intent): void
  eraseFeedback(intent): void
}

export class DispatchingEditPolicy extends EditPolicy {
  addChild(intent: AddChildIntent): void
  moveChild(intent: MoveChildIntent): void
  startConnection(intent: StartConnectionIntent): void
  endConnection(intent: EndConnectionIntent): void
  select(intent: SelectionIntent): void
  delete(intent: DeleteIntent): void

  requestAddChildFeedback(intent: AddChildIntent): void
  requestMoveChildFeedback(intent: MoveChildIntent): void
  requestStartConnectionFeedback(intent: StartConnectionIntent): void
  requestEndConnectionFeedback(intent: EndConnectionIntent): void
  requestSelectFeedback(intent: SelectionIntent): void

  eraseAddChildFeedback(intent: AddChildIntent): void
  eraseMoveChildFeedback(intent: MoveChildIntent): void
  eraseStartConnectionFeedback(intent: StartConnectionIntent): void
  eraseEndConnectionFeedback(intent: EndConnectionIntent): void
  eraseSelectFeedback(intent: SelectionIntent): void
}

export class Toolkit {
  root(): ReactComponent<any, any>
  parent(component: ReactComponent<any, any>): ReactComponent<any, any>?
  children(component: ReactComponent<any, any>): ReactComponent<any, any>[]
  editPolicy(component): EditPolicy?
  ofType(type: string): ReactComponent<any, any>[]
  nodes(): ReactComponent<any, any>[]
  ports(): ReactComponent<any, any>[]
  connections(): ReactComponent<any, any>[]
  bounds(component): any // TODO
}

export class Engine {
  constructor()
}

export class Diagram extends ReactComponent<{ engine: Engine }, any> { /* empty */ }

export function node(...policies: EditPolicy): (ReactConstructor: Function) => any
export function port(...policies: EditPolicy): (ReactConstructor: Function) => any
export function root(...policies: EditPolicy): (ReactConstructor: Function) => any
export function connection(...policies: EditPolicy): (ReactConstructor: Function) => any
