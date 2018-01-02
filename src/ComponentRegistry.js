import ComponentWrapper from './ComponentWrapper'

class ComponentRegistry {
  constructor() {
    this.mapping = new Map()
    this.root = null
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
  }
  unregister(input) {
    const wrapper = this.get(input)
    if (wrapper !== undefined) {
      this.mapping.delete(wrapper.dom)
      this.mapping.delete(wrapper.component)
      this.mapping.delete(wrapper.userComponent)
    }
  }
  get(input) {
    return this.mapping.get(input)
  }
  has(input) {
    return this.mapping.has(input)
  }
}
export default ComponentRegistry
