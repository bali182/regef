import React, { Children, cloneElement } from 'react'

import ComponentRegistry from './ComponentRegistry'
import bind from './utils/bind'
import { REGEF_TYPE } from './constants'

class Diagram extends React.Component {
  constructor() {
    super()
    this.registry = new ComponentRegistry()
  }

  componentDidMount() {
    const { tool } = this.props
    if (tool) {
      tool.setComponentRegistry(this.registry)
    }

    document.addEventListener('mousedown', this.onMouseDown)
    document.addEventListener('mousemove', this.onMouseMove)
    document.addEventListener('mouseup', this.onMouseUp)
    document.addEventListener('keydown', this.onKeyDown)
    document.addEventListener('keyup', this.onKeyUp)
  }

  componentWillReceiveProps({ tool: newTool }) {
    const { tool: currentTool } = this.props
    if (newTool !== currentTool) {
      newTool.setComponentRegistry(this.registry)
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onMouseDown)
    document.removeEventListener('mousemove', this.onMouseMove)
    document.removeEventListener('mouseup', this.onMouseUp)
    document.removeEventListener('keydown', this.onKeyDown)
    document.removeEventListener('keyup', this.onKeyUp)

    if (this.registry.getRoot() !== null) {
      this.registry.setRoot(null)
    }
  }


  @bind saveRootRef(ref) {
    this.registry.setRoot(ref)
  }

  @bind onKeyDown(e) {
    if (this.props.tool) {
      this.props.tool.onKeyDown(e)
    }
  }

  @bind onKeyUp(e) {
    if (this.props.tool) {
      this.props.tool.onKeyUp(e)
    }
  }

  @bind onMouseDown(e) {
    if (this.props.tool) {
      this.props.tool.onMouseDown(e)
    }
  }

  @bind onMouseMove(e) {
    if (this.props.tool) {
      this.props.tool.onMouseMove(e)
    }
  }

  @bind onMouseUp(e) {
    if (this.props.tool) {
      this.props.tool.onMouseUp(e)
    }
  }

  getChildContext() {
    return { registry: this.registry }
  }

  render() {
    const child = Children.only(this.props.children)
    // TODO better check if it's node
    if (!child || typeof child !== 'object' || !child.type) {
      throw new Error('Diagram root element must be a valid node!')
    }
    return cloneElement(child, { ref: this.saveRootRef })
  }
}

Diagram.childContextTypes = {
  registry: () => null,
}


export default Diagram
