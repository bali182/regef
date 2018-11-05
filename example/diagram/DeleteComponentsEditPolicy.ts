import { BaseSampleEditPolicy } from './BaseSampleEditPolicy'

export default class DeleteComponentsEditPolicy extends BaseSampleEditPolicy {
  delete({ selection }) {
    const ids = selection.map((component) => component.props.id)
    ids.forEach((id) => this.dependencies.deleteComponent({ id }))
  }
}
