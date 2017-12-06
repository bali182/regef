import { NODE_TYPE, PORT_TYPE, ROOT_TYPE } from './constants'
import createDecorator from './createDecorator'

const defaultActivate = (component) => {
  component.registry.register(component.id, component)
  component.policies.forEach((policy) => policy.setComponent(component.childRef))
}

const defaultDecativate = (component) => {
  component.registry.unregister(component.id)
  component.policies.forEach((policy) => policy.setComponent(null))
}

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
