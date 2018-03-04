import { Children, PureComponent } from 'react'
import { instanceOf, string, shape } from 'prop-types'
import Engine from './Engine'

export default class Attachment extends PureComponent {
  getChildContext() {
    return { regef: { engine: this.props.engine, id: this.props.id } }
  }
  render() {
    // TODO check type (no solution yet)
    return Children.only(this.props.children)
  }
}

Attachment.childContextTypes = {
  regef: shape({
    engine: instanceOf(Engine).isRequired,
    id: string.isRequired,
  }),
}

Attachment.propTypes = {
  engine: instanceOf(Engine).isRequired,
  id: string.isRequired,
}
