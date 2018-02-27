import DomHelper from './DomHelper'

export default class Capability {
  constructor() {
    this.engine = null
    this.progress = false
    this.registry = null
    this.domHelper = null
  }
  setEngine(engine) {
    this.engine = engine
  }
  setComponentRegistry(registry) {
    this.registry = registry
    this.domHelper = registry === null ? null : new DomHelper(registry)
  }
  onKeyDown() {
    // emtpy
  }
  onKeyUp() {
    // empty
  }
  onMouseDown() {
    // empty
  }
  onMouseMove() {
    // empty
  }
  onMouseUp() {
    // empty
  }
  cancel() {
    // empty
  }
}
