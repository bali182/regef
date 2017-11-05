import React from 'react'
import { object } from 'prop-types'

import { LAYER_TYPE } from '../constants'
import createDataIdUpdater from '../utils/updateDataId'

class Layer extends React.Component {
  constructor() {
    super()
    this._events = {}
    this.updateDataId = createDataIdUpdater(
      this,
      () => this._events,
      (_events) => {
        this._events = _events
      },
    )
  }

  componentDidMount() {
    const { diagramManager } = this.context
    diagramManager.register(this.props.config.getId(this), LAYER_TYPE, this)
  }

  componentWillUnmount() {
    const { diagramManager } = this.context
    diagramManager.unregister(this.props.config.getId(this), LAYER_TYPE)
  }

  render() {
    const { ChildComponent, children, config, ...props } = this.props
    const regef = this.updateDataId(config.getId(this))
    return (<ChildComponent {...props} regef={regef}>
      {children}
    </ChildComponent >)
  }
}

Layer.contextTypes = {
  diagramManager: object,
}

export default Layer