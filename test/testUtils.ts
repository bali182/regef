import { Component } from 'react'
import { RegefComponent, IntentType, RecognizedIntent } from '../src/typings'
import { ComponentWrapper } from '../src/ComponentWrapper'
import { ComponentRegistry } from '../src/ComponentRegistry'

export function mouseDownEvent(config: Partial<MouseEventInit> = {}) {
  return new MouseEvent('mousedown', config)
}
export function mouseUpEvent(config: Partial<MouseEventInit> = {}) {
  return new MouseEvent('mouseup', config)
}
export function mouseMoveEvent(config: MouseEventInit = {}) {
  return new MouseEvent('mousemove', config)
}
export function keyDownEvent(config: KeyboardEventInit = {}) {
  return new KeyboardEvent('keydown', config)
}
export function keyUpEvent(config: KeyboardEventInit = {}) {
  return new KeyboardEvent('keyup', config)
}
export function dummyElement(): Element {
  return { domElement: Symbol('DOM element') } as any
}
export function dummyReactComponent(): Component {
  return { domElement: Symbol('React component') } as any
}
export function dummyRegefComponent(): RegefComponent {
  return { domElement: Symbol('Regef component') } as any
}
export function dummyComponentWrapper(
  dom: Element = dummyElement(),
  component: RegefComponent = dummyRegefComponent(),
  userComponent = dummyReactComponent(),
): ComponentWrapper {
  return new ComponentWrapper(dom, component, userComponent)
}

export function dummyIntent<T extends RecognizedIntent = RecognizedIntent>(type: IntentType): T {
  return { type } as T
}

function isElement(node: any): node is Element {
  return node && node.getAttribute
}

export function registerDummyTree(node: Node, registry: ComponentRegistry): void {
  if (!isElement(node)) {
    return
  }
  const isRoot = Boolean(node.getAttribute('data-root'))
  const isNode = Boolean(node.getAttribute('data-component'))
  if (isRoot || isNode) {
    const wrapper = dummyComponentWrapper(node)
    registry.register(wrapper)
    if (isRoot) {
      registry.setRoot(wrapper)
    }
  }
  for (const childNode of Array.from(node.childNodes)) {
    registerDummyTree(childNode, registry)
  }
}
