import React from 'react'
import node from '../../src/experiment/node'

import MyNodeEditPolicy from './MyNodeEditPolicy'

const nodeStyle = {
  display: 'inline-block',
  borderRadius: 4,
  backgroundColor: 'red',
  padding: 10,
  userSelect: 'none',
  cursor: 'default',
}

@node(new MyNodeEditPolicy())
export class MyNode extends React.Component {
  render() {
    const { regef } = this.props
    return (<div style={nodeStyle} {...regef}>
      {this.props.text}
    </div>)
  }
}

const compositeNodeStyle = {
  display: 'inline-block',
  borderRadius: 4,
  backgroundColor: 'green',
  padding: 10,
  userSelect: 'none',
  cursor: 'default',
}

// eslint-disable-next-line react/no-multi-comp
@node(new MyNodeEditPolicy())
export class MyCompositeNode extends React.Component {
  render() {
    const { regef, children } = this.props
    return (<div style={compositeNodeStyle} {...regef}>
      {children}
    </div>)
  }
}

export default MyNode
