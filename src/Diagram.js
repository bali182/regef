import React, { Children } from 'react'

import ComponentRegistry from './ComponentRegistry'
import Toolkit from './Toolkit'
import bind from './bind'

class Diagram extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.registry = new ComponentRegistry()
    this.toolkit = new Toolkit(this.registry)
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
    return {
      regef: {
        registry: this.registry,
        idGenerator: this.idGenerator,
        toolkit: this.toolkit,
      },
    }
  }

  render() {
    // TODO check if it's node a root node, which is difficult because of other decorators
    return Children.only(this.props.children)
  }
}

Diagram.childContextTypes = {
  regef: () => null,
}


export default Diagram
