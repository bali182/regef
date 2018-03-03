import SelectionProvider from './SelectionProvider'
import DomHelper from './DomHelper'

class Engine {
  constructor({
    dependencies = {},
    capabilities = [],
    editPolicies = [],
    selectionProvider = new SelectionProvider(),
  }) {
    this._toolkit = null
    this._registry = null
    this.capabilities = capabilities
    this.selectionProvider = selectionProvider
    this.editPolicies = editPolicies
    this.dependencies = dependencies

    this.editPolicies.forEach((policy) => {
      // eslint-disable-next-line no-param-reassign
      policy.dependencies = dependencies
    })

    this.capabilities.forEach((capability) => {
      // eslint-disable-next-line no-param-reassign
      capability.dependencies = dependencies
    })

    this.selectionProvider.dependencies = dependencies
  }
  get toolkit() {
    return this._toolkit
  }
  set toolkit(toolkit) {
    this._toolkit = toolkit
    this.editPolicies.forEach((policy) => {
      // eslint-disable-next-line no-param-reassign
      policy.toolkit = toolkit
    })
    this.capabilities.forEach((capability) => {
      // eslint-disable-next-line no-param-reassign
      capability.toolkit = toolkit
    })
  }
  get registry() {
    return this._registry
  }
  set registry(registry) {
    this._registry = registry
    this.capabilities.forEach((capability) => {
      /* eslint-disable no-param-reassign */
      capability.registry = registry
      capability.domHelper = registry ? new DomHelper(registry) : null
      capability.engine = this
      /* eslint-enable no-param-reassign */
    })
    if (this.selectionProvider instanceof SelectionProvider) {
      this.selectionProvider.toolkit = this.toolkit
    }
  }
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
