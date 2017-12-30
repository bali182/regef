import React from 'react'

import { DATA_ID } from './constants'
import bind from './bind'
import EditPolicy from './EditPolicy'

const defaultMergeProps = (regef) => ({ regef })

const createDecorator = ({ type, activate, deactivate }) =>
  (Policy = EditPolicy, mergeProps = defaultMergeProps) =>
    (Wrapped) => {
      class DecoratedComponent extends React.Component {
        constructor(props, context) {
          super(props, context)
          const { registry, idGenerator, toolkit } = context.regef
          this.registry = registry
          this.toolkit = toolkit
          this.policy = new Policy()
          this.id = idGenerator.next()
          this.childRef = null
          this.type = type
          this.childProps = {
            toolkit,
            domAttributes: {
              [DATA_ID]: this.id,
            },
          }
        }

        getUserComponent() {
          return this.childRef
        }

        @bind saveChildRef(ref) {
          this.childRef = ref
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
          return (<Wrapped {...rest} ref={this.saveChildRef} {...regefProps}>
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
