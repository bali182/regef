import React from 'react'
import { component } from '../../../src/index'

import PortView from './PortView'
import { PORT } from '../../diagram/constants'

export class _Port extends React.Component {
  render() {
    const { visible } = this.props
    return <PortView visible={visible} />
  }
}

export default component(PORT)(_Port)
