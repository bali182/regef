import SelectionProvider from './SelectionProvider'
import DiagramPartWrapper from './DiagramPartWrapper'
import EventManager from './EventManager'
import Toolkit from './Toolkit'
import { DEFAULT_PART_ID } from './constants'

const SELECTION_PROVIDER = Symbol('SELECTION_PROVIDER')
const CAPABILITIES = Symbol('CAPABILITIES')
const TOOLKIT = Symbol('TOOLKIT')
const EVENT_MANAGER = Symbol('EVENT_MANAGER')
const EDIT_POLICIES = Symbol('EDIT_POLICIES')
const DEPENDENCIES = Symbol('DEPENDENCIES')
const PARTS = Symbol('PARTS')

export default class Engine {
  constructor({
    dependencies = {},
    capabilities = [],
    editPolicies = [],
    selectionProvider = new SelectionProvider(),
  }) {
    this[CAPABILITIES] = capabilities
    this[SELECTION_PROVIDER] = selectionProvider
    this[EDIT_POLICIES] = editPolicies
    this[DEPENDENCIES] = dependencies

    this[TOOLKIT] = new Toolkit(this)
    this[EVENT_MANAGER] = new EventManager(this)
    this[PARTS] = new Map()

    /* eslint-disable no-param-reassign */
    this.editPolicies.forEach((policy) => {
      policy.dependencies = dependencies
      policy.toolkit = this.toolkit
    })
    this.capabilities.forEach((capability) => {
      capability.engine = this
    })
    /* eslint-enable no-param-reassign */
    this.selectionProvider.dependencies = dependencies
    this.selectionProvider.toolkit = this.toolkit
  }

  part(id = DEFAULT_PART_ID) {
    const parts = this[PARTS]
    if (!parts.has(id)) {
      const part = new DiagramPartWrapper(id, this)
      parts.set(id, part)
    }
    return parts.get(id)
  }

  removePart(id = DEFAULT_PART_ID) { this[PARTS].delete(id) }

  get parts() { return Array.from(this[PARTS].values()) }

  get registry() { return this[PARTS].get(DEFAULT_PART_ID).registry }
  get domHelper() { return this[PARTS].get(DEFAULT_PART_ID).domHelper }

  get eventManager() { return this[EVENT_MANAGER] }
  get toolkit() { return this[TOOLKIT] }
  get capabilities() { return this[CAPABILITIES] }
  get selectionProvider() { return this[SELECTION_PROVIDER] }
  get editPolicies() { return this[EDIT_POLICIES] }
  get dependencies() { return this[DEPENDENCIES] }

  selection() {
    return this.selectionProvider.selection()
  }
}
