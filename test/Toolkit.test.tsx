import React from 'react'
import { mockDocument } from './testUtils'
import { Engine, DiagramPart, PartToolkit } from '../src'
import {
  TEST_PART_ID,
  TEST_ROOT_TYPE,
  TEST_NODE_TYPE,
  TestRoot,
  TestNode,
  TEST_PART_ID_2,
} from './testComponents'
import { mount } from 'enzyme'

describe('Toolkit', () => {
  afterEach(() => jest.clearAllMocks())
  // It's easier to create a toolkit through an engine
  const htmlDocument = mockDocument('<div id="app" />')
  const engine = new Engine((e) => ({
    htmlDocument,
    capabilities: [],
    editPolicies: [],
    types: [TEST_NODE_TYPE, TEST_ROOT_TYPE],
    rootType: TEST_ROOT_TYPE,
  }))
  mount(
    <div>
      <DiagramPart id={TEST_PART_ID} engine={engine} rootType={TEST_ROOT_TYPE}>
        <TestRoot id="@root">
          <TestNode id="@node" />
        </TestRoot>
      </DiagramPart>
      <DiagramPart id={TEST_PART_ID_2} engine={engine} rootType={TEST_ROOT_TYPE}>
        <TestRoot id="@root2">
          <TestNode id="@node2" />
        </TestRoot>
      </DiagramPart>
    </div>,
    { attachTo: htmlDocument.getElementById('app') },
  )
  const { toolkit } = engine

  const idOf = (component: any) => component.props.id

  it('should return the appropriate Toolkit by id', () => {
    const kit1 = toolkit.forPart(TEST_PART_ID)
    expect(kit1).toBeInstanceOf(PartToolkit)
    expect(kit1.root()).toBeTruthy()
    expect(idOf(kit1.root())).toBe('@root')

    const kit2 = toolkit.forPart(TEST_PART_ID_2)
    expect(kit2).toBeInstanceOf(PartToolkit)
    expect(kit2.root()).toBeTruthy()
    expect(idOf(kit2.root())).toBe('@root2')
  })
})
