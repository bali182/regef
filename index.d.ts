import { Component, ComponentType } from 'react'
import { Rectangle, Point } from 'regef-geometry'

export declare const ADD = 'add'
export declare const MOVE = 'move'
export declare const SELECT = 'select'
export declare const DELETE = 'delete'
export declare const START_CONNECTION = 'start-connection'
export declare const END_CONNECTION = 'end-connection'

export type IntentType =
  | 'add'
  | 'move'
  | 'select'
  | 'delete'
  | 'start-connection'
  | 'end-connection'

export interface Intent {
  type: IntentType
}

export interface SelectionIntent extends Intent {
  type: 'select'
  bounds: Rectangle
  startLocation: Point
  endLocation: Point
  selection: Component[]
}

export interface MoveIntent extends Intent {
  type: 'move'
  components: Component[]
  container: Component
  location: Point
  offset: Point
  delta: Point
}

export interface DeleteIntent extends Intent {
  type: 'delete'
  selection: Component[]
}

export interface AddIntent extends Intent {
  type: 'add'
  components: Component[]
  targetContainer: Component
  container: Component
  location: Point
  offset: Point
  delta: Point
}

export interface StartConnectionIntent extends Intent {
  type: 'start-connection'
  source: Component
  location: Point
}

export interface EndConnectionIntent extends Intent {
  type: 'end-connection'
  source: Component
  target: Component
  location: Point
}

export class EditPolicy {
  perform(intent: Intent): void
  requestFeedback(intent: Intent): void
  eraseFeedback(intent: Intent): void
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

export class EventManager {
  engine: Engine
  hooked: boolean
  constructor(engine: Engine)

  hookListeners(): void
  unhookListeners(): void

  onKeyUp(e: Event): void
  onKeyDown(e: Event): void
  onMouseDown(e: Event): void
  onMouseMove(e: Event): void
  onMouseUp(e: Event): void
}

declare class Toolkit {
  constructor(engine: Engine)
  forPart(id: string | Symbol): PartToolkit
  forComponent(component: Component): PartToolkit
}

declare class PartToolkit {
  constructor(registry: ComponentRegistry)

  root(): Component
  parent(component: Component): Component
  children(component: Component): Component[]
  editPolicy(component: Component): EditPolicy
  ofType(type: string | Symbol): Component[]
  nodes(): Component[]
  ports(): Component[]
  connections(): Component[]
  bounds(component: Component): Rectangle
}

export class SelectionProvider {
  constructor()

  selection(): Component[]
}

export interface EngineParams {
  selectionProvider?: SelectionProvider
  capabilities?: Capability<any>[]
  editPolicies?: EditPolicy[]
  rootType?: Symbol | string
  types?: ReadonlyArray<Symbol | string>
}

export class Engine {
  toolkit: Toolkit
  selectionProvider: SelectionProvider
  capabilities: Capability<any>[]
  editPolicies: EditPolicy[]
  parts: DiagramPartWrapper[]
  eventManager: EventManager
  rootType: Symbol | string
  types: ReadonlyArray<Symbol | string>

  constructor(initializer: (engine: Engine) => EngineParams)

  part(id: string | Symbol): DiagramPartWrapper
  removePart(id: string | Symbol): void
}

interface DiagramPartProps {
  engine: Engine
  id?: string | Symbol
}

export class DiagramPart extends Component<DiagramPartProps, any> {
  /* empty */
}

export interface RegefComponentProps {
  regef: { toolkit: () => Promise<Toolkit> }
}

export function root<P extends Partial<RegefComponentProps>>(): (
  ConnComponent: ComponentType<P>,
) => ComponentType<Pick<P, Exclude<keyof P, keyof RegefComponentProps>>>

export function component<P extends Partial<RegefComponentProps>>(
  type: Symbol | string,
): (
  ConnComponent: ComponentType<P>,
) => ComponentType<Pick<P, Exclude<keyof P, keyof RegefComponentProps>>>

declare class ComponentWrapper {
  dom: Node
  component: Component
  userComponent: Component

  constructor(dom: Node, component: Component, userComponent: Component)
}

declare class DiagramPartWrapper {
  id: string
  registry: ComponentRegistry
  toolkit: PartToolkit
  engine: Engine
  domHelper: DomHelper

  constructor(id: string, engine: Engine)
}

interface ComponentRegistry {
  setRoot(root: ComponentWrapper): void
  register(wrapper: ComponentWrapper): void
  unregister(input: Node | Component): void
  get(input: Node | Component): void
  all(): ComponentWrapper[]
  has(input: Node | Component): boolean
  addRegisterListener(listener: Function): void
  addUnregisterListener(listener: Function): void
  removeRegisterListener(listener: Function): void
  removeUnregisterListener(listener: Function): void
}

declare class DomHelper {
  registry: ComponentRegistry

  constructor(registry: ComponentRegistry)

  findClosest(dom: Node, type: string): ComponentWrapper
  findRelevantChildren(element: Node): ComponentWrapper[]
  findClosestParent(element: Node, type: string): ComponentWrapper
  isInsideDiagram(element: Node): boolean
  matchesType(component: Component, type: string): boolean
}

export class Capability<Config> {
  progress: boolean
  engine: Engine
  config: Config

  constructor(engine: Engine, config?: Config)

  cancel(): void
  onMouseDown(e: Event): void
  onMouseMove(e: Event): void
  onMouseUp(e: Event): void
  onKeyDown(e: Event): void
  onKeyUp(e: Event): void
}

interface BaseConfig {
  parts?: ReadonlyArray<Symbol | string>
}

export interface DragCapabilityConfig extends BaseConfig {
  draggables?: ReadonlyArray<Symbol | string>
  hosts?: ReadonlyArray<Symbol | string>
}

export interface ConnectCapabilityConfig extends BaseConfig {
  sourceTypes?: ReadonlyArray<Symbol | string>
  targetTypes?: ReadonlyArray<Symbol | string>
}

export interface SingleSelectionCapabilityConfig extends BaseConfig {
  selectables?: ReadonlyArray<Symbol | string>
}

export interface MultiSelectionCapabilityConfig extends BaseConfig {
  selectables?: ReadonlyArray<Symbol | string>
  intersection?: boolean
  containment?: boolean
}

export interface CancelCapabilityConfig extends BaseConfig {
  keys?: ReadonlyArray<string>
}

export interface DeleteCapabilityConfig extends BaseConfig {
  keys?: ReadonlyArray<string>
}

export class DragCapability extends Capability<DragCapabilityConfig> {}
export class ConnectCapability extends Capability<ConnectCapabilityConfig> {}
export class SingleSelectionCapability extends Capability<SingleSelectionCapabilityConfig> {}
export class MultiSelectionCapability extends Capability<MultiSelectionCapabilityConfig> {}
export class CancelCapability extends Capability<CancelCapabilityConfig> {}
export class DeleteCapability extends Capability<DeleteCapabilityConfig> {}
