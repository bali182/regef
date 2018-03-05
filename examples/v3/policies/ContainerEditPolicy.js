import { DispatchingEditPolicy } from '../../../src/index'

export default class ContainerEditPolicy extends DispatchingEditPolicy {
  checkRelevant(component) {
    return Boolean(component) && Boolean(component.props.container)
  }

  move({ components, container, location }) {
    if (!this.checkRelevant(container)) {
      return
    }
    const { toolkit } = this
    const children = toolkit.forDefaultPart().children(container)
    if (!components.every((moved) => children.indexOf(moved) >= 0)) {
      return
    }
    const bounds = this.mapBounds(children)
    const sortedChildren = this.sortedChildren(children, bounds)
    const before = this.componentBefore(location, sortedChildren, bounds)
    const after = this.componentAfter(location, sortedChildren, bounds)
    const childIds = sortedChildren.map((child) => child.props.id)
    const componentIds = components.map((comp) => comp.props.id)
    const newState = this.updatedChildren(
      childIds,
      componentIds,
      before === null ? null : before.props.id,
      after === null ? null : after.props.id,
    )
    container.props.setChildren({
      id: container.props.id,
      children: newState,
    })
  }

  requestMoveFeedback({ location, delta, container, components }) {
    if (!this.checkRelevant(container)) {
      return
    }
    const { toolkit } = this
    const partToolkit = toolkit.forDefaultPart()
    const root = partToolkit.root()
    const children = partToolkit.children(container)
    const bounds = components.map((moved) => partToolkit.bounds(moved).translate(delta))
    if (components.every((moved) => children.indexOf(moved) >= 0)) {
      container.setState({ insertionFeedback: this.insertionIndex(children, location) })
      root.setState({ moveFeedback: bounds })
    } else {
      root.setState({ errorFeedback: bounds })
    }
  }

  requestAddFeedback({ delta, components, targetContainer }) {
    if (!this.checkRelevant(targetContainer)) {
      return
    }
    const { toolkit } = this
    const partToolkit = toolkit.forDefaultPart()
    const bounds = components.map((moved) => partToolkit.bounds(moved).translate(delta))
    partToolkit.root().setState({ errorFeedback: bounds })
  }
  eraseAddFeedback({ targetContainer }) {
    if (!this.checkRelevant(targetContainer)) {
      return
    }
    this.toolkit.forDefaultPart().root().setState({ errorFeedback: null })
  }

  eraseMoveFeedback({ container }) {
    if (!this.checkRelevant(container)) {
      return
    }
    container.setState({ insertionFeedback: null })
    this.toolkit.forDefaultPart().root().setState({ moveFeedback: null, errorFeedback: null })
  }

  insertionIndex(children, location) {
    const partToolkit = this.toolkit.forDefaultPart()
    if (children.length === 0) {
      return 0
    }
    for (let i = 0; i < children.length; i += 1) {
      const child = children[i]
      const bounds = partToolkit.bounds(child)
      if (bounds.x > location.x) {
        return i
      }
    }
    return children.length
  }

  updatedChildren(children, components, before, after) {
    const withoutMoved = children.filter((child) => components.indexOf(child) < 0)
    if (after !== null && components.indexOf(after) < 0) {
      const index = withoutMoved.indexOf(after)
      return withoutMoved.slice(0, index)
        .concat(components)
        .concat(withoutMoved.slice(index))
    } else if (before !== null && components.indexOf(before) < 0) {
      const index = withoutMoved.indexOf(before)
      return withoutMoved.slice(0, index + 1)
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
    const partToolkit = this.toolkit.forDefaultPart()
    return children.reduce((map, child) => map.set(child, partToolkit.bounds(child)), new Map())
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
}
