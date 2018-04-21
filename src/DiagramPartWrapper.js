import ComponentRegistry from './ComponentRegistry'
import PartToolkit from './PartToolkit'
import PartDomHelper from './PartDomHelper'

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
    this[DOM_HELPER] = new PartDomHelper(this.registry)
    this[TOOLKIT] = new PartToolkit(this.registry, this[DOM_HELPER])
  }
  get id() { return this[ID] }
  get registry() { return this[REGISTRY] }
  get toolkit() { return this[TOOLKIT] }
  get engine() { return this[ENGINE] }
  get domHelper() { return this[DOM_HELPER] }
}
