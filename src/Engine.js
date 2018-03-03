import SelectionProvider from './SelectionProvider'
import DomHelper from './DomHelper'
import ComponentRegistry from './ComponentRegistry'
import Toolkit from './Toolkit'

const TOOLKIT = Symbol('TOOLKIT')
const REGISTRY = Symbol('REGISTRY')
const CAPABILITIES = Symbol('CAPABILITIES')
const SELECTION_PROVIDER = Symbol('SELECTION_PROVIDER')
const EDIT_POLICIES = Symbol('EDIT_POLICIES')
const DEPENDENCIES = Symbol('DEPENDENCIES')

class Engine {
  constructor({
    dependencies = {},
    capabilities = [],
    editPolicies = [],
    selectionProvider = new SelectionProvider(),
  }) {
    this[REGISTRY] = new ComponentRegistry()
    this[TOOLKIT] = new Toolkit(this.registry)
    this[CAPABILITIES] = capabilities
    this[SELECTION_PROVIDER] = selectionProvider
    this[EDIT_POLICIES] = editPolicies
    this[DEPENDENCIES] = dependencies
    /* eslint-disable no-param-reassign */
    this.editPolicies.forEach((policy) => {
      policy.dependencies = dependencies
      policy.toolkit = this.toolkit
    })
    this.capabilities.forEach((capability) => {
      capability.dependencies = dependencies
      capability.toolkit = this.toolkit
      capability.registry = this.registry
      capability.domHelper = new DomHelper(this.registry)
      capability.engine = this
    })
    /* eslint-enable no-param-reassign */
    this.selectionProvider.dependencies = dependencies
    this.selectionProvider.toolkit = this.toolkit
  }

  get toolkit() { return this[TOOLKIT] }
  get registry() { return this[REGISTRY] }
  get capabilities() { return this[CAPABILITIES] }
  get selectionProvider() { return this[SELECTION_PROVIDER] }
  get editPolicies() { return this[EDIT_POLICIES] }
  get dependencies() { return this[DEPENDENCIES] }

  onKeyUp(e) {
    this.capabilities.forEach((capability) => capability.onKeyUp(e))
  }
  onKeyDown(e) {
    this.capabilities.forEach((capability) => capability.onKeyDown(e))
  }
  onMouseDown(e) {
    this.capabilities.forEach((capability) => capability.onMouseDown(e))
  }
  onMouseMove(e) {
    this.capabilities.forEach((capability) => capability.onMouseMove(e))
  }
  onMouseUp(e) {
    this.capabilities.forEach((capability) => capability.onMouseUp(e))
  }
  selection() {
    return this.selectionProvider.selection()
  }
}

export default Engine
