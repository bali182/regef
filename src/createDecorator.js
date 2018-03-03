import React from 'react'

import { watchRegister } from './watchers'

const defaultMergeProps = (regef) => ({ regef })

const toolkitResolver = (component, registry, toolkit) => () =>
  watchRegister(registry, component).then(() => toolkit)

const createDecorator = ({ type, activate, deactivate }) =>
  (mergeProps = defaultMergeProps) =>
    (Wrapped) => {
      class DecoratedComponent extends React.Component {
        constructor(props, context) {
          super(props, context)
          const { engine } = context.regef
          this.userComponent = null
          this.type = type
          this.childProps = { toolkit: toolkitResolver(this, engine.registry, engine.toolkit) }
          // binding methods
          this.setUserComponent = this.setUserComponent.bind(this)
        }
        setUserComponent(ref) {
          this.userComponent = ref
        }
        componentDidMount() {
          activate(this, this.context.regef.engine)
        }
        componentWillUnmount() {
          deactivate(this, this.context.regef.engine)
        }
        render() {
          const { children, ...rest } = this.props
          const regefProps = mergeProps(this.childProps)
          return (<Wrapped {...rest} ref={this.setUserComponent} {...regefProps}>
            {children}
          </Wrapped>)
        }
      }

      DecoratedComponent.contextTypes = {
        regef: () => null,
      }

      return DecoratedComponent
    }

export default createDecorator
