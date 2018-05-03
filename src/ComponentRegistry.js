import ComponentWrapper from './ComponentWrapper'

export default class ComponentRegistry {
  constructor() {
    this.init()
  }
  init() {
    this.mapping = new Map()
    this.wrappers = new Set()
    this.root = null
    this.registerListeners = []
    this.unregisterListeners = []
  }
  setRoot(root) {
    if (root && this.root) {
      throw new Error(`Diagram can only contain a single root. ${this.root} is already registered.`)
    }
    if (root) {
      this.root = root
    } else {
      this.init()
    }
  }
  register(wrapper) {
    if (!(wrapper instanceof ComponentWrapper)) {
      throw new TypeError(`ComponentWrapper instance expected, got ${wrapper}`)
    }
    this.mapping.set(wrapper, wrapper)
    this.mapping.set(wrapper.dom, wrapper)
    this.mapping.set(wrapper.component, wrapper)
    this.mapping.set(wrapper.userComponent, wrapper)
    this.wrappers.add(wrapper)
    this.registerListeners.forEach((listener) => listener(wrapper))
  }
  unregister(input) {
    const wrapper = this.get(input)
    if (wrapper !== undefined) {
      this.mapping.delete(wrapper)
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
