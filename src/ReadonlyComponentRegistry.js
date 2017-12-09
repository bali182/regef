const DELEGATE = Symbol('delegate')

class ReadonlyComponentRegistry {
  constructor(registry) {
    this[DELEGATE] = registry
  }
  getRoot() {
    return this[DELEGATE].getRoot()
  }
  getRootDom() {
    return this[DELEGATE].getRootDom()
  }
  get(id) {
    return this[DELEGATE].get(id)
  }
  has(id) {
    return this[DELEGATE].has(id)
  }
}

export default ReadonlyComponentRegistry
