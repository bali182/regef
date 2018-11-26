import React, { Component, ComponentClass, PureComponent } from 'react'
import { withRegefContext } from './RegefContext'
import {
  Id,
  RegefComponent,
  RegefComponentProps,
  RegefObject,
  REGEF_PROP_KEY,
  DiagramPartProps,
  RegefProps,
} from './typings'
import { fromComponent } from './ComponentWrapper'
import { watchRegister } from './watchers'
import { DiagramPartWrapper } from './DiagramPartWrapper'
import { ComponentRegistry } from './ComponentRegistry'
import { Toolkit } from './Toolkit'

/** @internal */
function registryFrom({ engine, id }: DiagramPartProps): ComponentRegistry {
  if (engine.__parts.has(id)) {
    return engine.part(id).registry
  }
  return null
}

/** @internal */
function toolkitFrom({ engine, id }: DiagramPartProps): Toolkit {
  return engine.__parts.has(id) ? engine.toolkit : null
}

/** @internal */
function ensurePartRegistered({ engine, id, rootType }: DiagramPartProps): void {
  if (!engine.__parts.has(id)) {
    engine.__parts.set(id, new DiagramPartWrapper(id, rootType, engine))
  }
}

/** @internal */
function toolkitResolver(comp: Component, context: DiagramPartProps): () => Promise<Toolkit> {
  ensurePartRegistered(context)
  return () => watchRegister(registryFrom(context), comp).then(() => toolkitFrom(context))
}

/** @internal */
function activate(comp: RegefComponent, context: DiagramPartProps): void {
  ensurePartRegistered(context)
  const { id, engine } = context
  const registry = registryFrom(context)
  const wrapper = fromComponent(comp)
  registry.register(wrapper)
  const part = engine.part(id)
  if (part.rootType === comp.type) {
    registry.setRoot(wrapper)
  }
}

/** @internal */
function deactivate(comp: Component, context: DiagramPartProps): void {
  const registry = registryFrom(context)
  const { engine, id } = context
  if (registry) {
    const wrapper = registry.get(comp)
    if (wrapper === registry.root) {
      registry.setRoot(null)
    }
    registry.unregister(comp)
    if (registry.wrappers.size === 0) {
      engine.__parts.delete(id)
    }
  }
}

/** @internal */
function getRegefContext(comp: Component<RegefProps>): DiagramPartProps {
  return comp.props[REGEF_PROP_KEY]
}

export function component<P extends Partial<RegefComponentProps>>(type: Id) {
  type WrappedPropsType = Pick<P, Exclude<keyof P, keyof RegefComponentProps>>
  return function componentDecorator(Wrapped: ComponentClass<P>): ComponentClass<WrappedPropsType> {
    class DecoratedComponent extends PureComponent<RegefProps> {
      /** @internal */
      public userComponent: Component
      /** @internal */
      public type: Id
      /** @internal */
      private childProps: RegefObject

      constructor(props: RegefProps) {
        super(props)
        const context = getRegefContext(this)
        this.userComponent = null
        this.type = type
        this.childProps = { toolkit: toolkitResolver(this, context) }
      }
      setUserComponent = (ref: any): void => {
        this.userComponent = ref
      }
      componentDidMount() {
        const ctx = getRegefContext(this)
        activate(this, ctx)
      }
      componentWillUnmount(): void {
        const ctx = getRegefContext(this)
        deactivate(this, ctx)
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
