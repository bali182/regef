import { Rectangle, Point } from "regef-geometry";
import { Component } from "react";

export const REGEF_PROP_KEY = '@@superSecretPropForTransferingContextInAVeryAwkwardWay'

export type Id = string | Symbol

export type HasUserComponent = {
  userComponent: React.Component
}

export type HasType = {
  type: Id
}

export type RegefComponent = React.Component & HasUserComponent & HasType

export const ADD = 'add'
export const MOVE = 'move'
export const SELECT = 'select'
export const DELETE = 'delete'
export const START_CONNECTION = 'start-connection'
export const END_CONNECTION = 'end-connection'

export type IntentType = typeof ADD | typeof MOVE | typeof SELECT | typeof DELETE | typeof START_CONNECTION | typeof END_CONNECTION

export type Intent = {
  type: IntentType
}

export type SelectionIntent = {
  type: typeof SELECT
  bounds: Rectangle
  startLocation: Point
  endLocation: Point
  selection: Component[]
}

export type MoveIntent = {
  type: typeof MOVE
  components: Component[]
  container: Component
  location: Point
  offset: Point
  delta: Point
}

export type DeleteIntent = {
  type: typeof DELETE
  selection: Component[]
}

export type AddIntent = {
  type: typeof ADD
  components: Component[]
  targetContainer: Component
  container: Component
  location: Point
  offset: Point
  delta: Point
}

export type StartConnectionIntent = {
  type: typeof START_CONNECTION
  source: Component
  location: Point
}

export type EndConnectionIntent = {
  type: typeof END_CONNECTION
  source: Component
  target: Component
  location: Point
}
