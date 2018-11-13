import { Rectangle, Point } from 'regef-geometry'
import { Component } from 'react'
import { Toolkit } from './Toolkit'
import { Engine } from './Engine'
import { EditPolicy } from './EditPolicy'
import { SelectionProvider } from './SelectionProvider'
import { ComponentWrapper } from './ComponentWrapper'
import { Capability } from './Capability'

/** @internal */
export const REGEF_PROP_KEY = '@@regef-internal-context@@'

/** @internal */
export type HasUserComponent = {
  userComponent: React.Component
}

/** @internal */
export type HasType = {
  type: Id
}

/** @internal */
export type RegefComponent = React.Component & HasUserComponent & HasType

/** @internal */
export type RegisterListener = (wrapper: ComponentWrapper) => void

/** @internal */
export type ComponentWrapperField = ComponentWrapper | Element | Component

/** @internal */
export type RegefInternalProps = {
  engine: Engine
  id: Id
}

/** @internal */
export type RegefProps = {
  [REGEF_PROP_KEY]: RegefInternalProps
}

export type Id = string | Symbol

export enum IntentType {
  ADD = 'add',
  MOVE = 'move',
  SELECT = 'select',
  DELETE = 'delete',
  START_CONNECTION = 'start-connection',
  END_CONNECTION = 'end-connection',
}

export type Intent = {
  type: IntentType
}

export type RecognizedIntent =
  | AddIntent
  | MoveIntent
  | StartConnectionIntent
  | EndConnectionIntent
  | SelectionIntent
  | DeleteIntent

export type SelectionIntent = {
  type: IntentType.SELECT
  bounds: Rectangle
  startLocation: Point
  endLocation: Point
  selection: Component[]
}

export type MoveIntent = {
  type: IntentType.MOVE
  components: Component[]
  container: Component
  location: Point
  offset: Point
  delta: Point
}

export type DeleteIntent = {
  type: IntentType.DELETE
  selection: Component[]
}

export type AddIntent = {
  type: IntentType.ADD
  components: Component[]
  targetContainer: Component
  container: Component
  location: Point
  offset: Point
  delta: Point
}

export type StartConnectionIntent = {
  type: IntentType.START_CONNECTION
  source: Component
  location: Point
}

export type EndConnectionIntent = {
  type: IntentType.END_CONNECTION
  source: Component
  target: Component
  location: Point
}

export type ToolkitProvider = () => Promise<Toolkit>

export interface RegefObject {
  toolkit: ToolkitProvider
}

export interface RegefComponentProps {
  regef: RegefObject
}

export interface CancelCapabilityConfig {
  parts?: Id[]
  keys?: string[]
}

export interface ConnectCapabilityConfig {
  parts?: Id[]
  sourceTypes?: Id[]
  targetTypes?: Id[]
}

export interface DeleteCapabilityConfig {
  parts?: Id[]
  keys?: string[]
}

export interface DragCapabilityConfig {
  parts?: Id[]
  draggables?: Id[]
  hosts?: Id[]
}

export interface MultiSelectionCapabilityConfig {
  parts: Id[]
  selectables: Id[]
  intersection: boolean
  containment: boolean
}

export interface SingleSelectionCapabilityConfig {
  parts: Id[]
  selectables: Id[]
}

export interface EngineConfig {
  capabilities: Capability<any>[]
  editPolicies: EditPolicy[]
  selectionProvider: SelectionProvider
  rootType: Id
  types: Id[]
  htmlDocument: Document
}

export type EngineConfigProvider = (engine: Engine) => Partial<EngineConfig>
