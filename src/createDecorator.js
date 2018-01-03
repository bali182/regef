import React from 'react'

import bind from './bind'
import EditPolicy from './EditPolicy'
import { watchRegister } from './watchers'

const defaultMergeProps = (regef) => ({ regef })

const toolkitResolver = (component, registry, toolkit) => () =>
  watchRegister(registry, component).then(() => toolkit)

const createDecorator = ({ type, activate, deactivate }) =>
  (Policy = EditPolicy, mergeProps = defaultMergeProps) =>
    (Wrapped) => {
      class DecoratedComponent extends React.Component {
        constructor(props, context) {
          super(props, context)
          const { registry, toolkit } = context.regef
          this.registry = registry
          this.toolkit = toolkit
          this.policy = new Policy()
          this.userComponent = null
          this.type = type
          this.childProps = { toolkit: toolkitResolver(this, registry, toolkit) }
        }

        @bind setUserComponent(ref) {
          this.userComponent = ref
        }

        componentDidMount() {
          activate(this)
        }

        componentWillUnmount() {
          deactivate(this)
        }

        getEditPolicy() {
          return this.policy
        }

        getCommand(request) {
          return this.policy.getCommand(request)
        }

        requestFeedback(request) {
          return this.policy.requestFeedback(request)
        }

        eraseFeedback(request) {
          return this.policy.eraseFeedback(request)
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
