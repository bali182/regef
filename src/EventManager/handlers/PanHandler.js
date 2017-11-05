import Handler from './Handler'
import { getComponent } from '../getComponent'

class PanHandler extends Handler {
  constructor(registry) {
    super(registry)
    this.deltaX = null
    this.deltaY = null
    this.diagramComponent = null
  }
  onStart(e) {
    const { component: c } = getComponent(e, this.registry)
    if (c) {
      const { clientX, clientY } = e
      const offsetX = c.props.config.getOffsetX(c._childRef)
      const offsetY = c.props.config.getOffsetY(c._childRef)
      this.deltaX = clientX - offsetX
      this.deltaY = clientY - offsetY
    }
    this.diagramComponent = c
  }
  onChange(e) {
    const { deltaX, deltaY, diagramComponent: c } = this
    if (deltaX !== null && deltaY !== null && c !== null) {
      const { clientX, clientY } = e
      const x = clientX - deltaX
      const y = clientY - deltaY
      c.props.config.setOffset(c._childRef, { x, y })
    }
  }
  onEnd(e) {
    this.onChange(e)
    this.deltaX = null
    this.deltaY = null
  }
}

export default PanHandler
