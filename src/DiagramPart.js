import { Children, PureComponent } from 'react'
import { instanceOf, string, shape, symbol, oneOfType } from 'prop-types'
import Engine, { DEFAULT_PART_ID } from './Engine'

export default class DiagramPart extends PureComponent {
  componentDidMount() {
    const { engine } = this.props
    if (!engine.eventManager.hooked) {
      engine.eventManager.hookListeners()
    }
  }
  componentWillUnmount() {
    const { id, engine } = this.props
    engine.removePart(id)
    if (engine.parts.length === 0) {
      engine.eventManager.unhookListeners()
    }
  }
  getChildContext() {
    return { regef: { engine: this.props.engine, id: this.props.id } }
  }
  render() {
    // TODO check type (no solution yet)
    return Children.only(this.props.children)
  }
}

DiagramPart.childContextTypes = {
  regef: shape({
    engine: instanceOf(Engine).isRequired,
    id: oneOfType([string, symbol]).isRequired,
  }),
}

DiagramPart.propTypes = {
  engine: instanceOf(Engine).isRequired,
  id: oneOfType([string, symbol]),
}

DiagramPart.defaultProps = {
  id: DEFAULT_PART_ID,
}
