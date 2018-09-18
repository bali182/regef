import React from 'react'
import { withRegefContext } from './RegefContext'
import { REGEF_PROP_KEY, Id, HasUserComponent, RegefComponent } from './constants'
import { fromComponent } from './ComponentWrapper'
import { watchRegister } from './watchers'
import { DiagramPartWrapper } from './DiagramPartWrapper'
import { Engine } from './Engine';
import { ComponentRegistry } from './ComponentRegistry';
import { Toolkit } from './Toolkit';

type RegefProps = {
  [REGEF_PROP_KEY]: RegefContext
}

type RegefContext = {
  engine: Engine
  id: Id
}

type CachedChildProps = {
  toolkit: () => Promise<Toolkit>
}

const registryFrom = ({ engine, id }: RegefContext): ComponentRegistry => {
  if (engine.__partsMap().has(id)) {
    return engine.part(id).registry
  }
  return null
}

const toolkitFrom = ({ engine, id }: RegefContext): Toolkit => (engine.__partsMap().has(id) ? engine.toolkit : null)

const ensurePartRegistered = ({ engine, id }: RegefContext) => {
  const parts = engine.__partsMap()
  if (!parts.has(id)) {
    parts.set(id, new DiagramPartWrapper(id, engine))
  }
}

function toolkitResolver(comp: React.Component, context: RegefContext) {
  ensurePartRegistered(context)
  return () => watchRegister(registryFrom(context), comp).then(() => toolkitFrom(context))
}

const defaultActivate = (comp: RegefComponent, context: RegefContext) => {
  ensurePartRegistered(context)
  registryFrom(context).register(fromComponent(comp))
}

const defaultDecativate = (comp: React.Component, context: RegefContext) => {
  const registry = registryFrom(context)
  if (registry) {
    registry.unregister(comp)
  }
}

const rootActivate = (comp: RegefComponent, context: RegefContext) => {
  defaultActivate(comp, context)
  const registry = registryFrom(context)
  registry.setRoot(registry.get(comp))
}

const rootDeactivate = (comp: React.Component, context: RegefContext) => {
  defaultDecativate(comp, context)
  const registry = registryFrom(context)
  if (registry) {
    registry.setRoot(null)
  }
}

const getEngine = (comp: React.Component<RegefProps>) => comp.props[REGEF_PROP_KEY].engine

export default function component(type: Id) {
  return function componentDecorator(Wrapped: React.ComponentClass<any>) {
    class DecoratedComponent extends React.PureComponent<RegefProps> {
      public userComponent: React.Component
      public type: Id
      private childProps: CachedChildProps

      constructor(props: RegefProps) {
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
      setUserComponent(ref: any): void {
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
      componentWillUnmount(): void {
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
          <Wrapped {...rest} ref={this.setUserComponent} regef={this.childProps} >
            {children}
          </Wrapped>
        )
      }
    }
    return withRegefContext(DecoratedComponent)
  }
}
