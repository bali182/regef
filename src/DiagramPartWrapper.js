import ComponentRegistry from './ComponentRegistry'
import PartToolkit from './PartToolkit'
import DomHelper from './DomHelper'

const ID = Symbol('id')
const ENGINE = Symbol('ENGINE')
const REGISTRY = Symbol('REGISTRY')
const TOOLKIT = Symbol('TOOLKIT')
const DOM_HELPER = Symbol('DOM_HELPER')

export default class DiagramPartWrapper {
  constructor(id, engine) {
    this[ID] = id
    this[ENGINE] = engine

    this[REGISTRY] = new ComponentRegistry()
    this[TOOLKIT] = new PartToolkit(this.registry)
    this[DOM_HELPER] = new DomHelper(this.registry)
  }
  get id() { return this[ID] }
  get registry() { return this[REGISTRY] }
  get toolkit() { return this[TOOLKIT] }
  get engine() { return this[ENGINE] }
  get domHelper() { return this[DOM_HELPER] }
}