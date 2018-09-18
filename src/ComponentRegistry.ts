import { ComponentWrapper } from './ComponentWrapper'
import React from 'react'

type WrapperField = ComponentWrapper | Element | React.Component
type RegisterListener = (c: ComponentWrapper) => void

export class ComponentRegistry {
  private mapping: Map<WrapperField, ComponentWrapper>
  private wrappers: Set<ComponentWrapper>
  private registerListeners: RegisterListener[] = []
  private unregisterListeners: RegisterListener[] = []
  public root: ComponentWrapper

  constructor() {
    this.init()
  }
  init(): void {
    this.mapping = new Map()
    this.wrappers = new Set()
    this.root = null
    this.registerListeners = []
    this.unregisterListeners = []
  }
  setRoot(root: ComponentWrapper): void {
    if (root && this.root) {
      throw new Error(`Diagram can only contain a single root. ${this.root} is already registered.`)
    }
    if (root) {
      this.root = root
    } else {
      this.init()
    }
  }
  register(wrapper: ComponentWrapper): void {
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
  unregister(input: WrapperField) {
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
  get(input: WrapperField): ComponentWrapper {
    return this.mapping.get(input)
  }
  all(): ComponentWrapper[] {
    return Array.from(this.wrappers)
  }
  has(input: WrapperField): boolean {
    return this.mapping.has(input)
  }
  addRegisterListener(listener: RegisterListener): void {
    this.registerListeners.push(listener)
  }
  addUnregisterListener(listener: RegisterListener): void {
    this.unregisterListeners.push(listener)
  }
  removeRegisterListener(listener: RegisterListener): void {
    this.registerListeners = this.registerListeners.filter((e) => e !== listener)
  }
  removeUnregisterListener(listener: RegisterListener): void {
    this.unregisterListeners = this.unregisterListeners.filter((e) => e !== listener)
  }
}
