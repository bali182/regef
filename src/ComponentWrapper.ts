import ReactDOM from 'react-dom'
import React from 'react'
import { HasUserComponent, HasType } from './constants';

type RegefComponent = React.Component & HasType & HasUserComponent

export class ComponentWrapper {
  public dom: Element
  public component: RegefComponent
  public userComponent: React.Component

  constructor(dom: Element, component: RegefComponent, userComponent: React.Component) {
    this.dom = dom
    this.component = component
    this.userComponent = userComponent
  }
}

export function fromComponent(component: RegefComponent): ComponentWrapper {
  return new ComponentWrapper(
    ReactDOM.findDOMNode(component) as Element,
    component,
    component.userComponent,
  )
}
