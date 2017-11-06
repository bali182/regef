import Handler from './Handler'
import { getComponent } from '../getComponent'

class PanHandler extends Handler {
  constructor(registry) {
    super(registry)
    this.deltaX = null
    this.deltaY = null
    this.component = null
  }
  onStart(e) {
    const componentData = getComponent(e, this.registry)
    if (componentData !== null && componentData.component) {
      const { component } = componentData
      const { clientX, clientY } = e
      const offsetX = component.props.config.getOffsetX(component._childRef)
      const offsetY = component.props.config.getOffsetY(component._childRef)
      this.deltaX = clientX - offsetX
      this.deltaY = clientY - offsetY
      this.component = component
    }
  }
  onChange(e) {
    const { deltaX, deltaY, component } = this
    if (component !== null && deltaX !== null && deltaY !== null) {
      const { clientX, clientY } = e
      const x = clientX - deltaX
      const y = clientY - deltaY
      component.props.config.setOffset(component._childRef, { x, y })
    }
  }
  onEnd(e) {
    this.onChange(e)
    this.deltaX = null
    this.deltaY = null
  }
}

export default PanHandler
