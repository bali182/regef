import React, { PureComponent } from 'react'
import { withRegefContext } from './RegefContext'
import { REGEF_PROP_KEY } from './constants'
import { fromComponent } from './ComponentWrapper'
import { watchRegister } from './watchers'
import DiagramPartWrapper from './DiagramPartWrapper'

const registryFrom = ({ engine, id }) => {
  if (engine.__partsMap().has(id)) {
    return engine.part(id).registry
  }
  return null
}

const toolkitFrom = ({ engine, id }) => (engine.__partsMap().has(id) ? engine.toolkit : null)

const ensurePartRegistered = ({ engine, id }) => {
  const parts = engine.__partsMap()
  if (!parts.has(id)) {
    parts.set(id, new DiagramPartWrapper(id, engine))
  }
}

function toolkitResolver(comp, context) {
  ensurePartRegistered(context)
  return () => watchRegister(registryFrom(context), comp).then(() => toolkitFrom(context))
}

const defaultActivate = (comp, context) => {
  ensurePartRegistered(context)
  registryFrom(context).register(fromComponent(comp))
}

const defaultDecativate = (comp, context) => {
  const registry = registryFrom(context)
  if (registry) {
    registry.unregister(comp)
  }
}

const rootActivate = (comp, context) => {
  defaultActivate(comp, context)
  const registry = registryFrom(context)
  registry.setRoot(registry.get(comp))
}

const rootDeactivate = (comp, context) => {
  defaultDecativate(comp, context)
  const registry = registryFrom(context)
  if (registry) {
    registry.setRoot(null)
  }
}

const getEngine = (comp) => comp.props[REGEF_PROP_KEY].engine

export default function component(type) {
  return function DecoratedDiagramComponent(Wrapped) {
    class DecoratedComponent extends PureComponent {
      constructor(props) {
        super(props)
        const regef = props[REGEF_PROP_KEY]
        this.userComponent = null
        this.type = type
        this.childProps = { toolkit: toolkitResolver(this, regef) }
        // binding methods
        this.setUserComponent = this.setUserComponent.bind(this)
        const types = regef.engine.types
        if (types.indexOf(type) < 0) {
          const typesStr = types.map((tpe) => `"${tpe}"`).join(',')
          throw new TypeError(
            `Not a valid component type "${type}". Please select one from ${typesStr}, or add "${type}" to the engine's "types" array.`,
          )
        }
      }
      setUserComponent(ref) {
        this.userComponent = ref
      }
      componentDidMount() {
        const engine = getEngine(this)
        const context = this.props[REGEF_PROP_KEY]
        if (this.type === engine.rootType) {
          rootActivate(this, context)
        } else {
          defaultActivate(this, context)
        }
      }
      componentWillUnmount() {
        const engine = getEngine(this)
        const context = this.props[REGEF_PROP_KEY]
        if (this.type === engine.rootType) {
          rootDeactivate(this, context)
        } else {
          defaultDecativate(this, context)
        }
      }
      render() {
        const { children, ...rest } = this.props
        return (
          <Wrapped {...rest} ref={this.setUserComponent} regef={this.childProps}>
            {children}
          </Wrapped>
        )
      }
    }
    return withRegefContext(DecoratedComponent)
  }
}
