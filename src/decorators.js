import { NODE_TYPE, PORT_TYPE, ROOT_TYPE, CONNECTION_TYPE } from './constants'
import createDecorator from './createDecorator'
import { fromComponent } from './ComponentWrapper'

const defaultActivate = (component, engine) => {
  const wrapper = fromComponent(component)
  engine.registry.register(wrapper)
}

const defaultDecativate = (component, engine) => {
  engine.registry.unregister(component)
}

const rootActivate = (component, engine) => {
  defaultActivate(component, engine)
  engine.registry.setRoot(engine.registry.get(component))
}

const rootDeactivate = (component, engine) => {
  defaultDecativate(component, engine)
  engine.registry.setRoot(null)
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
