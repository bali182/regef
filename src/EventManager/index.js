import testVisitor from './testVisitor'

class EventManager {
  constructor(registry) {
    this.registry = registry
  }

  onMouseDown(e) {
    testVisitor(e, this.registry)
  }
}

export default EventManager
