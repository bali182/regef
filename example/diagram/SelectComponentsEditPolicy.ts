import { SelectionIntent } from '../../src/index'
import { DIAGRAM } from './constants'
import { BaseSampleEditPolicy } from './BaseSampleEditPolicy'
import { ReactCompWithId } from '../types'

export default class SelectComponentsEditPolicy extends BaseSampleEditPolicy {
  select({ selection }: SelectionIntent) {
    const ids = selection.map((component: ReactCompWithId) => component.props.id)
    this.dependencies.setSelection({ selection: ids })
  }

  requestSelectFeedback({ bounds }: SelectionIntent) {
    const toolkit = this.engine.toolkit.forPart(DIAGRAM)
    const translation = this.containerOffset
    toolkit.root().setState({ selectionFeedback: bounds.translate(translation) })
  }

  eraseSelectFeedback() {
    const toolkit = this.engine.toolkit.forPart(DIAGRAM)
    toolkit.root().setState({ selectionFeedback: null })
  }
}
