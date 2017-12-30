import React from 'react'
import { connect } from 'react-redux'
import { port } from '../../src'

import { addChild, setPosition } from './actions'

const portStyle = {
  display: 'flex',
  flexDirection: 'center',
  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  cursor: 'default',
  width: 18,
  height: 18,
  userSelect: 'none',
  MozUserSelect: '-moz-none',
  position: 'absolute',
  backgroundColor: 'white',
  border: '1px solid darkgray',
  textAlign: 'center',
  right: -10,
  top: '50%',
  transform: 'translateY(-50%)',
}

@connect((state, { id }) => ({ model: state[id] }), { addChild, setPosition })
@port()
class Port extends React.Component {
  render() {
    const { regef } = this.props
    return (<div style={portStyle} {...regef.domAttributes}>
      +
    </div>)
  }
}

export default Port
