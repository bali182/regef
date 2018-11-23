import React from 'react'
import { withRegefContext } from './RegefContext'
import {
  Id,
  RegefComponent,
  RegefComponentProps,
  RegefObject,
  REGEF_PROP_KEY,
  RegefInternalProps,
  RegefProps,
} from './typings'
import { fromComponent } from './ComponentWrapper'
import { watchRegister } from './watchers'
import { DiagramPartWrapper } from './DiagramPartWrapper'
import { Engine } from './Engine'
import { ComponentRegistry } from './ComponentRegistry'
import { Toolkit } from './Toolkit'

/** @internal */
function registryFrom({ engine, id }: RegefInternalProps): ComponentRegistry {
  if (engine.__parts.has(id)) {
    return engine.part(id).registry
  }
  return null
}

/** @internal */
function toolkitFrom({ engine, id }: RegefInternalProps): Toolkit {
  return engine.__parts.has(id) ? engine.toolkit : null
}

/** @internal */
function ensurePartRegistered({ engine, id }: RegefInternalProps): void {
  if (!engine.__parts.has(id)) {
    engine.__parts.set(id, new DiagramPartWrapper(id, engine))
  }
}

/** @internal */
function toolkitResolver(
  comp: React.Component,
  context: RegefInternalProps,
): () => Promise<Toolkit> {
  ensurePartRegistered(context)
  return () => watchRegister(registryFrom(context), comp).then(() => toolkitFrom(context))
}

/** @internal */
function defaultActivate(comp: RegefComponent, context: RegefInternalProps): void {
  ensurePartRegistered(context)
  registryFrom(context).register(fromComponent(comp))
}

/** @internal */
function defaultDecativate(comp: React.Component, context: RegefInternalProps): void {
  const registry = registryFrom(context)
  if (registry) {
    registry.unregister(comp)
  }
}

/** @internal */
function rootActivate(comp: RegefComponent, context: RegefInternalProps): void {
  defaultActivate(comp, context)
  const registry = registryFrom(context)
  registry.setRoot(registry.get(comp))
}

/** @internal */
function rootDeactivate(comp: React.Component, context: RegefInternalProps): void {
  defaultDecativate(comp, context)
  const registry = registryFrom(context)
  if (registry) {
    registry.setRoot(null)
  }
}

/** @internal */
function getEngine(comp: React.Component<RegefProps>): Engine {
  return comp.props[REGEF_PROP_KEY].engine
}

export function component<P extends Partial<RegefComponentProps>>(type: Id) {
  type WrappedPropsType = Pick<P, Exclude<keyof P, keyof RegefComponentProps>>
  return function componentDecorator(
    Wrapped: React.ComponentClass<P>,
  ): React.ComponentClass<WrappedPropsType> {
    class DecoratedComponent extends React.PureComponent<RegefProps> {
      /** @internal */
      public userComponent: React.Component
      /** @internal */
      public type: Id
      /** @internal */
      private childProps: RegefObject

      constructor(props: RegefProps) {
        super(props)
        const context = this.getRegefContext()
        this.userComponent = null
        this.type = type
        this.childProps = { toolkit: toolkitResolver(this, context) }
        const types = context.engine.types
        if (types.indexOf(type) < 0) {
          const typesStr = types.map((tpe) => `"${tpe}"`).join(',')
          throw new TypeError(
            `Not a valid component type "${type}". Please select one from ${typesStr}, or add "${type}" to the engine's "types" array.`,
          )
        }
      }
      setUserComponent = (ref: any): void => {
        this.userComponent = ref
      }
      componentDidMount() {
        const engine = getEngine(this)
        if (this.type === engine.rootType) {
          rootActivate(this, this.getRegefContext())
        } else {
          defaultActivate(this, this.getRegefContext())
        }
      }
      componentWillUnmount(): void {
        const engine = getEngine(this)
        if (this.type === engine.rootType) {
          rootDeactivate(this, this.getRegefContext())
        } else {
          defaultDecativate(this, this.getRegefContext())
        }
      }
      private getRegefContext(): RegefInternalProps {
        return this.props[REGEF_PROP_KEY]
      }
      render() {
        const { children, ...rest } = this.props
        return (
          <Wrapped {...rest as any} ref={this.setUserComponent} regef={this.childProps}>
            {children}
          </Wrapped>
        )
      }
    }
    return withRegefContext(DecoratedComponent) as any
  }
}
