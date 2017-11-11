import Tool from './tool'
import { buildMouseDownData } from './toolUtils'

class DefaultTool extends Tool {
  constructor() {
    super()
    this.__request = null
    this.__mouseDownData = null
    this.__mouseMoveData = null
  }

  onMouseDown(e) {
    this.__mouseDownData = buildMouseDownData(e, this.getComponentRegistry())
    console.log(this.__mouseDownData)
    return null
  }

  onMouseMove(e) {
    if (this.__mouseDownData === null) {
      return null
    }
    const { clientX, clientY } = e
    const x = clientX - this.__mouseDownData.deltaX
    const y = clientY - this.__mouseDownData.deltaY
    this.__mouseMoveData = {
      x,
      y,
    }
    console.log(this.__mouseMoveData)
    return null
  }

  onMouseUp(e) {
    this.__mouseDownData = null
    this.__mouseMoveData = null
    return null
  }
}

export default DefaultTool
