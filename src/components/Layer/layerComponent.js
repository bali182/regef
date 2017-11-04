import React from 'react'

class Layer extends React.Component {
  render() {
    const { ChildComponent, children, ...props } = this.props
    return (<ChildComponent {...props}>
      {children}
    </ChildComponent>)
  }
}

export default Layer
