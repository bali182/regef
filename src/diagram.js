import React, { Children, cloneElement } from 'react'

import ComponentRegistry from './registry'
import bind from './utils/bind'
import { REGEF_TYPE } from './constants'

const isNodeType = (child) => child
  && typeof child === 'object'
  && typeof child.type === 'function'
  && child.type[REGEF_TYPE] === true

class Diagram extends React.Component {
  constructor() {
    super()
    this.registry = new ComponentRegistry()
    this.command = null
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

    // this.registry.setDiagram(null)
  }

  execute(command) {
    if (command !== null) {
      command()
    }
  }

  @bind saveRootRef(ref) {
    this.registry.setRoot(ref)
  }

  @bind onKeyDown(e) {
    this.execute(this.props.tool.onKeyDown(e))
  }

  @bind onKeyUp(e) {
    this.execute(this.props.tool.onKeyUp(e))
  }

  @bind onMouseDown(e) {
    this.execute(this.props.tool.onMouseDown(e))
  }

  @bind onMouseMove(e) {
    this.command = this.props.tool.onMouseMove(e)
  }

  @bind onMouseUp(e) {
    this.execute(this.props.tool.onMouseUp(e))
    this.execute(this.command)
  }

  getChildContext() {
    return { registry: this.registry }
  }

  render() {
    const child = Children.only(this.props.children)
    if (!isNodeType(child)) {
      throw new Error('Diagram root element must be a valid node!')
    }
    return cloneElement(child, { ref: this.saveRootRef })
  }
}

Diagram.childContextTypes = {
  registry: () => null,
}


export default Diagram
