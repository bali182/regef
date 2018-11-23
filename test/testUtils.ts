import { Component } from 'react'
import { RegefComponent, IntentType, RecognizedIntent, Id, Intent } from '../src/typings'
import { ComponentWrapper } from '../src/ComponentWrapper'
import { ComponentRegistry } from '../src/ComponentRegistry'
import { JSDOM } from 'jsdom'
import nanoid from 'nanoid'
import { Capability, EditPolicy } from '../src'

const DEFAULT_EVENT_CONFIG: EventInit = {}

interface EventConfigExtra {
  target?: EventTarget
}

export type IEventCreator = {
  mouseDown(init?: MouseEventInit & EventConfigExtra): MouseEvent
  mouseUp(init?: MouseEventInit & EventConfigExtra): MouseEvent
  mouseMove(init?: MouseEventInit & EventConfigExtra): MouseEvent
  keyDown(init?: KeyboardEventInit & EventConfigExtra): KeyboardEvent
  keyUp(init?: KeyboardEventInit & EventConfigExtra): KeyboardEvent
}

export class EventCreator implements IEventCreator {
  constructor(private readonly doc: Document) {}
  private createKeyEventCreator = (type: string) => (
    config: KeyboardEventInit & EventConfigExtra = null,
  ): KeyboardEvent => {
    const EventCtr = (this.doc.defaultView as any).KeyboardEvent
    const eventConfig = { ...DEFAULT_EVENT_CONFIG, ...config }
    const event = new EventCtr(type, eventConfig)
    if (eventConfig.target) {
      Object.defineProperty(event, 'target', { value: config.target, enumerable: true })
    }
    return event
  }
  private createMouseEventCreator = (type: string) => (
    config: MouseEventInit & EventConfigExtra = null,
  ): MouseEvent => {
    const EventCtr = (this.doc.defaultView as any).MouseEvent
    const eventConfig = { ...DEFAULT_EVENT_CONFIG, ...config }
    const event = new EventCtr(type, eventConfig)
    if (eventConfig.target) {
      Object.defineProperty(event, 'target', { value: config.target, enumerable: true })
    }
    return event
  }
  mouseDown = this.createMouseEventCreator('mousedown')
  mouseUp = this.createMouseEventCreator('mouseup')
  mouseMove = this.createMouseEventCreator('mousemove')
  keyDown = this.createKeyEventCreator('keydown')
  keyUp = this.createKeyEventCreator('keyup')
}

export function dummyElement(type: Id = null): Element {
  return {
    id: nanoid(8),
    __type: 'Dummy Dom Element',
    ...(type ? { type } : {}),
  } as any
}
export function dummyUserComponent(type: Id = null): Component {
  return {
    id: nanoid(8),
    __type: 'Dummy User Component',
    ...(type ? { type } : {}),
  } as any
}
export function dummyRegefComponent(type: Id = null): RegefComponent {
  return {
    id: nanoid(8),
    __type: 'Dummy Regef Component',
    ...(type ? { type } : {}),
  } as any
}
export function dummyComponentWrapper(
  dom: Element = dummyElement(),
  component: RegefComponent = dummyRegefComponent(),
  userComponent = dummyUserComponent(),
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
  const type = node.getAttribute('data-type')
  if (isRoot || isNode) {
    const wrapper = dummyComponentWrapper(node, dummyRegefComponent(type), dummyUserComponent(type))
    registry.register(wrapper)
    if (isRoot) {
      registry.setRoot(wrapper)
    }
  }
  for (const childNode of Array.from(node.childNodes)) {
    registerDummyTree(childNode, registry)
  }
}

export function mockDocument(html: string): Document {
  return new JSDOM(html, { contentType: 'text/xml' }).window.document
}

export function mockCapability(): Capability {
  return {
    cancel: jest.fn(),
    onKeyDown: jest.fn(),
    onKeyUp: jest.fn(),
    onMouseDown: jest.fn(),
    onMouseMove: jest.fn(),
    onMouseUp: jest.fn(),
  } as any
}

export class IntentCollectorEditPolicy extends EditPolicy {
  performed: Intent[] = []
  feedbackRequested: Intent[] = []
  feedbackErased: Intent[] = []

  perform = jest.fn((intent: Intent) => {
    this.performed.push(intent)
  })
  requestFeedback = jest.fn((intent: Intent) => {
    this.feedbackRequested.push(intent)
  })
  eraseFeedback = jest.fn((intent: Intent) => {
    this.feedbackErased.push(intent)
  })

  clear(): void {
    this.performed = []
    this.feedbackRequested = []
    this.feedbackErased = []
  }
}

export function mockEditPolicy(): IntentCollectorEditPolicy {
  return new IntentCollectorEditPolicy()
}
