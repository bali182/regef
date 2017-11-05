import React from 'react'
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

  render() {
    const { ChildComponent, children, config, ...props } = this.props
    const regef = this.updateDataId(config.getId(this))
    return (<ChildComponent {...props} regef={regef}>
      {children}
    </ChildComponent >)
  }
}

export default Layer
