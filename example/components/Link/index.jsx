import React from 'react'
import LinkView from './LinkView'

// eslint-disable-next-line
export default class Link extends React.Component {
  render() {
    return <LinkView {...this.props} />
  }
}
