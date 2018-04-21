import { DispatchingEditPolicy } from '../../src/index'
import { isContainer, isNode, isRoot, isPort, isStep } from './typeUtils'
import { DIAGRAM } from './constants'

export default class ConnectComponentsEditPolicy extends DispatchingEditPolicy {
  constructor(engine, dependencies) {
    super()
    this.engine = engine
    this.dependencies = dependencies
  }

  endConnection({ source: port, target: rawTarget }) {
    if (!isContainer(rawTarget) && !isNode(rawTarget) && !isPort(rawTarget) && !isStep(rawTarget)) {
      return
    }
    const toolkit = this.engine.toolkit.forPart(DIAGRAM)
    const target = isNode(rawTarget) || isContainer(rawTarget)
      ? rawTarget
      : toolkit.parent(rawTarget)
    const source = toolkit.parent(port)
    this.dependencies.addConnection({
      source: source.props.id,
      target: target.props.id,
    })
  }

  requestEndConnectionFeedback(intent) {
    const { source, target, location } = intent
    const toolkit = this.engine.toolkit.forPart(DIAGRAM)
    if (isRoot(target)) {
      toolkit.root().setState({
        connectionFeedback: this.connectionWithLocation(source, location),
      })
    } else if (isContainer(target) || isNode(target)) {
      toolkit.root().setState({
        connectionFeedback: this.connectionWithTarget(source, target),
      })
    } else if (isPort(target) || isStep(target)) {
      const parent = toolkit.parent(target)
      toolkit.root().setState({
        connectionFeedback: this.connectionWithTarget(source, parent),
      })
    }
  }

  eraseEndConnectionFeedback() {
    const toolkit = this.engine.toolkit.forPart(DIAGRAM)
    toolkit.root().setState({ connectionFeedback: null })
  }

  connectionWithTarget(source, target) {
    const toolkit = this.engine.toolkit.forPart(DIAGRAM)
    const containerOffset = toolkit.bounds(toolkit.root()).topLeft().negated()
    const srcBounds = toolkit.bounds(toolkit.parent(source)).translate(containerOffset)
    const tgtBounds = toolkit.bounds(target).translate(containerOffset)

    const centerToLocation = srcBounds.center().lineSegmentTo(tgtBounds.center())
    const srcBorders = [srcBounds.top(), srcBounds.right(), srcBounds.bottom(), srcBounds.left()]
    const tgtBorders = [tgtBounds.top(), tgtBounds.right(), tgtBounds.bottom(), tgtBounds.left()]

    const sourcePoint = srcBorders
      .map((border) => border.intersection(centerToLocation))
      .find((intersection) => intersection)

    const targetPoint = tgtBorders
      .map((border) => border.intersection(centerToLocation))
      .find((intersection) => intersection)

    if (sourcePoint && targetPoint) {
      return sourcePoint.lineSegmentTo(targetPoint)
    }
    return null
  }

  connectionWithLocation(source, location) {
    const toolkit = this.engine.toolkit.forPart(DIAGRAM)
    const containerOffset = toolkit.bounds(toolkit.root()).topLeft().negated()
    const parent = toolkit.parent(source)
    const bounds = toolkit.bounds(parent).translate(containerOffset)

    const centerToLocation = bounds.center().lineSegmentTo(location.translate(containerOffset))
    const borders = [bounds.top(), bounds.right(), bounds.bottom(), bounds.left()]

    const sourcePoint = borders
      .map((border) => border.intersection(centerToLocation))
      .find((intersection) => intersection)

    if (sourcePoint) {
      return sourcePoint.lineSegmentTo(location.translate(containerOffset))
    }
    return null
  }
}
