import { rectangle, Rectangle } from 'regef-geometry'
import { ComponentRegistry } from './ComponentRegistry'
import { PartDomHelper } from './PartDomHelper'

export class PartToolkit {
  private registry: ComponentRegistry
  private domHelper: PartDomHelper

  constructor(registry: ComponentRegistry, domHelper: PartDomHelper) {
    this.registry = registry
    this.domHelper = domHelper
  }

  root(): React.Component {
    const root = this.registry.root
    if (root === undefined || root === null) {
      throw new Error('No root component!')
    }
    return this.registry.root.userComponent
  }

  all(): React.Component[] {
    return this.registry.all().map(({ userComponent }) => userComponent)
  }

  parent(component: React.Component): React.Component {
    const domHelper = this.domHelper
    const registry = this.registry
    const wrapper = registry.get(component)
    if (wrapper === undefined || wrapper === null) {
      throw new Error('Given component is not part of the diagram!')
    } else if (wrapper === registry.root) {
      return null
    }
    const parent = domHelper.findClosest(wrapper.dom.parentNode as Element)
    return parent === null ? null : parent.userComponent
  }

  children(component: React.Component): React.Component[] {
    const registry = this.registry
    const domHelper = this.domHelper
    const wrapper = registry.get(component)
    if (wrapper === undefined || wrapper === null) {
      throw new Error('Given component is not part of the diagram!')
    }
    const domChildren = domHelper.findRelevantChildren(wrapper.dom)
    const children = []
    for (let i = 0, length = domChildren.length; i < length; i += 1) {
      const child = registry.get(domChildren[i])
      if (child !== undefined && child !== null) {
        children.push(child.userComponent)
      }
    }
    return children
  }

  ofType(type: string | Symbol): React.Component[] {
    const all = this.registry.all()
    const ofType: React.Component[] = []
    for (let i = 0, length = all.length; i < length; i += 1) {
      const wrapper = all[i]
      if (wrapper.component.type === type) {
        ofType.push(wrapper.userComponent)
      }
    }
    return ofType
  }

  bounds(component: React.Component): Rectangle {
    const registry = this.registry
    const wrapper = registry.get(component)
    if (wrapper === undefined || wrapper === null) {
      throw new Error('Given component is not part of the diagram!')
    }
    const { left, top, width, height } = wrapper.dom.getBoundingClientRect()
    return rectangle(left, top, width, height)
  }
}
