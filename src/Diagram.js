import React, { Children } from 'react'

import ComponentRegistry from './ComponentRegistry'
import Toolkit from './Toolkit'
import bind from './bind'

export default class Diagram extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.registry = new ComponentRegistry()
    this.toolkit = new Toolkit(this.registry)
  }

  componentDidMount() {
    const { engine } = this.props
    if (engine) {
      engine.setToolkit(this.toolkit)
      engine.setComponentRegistry(this.registry)
    }

    document.addEventListener('mousedown', this.onMouseDown)
    document.addEventListener('mousemove', this.onMouseMove)
    document.addEventListener('mouseup', this.onMouseUp)
    document.addEventListener('keydown', this.onKeyDown)
    document.addEventListener('keyup', this.onKeyUp)
  }

  componentWillReceiveProps({ engine: newEngine }) {
    const { engine: currentEngine } = this.props
    if (newEngine !== currentEngine) {
      newEngine.setToolkit(this.toolkit)
      newEngine.setComponentRegistry(this.registry)
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onMouseDown)
    document.removeEventListener('mousemove', this.onMouseMove)
    document.removeEventListener('mouseup', this.onMouseUp)
    document.removeEventListener('keydown', this.onKeyDown)
    document.removeEventListener('keyup', this.onKeyUp)

    if (this.registry.root !== null) {
      this.registry.setRoot(null)
    }
  }

  @bind onKeyDown(e) {
    this.props.engine.onKeyDown(e)
  }

  @bind onKeyUp(e) {
    this.props.engine.onKeyUp(e)
  }

  @bind onMouseDown(e) {
    this.props.engine.onMouseDown(e)
  }

  @bind onMouseMove(e) {
    this.props.engine.onMouseMove(e)
  }

  @bind onMouseUp(e) {
    this.props.engine.onMouseUp(e)
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
