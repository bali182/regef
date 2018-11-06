import { Component } from 'react'
import { ComponentRegistry } from '../src/ComponentRegistry'
import { ComponentWrapper } from '../src/ComponentWrapper'
import { RegefComponent } from '../src/typings'

describe('ComponentRegistry', () => {
  it('should be able to access registered ComponentWrapper by all fields', () => {
    const wrapper = dummyComponentWrapper()
    const registry = new ComponentRegistry()

    registry.register(wrapper)

    shouldHaveComponentWrapper(registry, wrapper)
  })

  it('should be to unregister a registered ComponentWrapper by all fields', () => {
    const wrapper = dummyComponentWrapper()
    const registry = new ComponentRegistry()

    const fields = [wrapper, wrapper.dom, wrapper.userComponent, wrapper.component]

    for (const field of fields) {
      registry.register(wrapper)
      shouldHaveComponentWrapper(registry, wrapper)
      registry.unregister(field)
      shouldNotHaveComponentWrapper(registry, wrapper)
    }
  })

  it('should list all registered ComponentWrappers when ComponentRegistry#all is called', () => {
    const wrappers = new Set([
      dummyComponentWrapper(),
      dummyComponentWrapper(),
      dummyComponentWrapper(),
    ])
    const registry = new ComponentRegistry()
    for (const wrapper of wrappers) {
      registry.register(wrapper)
    }
    expect(new Set(registry.all())).toEqual(wrappers)
  })

  it('should clean registered components when a Root component is unregistered', () => {
    const registry = new ComponentRegistry()

    for (const wrapper of [
      dummyComponentWrapper(),
      dummyComponentWrapper(),
      dummyComponentWrapper(),
    ]) {
      registry.register(wrapper)
    }

    registry.setRoot(null)

    expect(registry.all()).toHaveLength(0)
    expect(registry.root).toBe(null)
  })

  it('should notify listeners when ComponentWrappers registered/unregistered', () => {
    const wrapper = dummyComponentWrapper()
    const registry = new ComponentRegistry()

    const regListener = jest.fn()
    const unregListener = jest.fn()

    registry.addRegisterListener(regListener)
    registry.addUnregisterListener(unregListener)

    registry.register(wrapper)
    expect(regListener).toHaveBeenCalledWith(wrapper)
    registry.unregister(wrapper)
    expect(unregListener).toHaveBeenCalledWith(wrapper)
  })
})

function dummyElement(): Element {
  return { domElement: Symbol('DOM element') } as any
}
function dummyReactComponent(): Component {
  return { domElement: Symbol('React component') } as any
}
function dummyRegefComponent(): RegefComponent {
  return { domElement: Symbol('Regef component') } as any
}
function dummyComponentWrapper(): ComponentWrapper {
  return new ComponentWrapper(dummyElement(), dummyRegefComponent(), dummyReactComponent())
}

function shouldHaveComponentWrapper(registry: ComponentRegistry, wrapper: ComponentWrapper) {
  expect(registry.get(wrapper)).toBe(wrapper)
  expect(registry.get(wrapper.dom)).toBe(wrapper)
  expect(registry.get(wrapper.component)).toBe(wrapper)
  expect(registry.get(wrapper.userComponent)).toBe(wrapper)
}

function shouldNotHaveComponentWrapper(registry: ComponentRegistry, wrapper: ComponentWrapper) {
  expect(registry.get(wrapper)).toBe(undefined)
  expect(registry.get(wrapper.dom)).toBe(undefined)
  expect(registry.get(wrapper.component)).toBe(undefined)
  expect(registry.get(wrapper.userComponent)).toBe(undefined)
}
