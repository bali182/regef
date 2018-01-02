import { findDOMNode } from 'react-dom'

const DOM = Symbol('DOM')
const COMPONENT = Symbol('COMPONENT')
const USER_COMPONENT = Symbol('USER_COMPONENT')

class ComponentWrapper {
  constructor(dom, component, userComponent) {
    this[DOM] = dom
    this[COMPONENT] = component
    this[USER_COMPONENT] = userComponent
  }

  get dom() {
    return this[DOM]
  }

  get component() {
    return this[COMPONENT]
  }

  get userComponent() {
    return this[USER_COMPONENT]
  }
}

export const fromComponent = (component) => new ComponentWrapper(
  findDOMNode(component),
  component,
  component.userComponent,
)

export default ComponentWrapper
