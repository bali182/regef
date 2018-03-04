import { Children, PureComponent } from 'react'
import { instanceOf, shape } from 'prop-types'
import Engine from './Engine'

export default class Diagram extends PureComponent {
  constructor() {
    super()
    // binding methods
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.onMouseDown)
    document.addEventListener('mousemove', this.onMouseMove)
    document.addEventListener('mouseup', this.onMouseUp)
    document.addEventListener('keydown', this.onKeyDown)
    document.addEventListener('keyup', this.onKeyUp)
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onMouseDown)
    document.removeEventListener('mousemove', this.onMouseMove)
    document.removeEventListener('mouseup', this.onMouseUp)
    document.removeEventListener('keydown', this.onKeyDown)
    document.removeEventListener('keyup', this.onKeyUp)
  }
  onKeyDown(e) {
    this.props.engine.onKeyDown(e)
  }
  onKeyUp(e) {
    this.props.engine.onKeyUp(e)
  }
  onMouseDown(e) {
    this.props.engine.onMouseDown(e)
  }
  onMouseMove(e) {
    this.props.engine.onMouseMove(e)
  }
  onMouseUp(e) {
    this.props.engine.onMouseUp(e)
  }
  getChildContext() {
    return { regef: { engine: this.props.engine } }
  }
  render() {
    // TODO check if it's node a root node, which is difficult because of other decorators
    return Children.only(this.props.children)
  }
}

Diagram.propTypes = {
  engine: instanceOf(Engine).isRequired,
}

Diagram.childContextTypes = {
  regef: shape({
    engine: instanceOf(Engine).isRequired,
  }),
}
