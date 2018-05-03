import React, { PureComponent } from 'react'
import { withRegefContext } from './RegefContext'
import { REGEF_PROP_KEY } from './constants'

function createDecorator({ type, activate, deactivate, toolkitResolver }) {
  return () => (Wrapped) => {
    class DecoratedComponent extends PureComponent {
      constructor(props) {
        super(props)
        const regef = props[REGEF_PROP_KEY]
        this.partId = regef
        this.userComponent = null
        this.type = type
        this.childProps = { toolkit: toolkitResolver(this, regef) }
        // binding methods
        this.setUserComponent = this.setUserComponent.bind(this)
      }
      setUserComponent(ref) {
        this.userComponent = ref
      }
      componentDidMount() {
        activate(this, this.props[REGEF_PROP_KEY])
      }
      componentWillUnmount() {
        deactivate(this, this.props[REGEF_PROP_KEY])
      }
      render() {
        const { children, ...rest } = this.props
        return (<Wrapped {...rest} ref={this.setUserComponent} regef={this.childProps}>
          {children}
        </Wrapped>)
      }
    }
    return withRegefContext(DecoratedComponent)
  }
}

export default createDecorator
