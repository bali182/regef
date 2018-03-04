import React, { PureComponent } from 'react'

function createDecorator({ type, activate, deactivate, toolkitResolver }) {
  return () => (Wrapped) => {
    class DecoratedComponent extends PureComponent {
      constructor(props, context) {
        super(props, context)
        const { regef: { id } } = this.context
        this.attachmentId = id
        this.userComponent = null
        this.type = type
        this.childProps = { toolkit: toolkitResolver(this, context.regef) }
        // binding methods
        this.setUserComponent = this.setUserComponent.bind(this)
      }
      setUserComponent(ref) {
        this.userComponent = ref
      }
      componentDidMount() {
        activate(this, this.context.regef)
      }
      componentWillUnmount() {
        deactivate(this, this.context.regef)
      }
      render() {
        const { children, ...rest } = this.props
        return (<Wrapped {...rest} ref={this.setUserComponent} regef={this.childProps}>
          {children}
        </Wrapped>)
      }
    }

    DecoratedComponent.contextTypes = {
      regef: () => null,
    }

    return DecoratedComponent
  }
}

export default createDecorator
