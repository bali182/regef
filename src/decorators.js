import { NODE_TYPE, PORT_TYPE, ROOT_TYPE, CONNECTION_TYPE } from './constants'
import DiagramPartWrapper from './DiagramPartWrapper'
import createDecorator from './createDecorator'
import { fromComponent } from './ComponentWrapper'
import { watchRegister } from './watchers'

const registryFrom = ({ engine, id }) => (engine.__partsMap().has(id)
  ? engine.part(id).registry
  : null)
const toolkitFrom = ({ engine, id }) => (engine.__partsMap().has(id)
  ? engine.part(id).toolkit
  : null)
const ensurePartRegistered = ({ engine, id }) => {
  const parts = engine.__partsMap()
  if (!parts.has(id)) {
    parts.set(id, new DiagramPartWrapper(id, engine))
  }
}

function defaultToolkitResolver(component, context) {
  return () => watchRegister(registryFrom(context), component).then(() => toolkitFrom(context))
}

const defaultActivate = (component, context) => {
  ensurePartRegistered(context)
  registryFrom(context).register(fromComponent(component))
}

const defaultDecativate = (component, context) => {
  const registry = registryFrom(context)
  if (registry) {
    registry.unregister(component)
  }
}

const rootActivate = (component, context) => {
  defaultActivate(component, context)
  const registry = registryFrom(context)
  registry.setRoot(registry.get(component))
}

const rootDeactivate = (component, context) => {
  defaultDecativate(component, context)
  const registry = registryFrom(context)
  if (registry) {
    registry.setRoot(null)
  }
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
