import { NODE_TYPE, PORT_TYPE, ROOT_TYPE, CONNECTION_TYPE } from './constants'
import createDecorator from './createDecorator'
import { fromComponent } from './ComponentWrapper'

/* eslint-disable no-param-reassign */
const defaultActivate = (component) => {
  const wrapper = fromComponent(component)
  component.registry.register(wrapper)
  component.editPolicy.component = component.userComponent
  component.editPolicy.toolkit = component.toolkit
}

const defaultDecativate = (component) => {
  component.registry.unregister(component)
  component.editPolicy.component = null
  component.editPolicy.toolkit = null
}

const rootActivate = (component) => {
  defaultActivate(component)
  component.registry.setRoot(component.registry.get(component))
}

const rootDeactivate = (component) => {
  defaultDecativate(component)
  component.registry.setRoot(null)
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
