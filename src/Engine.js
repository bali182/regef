import EventManager from './EventManager'
import Toolkit from './Toolkit'
import DomHelper from './DomHelper'

const SELECTION_PROVIDER = Symbol('SELECTION_PROVIDER')
const CAPABILITIES = Symbol('CAPABILITIES')
const DOM_HELPER = Symbol('DOM_HELPER')
const TOOLKIT = Symbol('TOOLKIT')
const EVENT_MANAGER = Symbol('EVENT_MANAGER')
const EDIT_POLICIES = Symbol('EDIT_POLICIES')
const PARTS = Symbol('PARTS')
const TYPES = Symbol('TYPES')
const ROOT_TYPE = Symbol('ROOT_TYPE')

export default class Engine {
  constructor(config = () => ({
    capabilities: [],
    editPolicies: [],
    selectionProvider: null,
    rootType: null,
    types: [],
  })) {
    this[TOOLKIT] = new Toolkit(this)
    this[EVENT_MANAGER] = new EventManager(this)
    this[DOM_HELPER] = new DomHelper(this)
    this[PARTS] = new Map()

    const { capabilities, editPolicies, selectionProvider, rootType, types } = config(this)

    this[CAPABILITIES] = capabilities
    this[EDIT_POLICIES] = editPolicies
    this[SELECTION_PROVIDER] = selectionProvider
    this[TYPES] = types
    this[ROOT_TYPE] = rootType
  }
  __partsMap() { return this[PARTS] }
  part(id) { return this[PARTS].get(id) }
  get domHelper() { return this[DOM_HELPER] }
  get parts() { return Array.from(this[PARTS].values()) }
  get eventManager() { return this[EVENT_MANAGER] }
  get toolkit() { return this[TOOLKIT] }
  get capabilities() { return this[CAPABILITIES] }
  get selectionProvider() { return this[SELECTION_PROVIDER] }
  get editPolicies() { return this[EDIT_POLICIES] }
  get rootType() { return this[ROOT_TYPE] }
  get types() { return this[TYPES] }
}
