import { MoveIntent } from '../../src/index'
import { isContainer, isStep } from './typeUtils'
import { DIAGRAM } from './constants'
import { BaseSampleEditPolicy } from './BaseSampleEditPolicy'
import { ReactCompWithId } from '../types'

export default class MoveContainerChildrenEditPolicy extends BaseSampleEditPolicy {
  move({ components, location, container }: MoveIntent) {
    if (!isContainer(container)) {
      return
    }
    const toolkit = this.engine.toolkit.forPart(DIAGRAM)
    const children = toolkit.children(container).filter(isStep)
    if (!components.every((moved) => children.indexOf(moved as any) >= 0)) {
      return
    }
    const bounds = this.mapBounds(children)
    const sortedChildren = this.sortedChildren(children, bounds)
    const before = this.componentBefore(location, sortedChildren, bounds)
    const after = this.componentAfter(location, sortedChildren, bounds)
    const childIds = sortedChildren.map((child) => child.props.id)
    const componentIds = (components as ReactCompWithId[]).map((comp) => comp.props.id)
    const newState = this.updatedChildren(
      childIds,
      componentIds,
      before === null ? null : before.props.id,
      after === null ? null : after.props.id,
    )
    this.dependencies.setChildren({
      id: container.props.id,
      children: newState,
    })
  }

  requestMoveFeedback({ location, delta, components, container }: MoveIntent) {
    if (!isContainer(container)) {
      return
    }
    const toolkit = this.engine.toolkit.forPart(DIAGRAM)
    const root = toolkit.root()
    const containerOffset = this.containerOffset
    const children = toolkit.children(container)
    const bounds = components.map((moved) =>
      toolkit
        .bounds(moved)
        .translate(containerOffset)
        .translate(delta),
    )
    if (components.every((moved) => children.indexOf(moved) >= 0)) {
      container.setState({ insertionFeedback: this.insertionIndex(children, location) })
      root.setState({ moveFeedback: bounds })
    } else {
      root.setState({ errorFeedback: bounds })
    }
  }

  eraseMoveFeedback({ container }: MoveIntent) {
    if (!isContainer(container)) {
      return
    }
    container.setState({ insertionFeedback: null })
    const toolkit = this.engine.toolkit.forPart(DIAGRAM)
    toolkit.root().setState({ moveFeedback: null, errorFeedback: null })
  }

  updatedChildren(children, components, before, after): string[] {
    const withoutMoved = children.filter((child) => components.indexOf(child) < 0)
    if (after !== null && components.indexOf(after) < 0) {
      const index = withoutMoved.indexOf(after)
      return withoutMoved
        .slice(0, index)
        .concat(components)
        .concat(withoutMoved.slice(index))
    } else if (before !== null && components.indexOf(before) < 0) {
      const index = withoutMoved.indexOf(before)
      return withoutMoved
        .slice(0, index + 1)
        .concat(components)
        .concat(withoutMoved.slice(index + 1))
    } else if (before !== null && after === null) {
      return withoutMoved.concat(components)
    } else if (before === null && after !== null) {
      return components.concat(withoutMoved)
    }
    return children
  }

  mapBounds(children) {
    const toolkit = this.engine.toolkit.forPart(DIAGRAM)
    return children.reduce((map, child) => map.set(child, toolkit.bounds(child)), new Map())
  }

  sortedChildren(children, bounds) {
    return children.sort((a, b) => bounds.get(a).x - bounds.get(b).x)
  }

  componentBefore(location, children, bounds) {
    for (let i = children.length - 1; i >= 0; i -= 1) {
      const child = children[i]
      const childLoc = bounds.get(child)
      if (childLoc.x < location.x) {
        return child
      }
    }
    return null
  }

  componentAfter(location, children, bounds) {
    for (let i = 0; i < children.length; i += 1) {
      const child = children[i]
      const childLoc = bounds.get(child)
      if (childLoc.x > location.x) {
        return child
      }
    }
    return null
  }

  insertionIndex(children, location) {
    if (children.length === 0) {
      return 0
    }
    const toolkit = this.engine.toolkit.forPart(DIAGRAM)
    for (let i = 0; i < children.length; i += 1) {
      const child = children[i]
      const bounds = toolkit.bounds(child)
      if (bounds.x > location.x) {
        return i
      }
    }
    return children.length
  }
}
