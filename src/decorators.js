import { NODE_TYPE, PORT_TYPE, ROOT_TYPE, CONNECTION_TYPE } from './constants'
import createDecorator from './createDecorator'

/* eslint-disable no-param-reassign */
const defaultActivate = (component) => {
  component.registry.register(component.id, component)
  component.policy.component = component.childRef
  component.policy.toolkit = component.toolkit
}

const defaultDecativate = (component) => {
  component.registry.unregister(component.id)
  component.policy.component = null
  component.policy.toolkit = null
}
/* eslint-enable no-param-reassign */

const rootActivate = (component) => {
  component.registry.setRoot(component)
  defaultActivate(component)
}

const rootDeactivate = (component) => {
  component.registry.setRoot(null)
  defaultDecativate(component)
}

export const node = createDecorator({
  type: NODE_TYPE,
  activate: defaultActivate,
  deactivate: defaultDecativate,
})

export const port = createDecorator({
  type: PORT_TYPE,
  activate: defaultActivate,
  deactivate: defaultDecativate,
})

export const root = createDecorator({
  type: ROOT_TYPE,
  activate: rootActivate,
  deactivate: rootDeactivate,
})

export const connection = createDecorator({
  type: CONNECTION_TYPE,
  activate: defaultActivate,
  deactivate: defaultDecativate,
})
