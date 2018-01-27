import React from 'react'
import LinkView from './LinkView'

export default class Link extends React.Component {
  render() {
    return <LinkView {...this.props} />
  }
}
