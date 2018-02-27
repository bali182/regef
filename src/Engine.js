import SelectionProvider from './SelectionProvider'
import { compose } from './CompositeEditPolicy'

class Engine {
  constructor({
    capabilities = [],
    editPolicies = [],
    selectionProvider = new SelectionProvider(),
  }) {
    this.toolkit = null
    this.registry = null
    this.capabilities = capabilities
    this.selectionProvider = selectionProvider
    this.editPolicy = compose(editPolicies)
  }
  setToolkit(toolkit) {
    this.toolkit = toolkit
    this.editPolicy.toolkit = toolkit
  }
  getComponentRegistry() {
    return this.registry
  }
  setComponentRegistry(registry) {
    this.registry = registry
    this.capabilities.forEach((capability) => {
      capability.setComponentRegistry(registry)
      capability.setEngine(this)
    })
    if (this.selectionProvider instanceof SelectionProvider) {
      this.selectionProvider.setToolkit(this.toolkit)
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
    if (!(this.selectionProvider instanceof SelectionProvider)) {
      return []
    }
    return this.selectionProvider.selection()
  }
}

export default Engine
