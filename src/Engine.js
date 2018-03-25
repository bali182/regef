import SelectionProvider from './SelectionProvider'
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

const valueFrom = (input, ...args) => (input instanceof Function ? input(...args) : input)
const arrayFrom = (input, ...args) => {
  const value = input instanceof Function ? input(...args) : input
  return Array.isArray(value) ? value : [value]
}

export default class Engine {
  constructor({
    capabilities = [],
    editPolicies = [],
    selectionProvider = new SelectionProvider(),
  }) {
    this[TOOLKIT] = new Toolkit(this)
    this[EVENT_MANAGER] = new EventManager(this)
    this[DOM_HELPER] = new DomHelper(this)
    this[PARTS] = new Map()

    this[CAPABILITIES] = arrayFrom(capabilities, this)
    this[EDIT_POLICIES] = arrayFrom(editPolicies, this)
    this[SELECTION_PROVIDER] = valueFrom(selectionProvider, this)

    this.capabilities.forEach((capability) => {
      // eslint-disable-next-line no-param-reassign
      capability.engine = this
    })
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
