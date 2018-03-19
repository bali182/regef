import { DispatchingEditPolicy } from '../../src/index'
import { isContainer } from './typeUtils'

export default class AddContainerChildrenEditPolicy extends DispatchingEditPolicy {
  constructor(engine, dependencies) {
    super()
    this.engine = engine
    this.dependencies = dependencies
  }

  add({ components, location, targetContainer }) {
    if (!isContainer(targetContainer)) {
      return
    }
    const toolkit = this.engine.toolkit.forDefaultPart()
    const children = toolkit.children(targetContainer)
    if (components.some((comp) => children.indexOf(comp) >= 0 || !comp.props.step)) {
      return
    }
    const index = this.insertionIndex(children, location)
    const ids = components.map((child) => child.props.id)
    this.dependencies.addChildren({
      containerId: targetContainer.props.id,
      children: ids,
      index,
    })
  }

  requestAddFeedback({ delta, components, location, targetContainer }) {
    if (!isContainer(targetContainer)) {
      return
    }
    const toolkit = this.engine.toolkit.forDefaultPart()
    const children = toolkit.children(targetContainer)
    const bounds = components.map((moved) => toolkit.bounds(moved).translate(delta))
    if (components.some((child) => children.indexOf(child) >= 0 || !child.props.step)) {
      toolkit.root().setState({ errorFeedback: bounds })
    } else {
      toolkit.root().setState({ moveFeedback: bounds })
      targetContainer.setState({ insertionFeedback: this.insertionIndex(children, location) })
    }
  }
  eraseAddFeedback({ targetContainer }) {
    if (!isContainer(targetContainer)) {
      return
    }
    const toolkit = this.engine.toolkit.forDefaultPart()
    targetContainer.setState({ insertionFeedback: null })
    toolkit.root().setState({ errorFeedback: null, moveFeedback: null })
  }

  insertionIndex(children, location) {
    const toolkit = this.engine.toolkit.forDefaultPart()
    if (children.length === 0) {
      return 0
    }
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
