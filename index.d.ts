import { Component, ReactNode } from 'react'
import { Rectangle, Point } from 'regef-geometry'

type ReactComponent = Component

declare export const SELECT
declare export const DELETE
declare export const MOVE_CHILDREN
declare export const ADD_CHILDREN
declare export const START_CONNECTION
declare export const END_CONNECTION

export type IntentType = 'select' | 'delete' | 'move-children' | 'add-children' | 'start-connection' | 'end-connection'

export interface Intent {
  type: IntentType
}

export interface SelectionIntent extends Intent {
  type: 'select'
  bounds: Rectangle
  startLocation: Point
  endLocation: Point
  selection: ReactComponent[]
}

export interface MoveChildrenIntent extends Intent {
  type: 'move-child'
  components: ReactComponent[]
  container: ReactComponent
  location: Point
  offset: Point
  delta: Point
}

export interface DeleteIntent extends Intent {
  type: 'delete'
  selection: ReactComponent[]
}


export interface AddChildrenIntent extends Intent {
  type: 'add-child',
  components: ReactComponent[]
  targetContainer: ReactComponent
  container: ReactComponent
  location: Point
  offset: Point
  delta: Point
}

export interface StartConnectionIntent extends Intent {
  type: 'start-connection'
  source: ReactComponent
  location: Point
}

export interface EndConnectionIntent extends Intent {
  type: 'end-connection'
  source: ReactComponent
  target: ReactComponent
  location: Point
}

export class EditPolicy {
  host: ReactComponent
  toolkit: Toolkit

  perform(intent: Intent): void
  requestFeedback(intent: Intent): void
  eraseFeedback(intent): void
}

export class DispatchingEditPolicy extends EditPolicy {
  addChild(intent: AddChildrenIntent): void
  moveChild(intent: MoveChildrenIntent): void
  startConnection(intent: StartConnectionIntent): void
  endConnection(intent: EndConnectionIntent): void
  select(intent: SelectionIntent): void
  delete(intent: DeleteIntent): void

  requestAddChildFeedback(intent: AddChildrenIntent): void
  requestMoveChildFeedback(intent: MoveChildrenIntent): void
  requestStartConnectionFeedback(intent: StartConnectionIntent): void
  requestEndConnectionFeedback(intent: EndConnectionIntent): void
  requestSelectFeedback(intent: SelectionIntent): void

  eraseAddChildFeedback(intent: AddChildrenIntent): void
  eraseMoveChildFeedback(intent: MoveChildrenIntent): void
  eraseStartConnectionFeedback(intent: StartConnectionIntent): void
  eraseEndConnectionFeedback(intent: EndConnectionIntent): void
  eraseSelectFeedback(intent: SelectionIntent): void
}

export class Toolkit {
  root(): ReactComponent
  parent(component: ReactComponent): ReactComponent?
  children(component: ReactComponent): ReactComponent[]
  editPolicy(component): EditPolicy?
  ofType(type: string): ReactComponent[]
  nodes(): ReactComponent[]
  ports(): ReactComponent[]
  connections(): ReactComponent[]
  bounds(component): Rectangle
}

export class SelectionProvider {
  new()
  setToolkit(toolkit): Toolkit
  selection(): ReactComponent[]
}

export interface EngineParams {
  mouseHandlers: MouseHandler[]
  keyHandlers: KeyHandler[]
  selectionProvider: SelectionProvider
}

export class Engine {
  new(params: EngineParams)
}

interface DiagramProps {
  engine: Engine
}

export class Diagram extends ReactComponent<DiagramProps, any> { /* empty */ }

export function node(...policies: EditPolicy): (ReactConstructor: Function) => any
export function port(...policies: EditPolicy): (ReactConstructor: Function) => any
export function root(...policies: EditPolicy): (ReactConstructor: Function) => any
export function connection(...policies: EditPolicy): (ReactConstructor: Function) => any

class ComponentWrapper {
  new(dom: Node, component: ReactComponent, userComponent: ReactComponent)
  get dom(): Node
  get component(): ReactComponent
  get userComponent(): ReactComponent
}

interface ComponentRegistry {
  setRoot(root): void
  register(wrapper: ComponentWrapper): void
  unregister(input: Node | ReactComponent): void
  get(input: Node | ReactComponent): void
  all(): ComponentWrapper[]
  has(input: Node | ReactComponent): boolean
  addRegisterListener(listener: Function): void
  addUnregisterListener(listener: Function): void
  removeRegisterListener(listener: Function): void
  removeUnregisterListener(listener: Function): void
}


interface MouseHandler {
  setEngine(engine: Engine): void
  setComponentRegistry(registry: ComponentRegistry): void
  cancel(): void
  onMouseDown(e: Event): void
  onMouseMove(e: Event): void
  onMouseUp(e: Event): void
}

interface KeyHandler {
  setEngine(engine: Engine): void
  setComponentRegistry(registry: ComponentRegistry): void
  cancel(): void
  onKeyDown(e: Event)
  onKeyUp(e: Event)
}

export class DragMouseHandler extends MouseHandler { /* implementation not relevant */ }
export class ConnectMouseHandler extends MouseHandler { /* implementation not relevant */ }
export class SingleSelectionMouseHandler extends MouseHandler { /* implementation not relevant */ }
export class MultiSelectionMouseHandler extends MouseHandler { /* implementation not relevant */ }

export class CancelMouseHandlersKeyHandler extends KeyHandler { /* implementation not relevant */ }
export class DeleteKeyHandler extends KeyHandler { /* implementation not relevant */ }