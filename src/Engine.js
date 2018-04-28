import DiagramPartWrapper from './DiagramPartWrapper'
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

export default class Engine {
  constructor(config = () => ({
    capabilities: [],
    editPolicies: [],
    selectionProvider: null,
  })) {
    this[TOOLKIT] = new Toolkit(this)
    this[EVENT_MANAGER] = new EventManager(this)
    this[DOM_HELPER] = new DomHelper(this)
    this[PARTS] = new Map()

    const { capabilities, editPolicies, selectionProvider } = config(this)

    this[CAPABILITIES] = capabilities
    this[EDIT_POLICIES] = editPolicies
    this[SELECTION_PROVIDER] = selectionProvider
  }

  part(id) {
    const parts = this[PARTS]
    if (!parts.has(id)) {
      const part = new DiagramPartWrapper(id, this)
      parts.set(id, part)
    }
    return parts.get(id)
  }

  removePart(id) { this[PARTS].delete(id) }

  get domHelper() { return this[DOM_HELPER] }
  get parts() { return Array.from(this[PARTS].values()) }
  get eventManager() { return this[EVENT_MANAGER] }
  get toolkit() { return this[TOOLKIT] }
  get capabilities() { return this[CAPABILITIES] }
  get selectionProvider() { return this[SELECTION_PROVIDER] }
  get editPolicies() { return this[EDIT_POLICIES] }
}
