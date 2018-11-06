import { Component } from 'react'
import { registerDummyTree, mockDocument } from './testUtils'
import { PartDomHelper } from '../src/PartDomHelper'
import { ComponentRegistry } from '../src/ComponentRegistry'
import { PartToolkit } from '../src/PartToolkit'

describe('PartDomHelper', () => {
  afterEach(() => jest.clearAllMocks())

  const registry = new ComponentRegistry()
  const helper = new PartDomHelper(registry)
  const toolkit = new PartToolkit(registry, helper)

  const tree = mockDocument(`<div id="root">
  <div data-root="true" id="part-root" data-type="root">
    <div id="wrapper">
      <div data-component="true" id="nested-component" data-type="t1">
        <div data-component="true" id="deeply-nested-component-1" data-type="t1"/>
        <div id="nested-wrapper">
          <div data-component="true" id="deeply-nested-component-2" data-type="t1" />
        </div>
      </div>
    </div>
    <div data-component="true" id="non-nested-component-1" data-type="t2"/>
    <div data-component="true" id="non-nested-component-2" data-type="t2"/>
  </div>
  <div id="external" />
</div>`)

  const partRoot = tree.getElementById('part-root')
  const nested = tree.getElementById('nested-component')
  const deeplyNested1 = tree.getElementById('deeply-nested-component-1')
  const deeplyNested2 = tree.getElementById('deeply-nested-component-2')
  const nonNested1 = tree.getElementById('non-nested-component-1')
  const nonNested2 = tree.getElementById('non-nested-component-2')

  function userComponent(element: Element): Component {
    return registry.get(element).userComponent
  }

  registerDummyTree(partRoot, registry)

  it('should find right root element', () => {
    const rootComponent = toolkit.root()
    const registeredRootComponent = registry.get(partRoot).userComponent
    expect(rootComponent).toBe(registeredRootComponent)
  })

  it('should find the correct parents', () => {
    expect(toolkit.parent(userComponent(partRoot))).toBe(null)
    expect(toolkit.parent(userComponent(nested))).toBe(userComponent(partRoot))
    expect(toolkit.parent(userComponent(deeplyNested1))).toBe(userComponent(nested))
    expect(toolkit.parent(userComponent(deeplyNested2))).toBe(userComponent(nested))
    expect(toolkit.parent(userComponent(nonNested1))).toBe(userComponent(partRoot))
    expect(toolkit.parent(userComponent(nonNested2))).toBe(userComponent(partRoot))

    expect(() => toolkit.parent({} as Component)).toThrow()
  })

  it('should find the correct children', () => {
    expect(new Set(toolkit.children(userComponent(partRoot)))).toEqual(
      new Set([userComponent(nested), userComponent(nonNested1), userComponent(nonNested2)]),
    )
    expect(new Set(toolkit.children(userComponent(nested)))).toEqual(
      new Set([userComponent(deeplyNested1), userComponent(deeplyNested2)]),
    )
    expect(toolkit.children(userComponent(deeplyNested1))).toEqual([])
    expect(toolkit.children(userComponent(deeplyNested2))).toEqual([])
    expect(toolkit.children(userComponent(nonNested1))).toEqual([])
    expect(toolkit.children(userComponent(nonNested2))).toEqual([])

    expect(() => toolkit.children({} as Component)).toThrow()
  })

  it('should find the correct elements by type', () => {
    const actualRootComponents = toolkit.ofType('root')
    const actualT1Components = toolkit.ofType('t1')
    const actualT2Components = toolkit.ofType('t2')

    const expectedT2Components = [userComponent(nonNested1), userComponent(nonNested2)]
    const expectedRootComponents = [userComponent(partRoot)]
    const expectedT1Components = [
      userComponent(nested),
      userComponent(deeplyNested1),
      userComponent(deeplyNested2),
    ]

    expect(new Set(actualRootComponents)).toEqual(new Set(expectedRootComponents))
    expect(new Set(actualT1Components)).toEqual(new Set(expectedT1Components))
    expect(new Set(actualT2Components)).toEqual(new Set(expectedT2Components))
  })
})
