import { DispatchingEditPolicy } from '../../index'

export default class DeleteComponentsEditPolicy extends DispatchingEditPolicy {
  constructor(engine, dependencies) {
    super()
    this.engine = engine
    this.dependencies = dependencies
  }

  delete({ selection }) {
    const ids = selection.map((component) => component.props.id)
    ids.forEach((id) => this.dependencies.deleteComponent({ id }))
  }
}
