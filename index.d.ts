import { Component, ComponentType } from "react";
import { Rectangle, Point } from "regef-geometry";

export declare const ADD = "add";
export declare const MOVE = "move";
export declare const SELECT = "select";
export declare const DELETE = "delete";
export declare const START_CONNECTION = "start-connection";
export declare const END_CONNECTION = "end-connection";

export type IntentType =
  | "add"
  | "move"
  | "select"
  | "delete"
  | "start-connection"
  | "end-connection";

export interface Intent {
  type: IntentType;
}

export interface SelectionIntent extends Intent {
  type: "select";
  bounds: Rectangle;
  startLocation: Point;
  endLocation: Point;
  selection: Component[];
}

export interface MoveIntent extends Intent {
  type: "move";
  components: Component[];
  container: Component;
  location: Point;
  offset: Point;
  delta: Point;
}

export interface DeleteIntent extends Intent {
  type: "delete";
  selection: Component[];
}

export interface AddIntent extends Intent {
  type: "add";
  components: Component[];
  targetContainer: Component;
  container: Component;
  location: Point;
  offset: Point;
  delta: Point;
}

export interface StartConnectionIntent extends Intent {
  type: "start-connection";
  source: Component;
  location: Point;
}

export interface EndConnectionIntent extends Intent {
  type: "end-connection";
  source: Component;
  target: Component;
  location: Point;
}

export class EditPolicy {
  perform(intent: Intent): void;
  requestFeedback(intent: Intent): void;
  eraseFeedback(intent): void;
}

export class DispatchingEditPolicy extends EditPolicy {
  add(intent: AddIntent): void;
  move(intent: MoveIntent): void;
  startConnection(intent: StartConnectionIntent): void;
  endConnection(intent: EndConnectionIntent): void;
  select(intent: SelectionIntent): void;
  delete(intent: DeleteIntent): void;

  requestAddFeedback(intent: AddIntent): void;
  requestMoveFeedback(intent: MoveIntent): void;
  requestStartConnectionFeedback(intent: StartConnectionIntent): void;
  requestEndConnectionFeedback(intent: EndConnectionIntent): void;
  requestSelectFeedback(intent: SelectionIntent): void;

  eraseAddFeedback(intent: AddIntent): void;
  eraseMoveFeedback(intent: MoveIntent): void;
  eraseStartConnectionFeedback(intent: StartConnectionIntent): void;
  eraseEndConnectionFeedback(intent: EndConnectionIntent): void;
  eraseSelectFeedback(intent: SelectionIntent): void;
}

export default class EventManager {
  engine: Engine;
  hooked: boolean;
  constructor(engine: Engine);

  hookListeners(): void;
  unhookListeners(): void;

  onKeyUp(e: Event): void;
  onKeyDown(e: Event): void;
  onMouseDown(e): void;
  onMouseMove(e): void;
  onMouseUp(e): void;
}

declare class Toolkit {
  constructor(engine: Engine);
  forPart(id: string | Symbol): PartToolkit;
  forComponent(component: Component): PartToolkit;
}

declare class PartToolkit {
  constructor(registry: ComponentRegistry);

  root(): Component;
  parent(component: Component): Component;
  children(component: Component): Component[];
  editPolicy(component): EditPolicy;
  ofType(type: string): Component[];
  nodes(): Component[];
  ports(): Component[];
  connections(): Component[];
  bounds(component): Rectangle;
}

export class SelectionProvider {
  constructor();

  selection(): Component[];
}

export interface EngineParams {
  selectionProvider?: SelectionProvider;
  capabilities?: Capability[];
  editPolicies?: EditPolicy[];
}

export class Engine {
  toolkit: Toolkit;
  selectionProvider: SelectionProvider;
  capabilities: Capability[];
  editPolicies: EditPolicy[];
  parts: DiagramPartWrapper[];
  eventManager: EventManager;

  constructor(initializer: (engine: Engine) => EngineParams);

  part(id: string | Symbol): DiagramPartWrapper;
  removePart(id: string | Symbol): void;
}

interface DiagramPartProps {
  engine: Engine;
  id?: string | Symbol;
}

export class DiagramPart extends Component<DiagramPartProps, any> {
  /* empty */
}

export interface RegefComponentProps {
  regef: { toolkit: () => Promise<Toolkit> };
}

export function node<P extends RegefComponentProps>(): (
  ConnComponent: ComponentType<P>
) => ComponentType<Pick<P, Exclude<keyof P, keyof RegefComponentProps>>>;

export function port<P extends RegefComponentProps>(): (
  ConnComponent: ComponentType<P>
) => ComponentType<Pick<P, Exclude<keyof P, keyof RegefComponentProps>>>;

export function root<P extends RegefComponentProps>(): (
  ConnComponent: ComponentType<P>
) => ComponentType<Pick<P, Exclude<keyof P, keyof RegefComponentProps>>>;

export function connection<P extends RegefComponentProps>(): (
  ConnComponent: ComponentType<P>
) => ComponentType<Pick<P, Exclude<keyof P, keyof RegefComponentProps>>>;

declare class ComponentWrapper {
  dom: Node;
  component: Component;
  userComponent: Component;

  constructor(dom: Node, component: Component, userComponent: Component);
}

declare class DiagramPartWrapper {
  id: string;
  registry: ComponentRegistry;
  toolkit: PartToolkit;
  engine: Engine;
  domHelper: DomHelper;

  constructor(id: string, engine: Engine);
}

interface ComponentRegistry {
  setRoot(root): void;
  register(wrapper: ComponentWrapper): void;
  unregister(input: Node | Component): void;
  get(input: Node | Component): void;
  all(): ComponentWrapper[];
  has(input: Node | Component): boolean;
  addRegisterListener(listener: Function): void;
  addUnregisterListener(listener: Function): void;
  removeRegisterListener(listener: Function): void;
  removeUnregisterListener(listener: Function): void;
}

declare class DomHelper {
  registry: ComponentRegistry;

  constructor(registry: ComponentRegistry);

  findClosest(dom: Node, type: string): ComponentWrapper;
  findRelevantChildren(element: Node): ComponentWrapper[];
  findClosestParent(element: Node, type: string): ComponentWrapper;
  isInsideDiagram(element: Node): boolean;
  matchesType(component: Component, type: string): boolean;
}

export class Capability {
  progress: boolean;
  engine: Engine;

  constructor();

  cancel(): void;
  onMouseDown(e: Event): void;
  onMouseMove(e: Event): void;
  onMouseUp(e: Event): void;
  onKeyDown(e: Event);
  onKeyUp(e: Event);
}

export class DragCapability extends Capability {
  /* implementation not relevant */
}
export class ConnectCapability extends Capability {
  /* implementation not relevant */
}
export class SingleSelectionCapability extends Capability {
  /* implementation not relevant */
}
export class MultiSelectionCapability extends Capability {
  /* implementation not relevant */
}
export class CancelCapability extends Capability {
  /* implementation not relevant */
}
export class DeleteCapability extends Capability {
  /* implementation not relevant */
}
