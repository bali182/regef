import { EndConnectionIntent } from '../../src/index'
import { isContainer, isNode, isRoot, isPort, isStep } from './typeUtils'
import { DIAGRAM } from './constants'
import { BaseSampleEditPolicy } from './BaseSampleEditPolicy'
import { ReactCompWithId } from '../types'
import { LineSegmentLike } from 'regef-geometry'

export default class ConnectComponentsEditPolicy extends BaseSampleEditPolicy {
  endConnection({ source: port, target: rawTarget }: EndConnectionIntent) {
    if (!isContainer(rawTarget) && !isNode(rawTarget) && !isPort(rawTarget) && !isStep(rawTarget)) {
      return
    }
    const toolkit = this.engine.toolkit.forPart(DIAGRAM)
    const target =
      isNode(rawTarget) || isContainer(rawTarget) ? rawTarget : toolkit.parent(rawTarget)
    const source = toolkit.parent(port)
    this.dependencies.addConnection({
      source: (source as ReactCompWithId).props.id,
      target: (target as ReactCompWithId).props.id,
    })
  }

  requestEndConnectionFeedback(intent: EndConnectionIntent) {
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
    const containerOffset = this.containerOffset
    const srcBounds = toolkit.bounds(toolkit.parent(source)).translate(containerOffset)
    const tgtBounds = toolkit.bounds(target).translate(containerOffset)

    // TODO mistake in typings of regef-geometry
    const centerToLocation = (srcBounds
      .center()
      .lineSegmentTo(tgtBounds.center()) as any) as LineSegmentLike
    const srcBorders = [srcBounds.top(), srcBounds.right(), srcBounds.bottom(), srcBounds.left()]
    const tgtBorders = [tgtBounds.top(), tgtBounds.right(), tgtBounds.bottom(), tgtBounds.left()]

    const sourcePoint = srcBorders
      .map((border) => border.intersection(centerToLocation))
      .find((intersection) => Boolean(intersection))

    const targetPoint = tgtBorders
      .map((border) => border.intersection(centerToLocation))
      .find((intersection) => Boolean(intersection))

    if (sourcePoint && targetPoint) {
      return sourcePoint.lineSegmentTo(targetPoint)
    }
    return null
  }

  connectionWithLocation(source, location) {
    const toolkit = this.engine.toolkit.forPart(DIAGRAM)
    const containerOffset = this.containerOffset
    const parent = toolkit.parent(source)
    const bounds = toolkit.bounds(parent).translate(containerOffset)

    // TODO mistake in typings of regef-geometry
    const centerToLocation = (bounds
      .center()
      .lineSegmentTo(location.translate(containerOffset)) as any) as LineSegmentLike
    const borders = [bounds.top(), bounds.right(), bounds.bottom(), bounds.left()]

    const sourcePoint = borders
      .map((border) => border.intersection(centerToLocation))
      .find((intersection) => Boolean(intersection))

    if (sourcePoint) {
      return sourcePoint.lineSegmentTo(location.translate(containerOffset))
    }
    return null
  }
}
