import * as React from 'react'

interface LayerState {
  zoomLevel: number
  offsetX: number,
  offsetY: number,
  moveStartX?: number,
  moveStartY?: number,
}

interface LayerProps {

}

class Layer extends React.Component<LayerProps, LayerState> {
  constructor() {
    super()
    this.state = {
      zoomLevel: 100,
      offsetX: 0,
      offsetY: 0,
      moveStartX: null,
      moveStartY: null,
    }
  }
  setZoomLevel(zoomLevel: number) {
    if (zoomLevel < 20 || zoomLevel > 600) {
      return
    }
    this.setState({ zoomLevel })
  }
  setOffset(offsetX: number, offsetY: number) {
    this.setState({ offsetX, offsetY })
  }
  onWheel(e: React.WheelEvent<any>) {
    const { zoomLevel } = this.state
    let scrollDelta = -e.deltaY
    if (e.ctrlKey && scrollDelta % 1 !== 0) {
      scrollDelta /= 3
    } else {
      scrollDelta /= 10
    }
    this.setZoomLevel(zoomLevel + scrollDelta)
  }
  onMouseDown(e: React.MouseEvent<any>) {
    this.setState({
      moveStartX: e.clientX,
      moveStartY: e.clientY,
    })
  }
  onMouseLeave(e: React.MouseEvent<any>) {
    console.log('leave')
    this.setState({
      moveStartX: null,
      moveStartY: null,
    })
  }
  onMouseUp(e: React.MouseEvent<any>) {
    console.log('up')
    this.setState({
      moveStartX: null,
      moveStartY: null,
    })
  }
  onMouseMove(e: React.MouseEvent<any>) {
    const { offsetX, offsetY, moveStartX, moveStartY } = this.state
    if (moveStartX !== null && moveStartY !== null) {
      const newOffsetX = offsetX + (e.clientX - moveStartX)
      const newOffsetY = offsetY + (e.clientY - moveStartY)
      this.setOffset(newOffsetX, newOffsetY)
    }
  }

  buildTransform() {
    const { zoomLevel, offsetX, offsetY } = this.state
    return `translate(${offsetX}px, ${offsetY}px) scale(${zoomLevel / 100})`
  }

  getStyle() {
    return {
      width: 300,
      height: 300,
      background: 'red',
      transform: this.buildTransform(),
    }
  }

  render() {
    const { children } = this.props
    return <div />
  }
}

export default Layer