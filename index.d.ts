import { Component, ReactNode } from 'react'
import { Rectangle, Point } from 'regef-geometry'

type ReactComponent = Component

declare export const SELECT
declare export const DELETE
declare export const MOVE_CHILDREN
declare export const ADD_CHILDREN
declare export const START_CONNECTION
declare export const END_CONNECTION

export type IntentType = 'select' | 'delete' | 'move' | 'add' | 'start-connection' | 'end-connection'

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

export interface MoveIntent extends Intent {
  type: 'move'
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


export interface AddIntent extends Intent {
  type: 'add',
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
  constructor()
  toolkit: Toolkit
  dependencies: { [key: string]: any }

  perform(intent: Intent): void
  requestFeedback(intent: Intent): void
  eraseFeedback(intent): void
}

export class DispatchingEditPolicy extends EditPolicy {
  add(intent: AddIntent): void
  move(intent: MoveIntent): void
  startConnection(intent: StartConnectionIntent): void
  endConnection(intent: EndConnectionIntent): void
  select(intent: SelectionIntent): void
  delete(intent: DeleteIntent): void

  requestAddFeedback(intent: AddIntent): void
  requestMoveFeedback(intent: MoveIntent): void
  requestStartConnectionFeedback(intent: StartConnectionIntent): void
  requestEndConnectionFeedback(intent: EndConnectionIntent): void
  requestSelectFeedback(intent: SelectionIntent): void

  eraseAddFeedback(intent: AddIntent): void
  eraseMoveFeedback(intent: MoveIntent): void
  eraseStartConnectionFeedback(intent: StartConnectionIntent): void
  eraseEndConnectionFeedback(intent: EndConnectionIntent): void
  eraseSelectFeedback(intent: SelectionIntent): void
}

export class Toolkit {
  constructor(registry: ComponentRegistry)

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
  toolkit: Toolkit
  dependencies: { [key: string]: any }

  constructor()

  selection(): ReactComponent[]
}

export interface EngineParams {
  selectionProvider: SelectionProvider
  capabilities: Capability[]
  editPolicies: EditPolicy[]
  dependencies: { [key: string]: any }
}

export class Engine {
  constructor(params: EngineParams)
  toolkit: Toolkit
  selectionProvider: SelectionProvider
  capabilities: Capability[]
  editPolicies: EditPolicy[]
  dependencies: { [key: string]: any }
}

interface DiagramProps {
  engine: Engine
}

export class Diagram extends ReactComponent<DiagramProps, any> { /* empty */ }

export function node(propMapper?: Function): (ReactConstructor: Function) => any
export function port(propMapper?: Function): (ReactConstructor: Function) => any
export function root(propMapper?: Function): (ReactConstructor: Function) => any
export function connection(propMapper?: Function): (ReactConstructor: Function) => any

class ComponentWrapper {
  new(dom: Node, component: ReactComponent, userComponent: ReactComponent)
  dom: Node
  component: ReactComponent
  userComponent: ReactComponent
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

class DomHelper {
  registry: ComponentRegistry

  constructor(registry: ComponentRegistry)

  findClosest(dom: Node, type: string): ComponentWrapper
  findRelevantChildren(element: Node): ComponentWrapper[]
  findClosestParent(element: Node, type: string): ComponentWrapper
  isInsideDiagram(element: Node): boolean
  matchesType(component: ReactComponent, type: string): boolean
}

export class Capability {
  progress: boolean
  engine: Engine
  registry: ComponentRegistry
  domHelper: DomHelper
  dependencies: { [key: string]: any }

  constructor()

  cancel(): void
  onMouseDown(e: Event): void
  onMouseMove(e: Event): void
  onMouseUp(e: Event): void
  onKeyDown(e: Event)
  onKeyUp(e: Event)
}

export class DragCapability extends Capability { /* implementation not relevant */ }
export class ConnectCapability extends Capability { /* implementation not relevant */ }
export class SingleSelectionCapability extends Capability { /* implementation not relevant */ }
export class MultiSelectionCapability extends Capability { /* implementation not relevant */ }
export class CancelCapability extends Capability { /* implementation not relevant */ }
export class DeleteCapability extends Capability { /* implementation not relevant */ }