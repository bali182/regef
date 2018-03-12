import React from 'react'
import { root } from '../../../src/index'
import PaletteEntry from '../PaletteEntry'

const style = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: 100,
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '2px',
  fontSize: '.8em',
  whiteSpace: 'nowrap',
  userSelect: 'none',
  cursor: 'default',
  backgroundColor: '#fff',
}

@root()
export default class Palette extends React.Component {
  render() {
    return (<div style={style}>
      <PaletteEntry type="NODE" />
      <PaletteEntry type="STEP" />
      <PaletteEntry type="CONTAINER" />
    </div>)
  }
}
