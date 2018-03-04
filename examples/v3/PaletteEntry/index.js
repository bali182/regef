import React from 'react'
import { creator } from '../../../src/index'
import { paletteEntryStyle } from './styles'

@creator()
export default class PaletteEntry extends React.Component {
  render() {
    const { type, regef, ...rest } = this.props
    return (<div {...rest} style={paletteEntryStyle}>
      <span>{type}</span>
    </div>)
  }
}
