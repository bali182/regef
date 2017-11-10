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
    document.addEventListener('mousedown', this.onMouseDown)
    document.addEventListener('mousemove', this.onMouseMove)
    document.addEventListener('mouseup', this.onMouseUp)

    this.registry.setDiagram(this)
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

    this.registry.setDiagram(null)
  }

  execute(command) {
    if (command !== null && command !== UNEXECUTABLE_COMMAND) {
      command()
    }
  }

  @bind onMouseDown(e) {
    if (this.props.tool) {
      this.execute(this.props.tool.onMouseDown(e))
    }
  }

  @bind onMouseMove(e) {
    if (this.props.tool) {
      this.execute(this.props.tool.onMouseMove(e))
    }
  }

  @bind onMouseUp(e) {
    if (this.props.tool) {
      this.execute(this.props.tool.onMouseUp(e))
    }
  }

  render() {
    return Children.only(this.props.children)
  }
}

export default Diagram
