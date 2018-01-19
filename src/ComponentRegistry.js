import ComponentWrapper from './ComponentWrapper'

class ComponentRegistry {
  constructor() {
    this.mapping = new Map()
    this.wrappers = new Set()
    this.root = null
    this.registerListeners = []
    this.unregisterListeners = []
  }
  setRoot(root) {
    this.root = root
    if (root === null || root === undefined) {
      this.mapping.clear()
    }
  }
  getRoot() {
    return this.root
  }
  register(wrapper) {
    if (!(wrapper instanceof ComponentWrapper)) {
      throw new TypeError(`ComponentWrapper instance expected, got ${wrapper}`)
    }
    this.mapping.set(wrapper.dom, wrapper)
    this.mapping.set(wrapper.component, wrapper)
    this.mapping.set(wrapper.userComponent, wrapper)
    this.wrappers.add(wrapper)
    this.registerListeners.forEach((listener) => listener(wrapper))
  }
  unregister(input) {
    const wrapper = this.get(input)
    if (wrapper !== undefined) {
      this.mapping.delete(wrapper.dom)
      this.mapping.delete(wrapper.component)
      this.mapping.delete(wrapper.userComponent)
      this.wrappers.delete(wrapper)
      this.unregisterListeners.forEach((listener) => listener(wrapper))
    }
  }
  get(input) {
    return this.mapping.get(input)
  }
  all() {
    return Array.from(this.wrappers)
  }
  has(input) {
    return this.mapping.has(input)
  }
  addRegisterListener(listener) {
    this.registerListeners.push(listener)
  }
  addUnregisterListener(listener) {
    this.unregisterListeners.push(listener)
  }
  removeRegisterListener(listener) {
    this.registerListeners = this.registerListeners.filter((e) => e !== listener)
  }
  removeUnregisterListener(listener) {
    this.unregisterListeners = this.unregisterListeners.filter((e) => e !== listener)
  }
}
export default ComponentRegistry
