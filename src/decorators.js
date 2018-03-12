import { NODE_TYPE, PORT_TYPE, ROOT_TYPE, CONNECTION_TYPE, CREATOR_TYPE } from './constants'
import createDecorator from './createDecorator'
import { fromComponent } from './ComponentWrapper'
import { watchRegister } from './watchers'

const registryFrom = ({ engine, id }) =>
  (id === undefined ? engine.registry : engine.part(id).registry)

const toolkitFrom = ({ engine, id }) =>
  (id === undefined ? engine.toolkit : engine.part(id).toolkit)

function defaultToolkitResolver(component, context) {
  return () => watchRegister(registryFrom(context), component).then(() => toolkitFrom(context))
}

const defaultActivate = (component, context) => {
  registryFrom(context).register(fromComponent(component))
}

const defaultDecativate = (component, context) => {
  registryFrom(context).unregister(component)
}

const rootActivate = (component, context) => {
  defaultActivate(component, context)
  const registry = registryFrom(context)
  registry.setRoot(registry.get(component))
}

const rootDeactivate = (component, context) => {
  defaultDecativate(component, context)
  registryFrom(context).setRoot(null)
}

export const node = createDecorator({
  type: NODE_TYPE,
  activate: defaultActivate,
  deactivate: defaultDecativate,
  toolkitResolver: defaultToolkitResolver,
})

export const port = createDecorator({
  type: PORT_TYPE,
  activate: defaultActivate,
  deactivate: defaultDecativate,
  toolkitResolver: defaultToolkitResolver,
})

export const root = createDecorator({
  type: ROOT_TYPE,
  activate: rootActivate,
  deactivate: rootDeactivate,
  toolkitResolver: defaultToolkitResolver,
})

export const connection = createDecorator({
  type: CONNECTION_TYPE,
  activate: defaultActivate,
  deactivate: defaultDecativate,
  toolkitResolver: defaultToolkitResolver,
})

export const creator = createDecorator({
  type: CREATOR_TYPE,
  activate: defaultActivate,
  deactivate: defaultDecativate,
  toolkitResolver: defaultToolkitResolver,
})
