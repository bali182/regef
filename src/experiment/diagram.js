import React, { Children } from 'react'

import ComponentRegistry from './registry'
import bind from '../utils/bind'
import { UNEXECUTABLE_COMMAND } from './constants'

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

    this.registry.setDiagram(this)
  }

  componentWillReceiveProps({ tool: newTool }) {
    const { tool: currentTool } = this.props
    console.log(newTool, currentTool)
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

    this.registry.setDiagram(null)
  }

  execute(command) {
    if (command !== null && command !== UNEXECUTABLE_COMMAND) {
      command()
    }
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
    this.execute(this.props.tool.onMouseMove(e))
  }

  @bind onMouseUp(e) {
    this.execute(this.props.tool.onMouseUp(e))
  }

  getChildContext() {
    return { registry: this.registry }
  }

  render() {
    return Children.only(this.props.children)
  }
}

Diagram.childContextTypes = {
  registry: () => null,
}


export default Diagram
