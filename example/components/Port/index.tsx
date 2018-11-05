import React from 'react'
import { component, RegefComponentProps } from '../../../src/index'

import PortView, { PortViewProps } from './PortView'
import { PORT } from '../../diagram/constants'

type PortProps = PortViewProps & RegefComponentProps

export class _Port extends React.Component<PortProps> {
  render() {
    const { visible } = this.props
    return <PortView visible={visible} />
  }
}

export const Port = component<PortProps>(PORT)(_Port)
