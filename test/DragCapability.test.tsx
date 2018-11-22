import React from 'react'
import { mount } from 'enzyme'
import {
  TestRoot,
  _TestContainer,
  TestContainer,
  _TestRoot,
  TEST_CONTAINER_TYPE,
  TEST_ROOT_TYPE,
  TEST_PART_ID,
  TestNode,
  _TestNode,
} from './testComponents'
import { DiagramPart, Engine, DragCapability } from '../src'
import { mockDocument, mockEditPolicy, EventCreator } from './testUtils'

describe('DragCapability', () => {
  afterEach(() => jest.clearAllMocks())

  const htmlDocument = mockDocument('<div id="app" />')
  const engine = new Engine((e) => ({
    htmlDocument,
    capabilities: [
      new DragCapability(e, {
        draggables: [TEST_CONTAINER_TYPE],
        hosts: [TEST_CONTAINER_TYPE],
        parts: [TEST_PART_ID],
      }),
    ],
    editPolicies: [mockEditPolicy()],
    types: [TEST_CONTAINER_TYPE, TEST_ROOT_TYPE],
    rootType: TEST_ROOT_TYPE,
  }))
  const vDom = mount(
    <DiagramPart id={TEST_PART_ID} engine={engine}>
      <TestRoot id="@root">
        <TestContainer id="@container">
          <TestNode id="@node" />
        </TestContainer>
      </TestRoot>
    </DiagramPart>,
    { attachTo: htmlDocument.getElementById('app') },
  )

  const rootWrapperVDom = vDom.find(TestRoot)
  const rootVDom = vDom.find(_TestRoot)
  const containerWrapperVDom = vDom.find(TestContainer)
  const containerVDom = vDom.find(_TestContainer)
  const nodeWrapperVDom = vDom.find(TestNode)
  const nodeVDom = vDom.find(_TestNode)
  const rootDom = htmlDocument.getElementById('@root')
  const containerDom = htmlDocument.getElementById('@container')
  const nodeDom = htmlDocument.getElementById('@node')

  it('should have rendered the correct structures (sanity checks)', () => {
    expect(rootWrapperVDom).not.toBe(undefined)
    expect(rootWrapperVDom.getDOMNode()).toBe(rootDom)

    expect(containerWrapperVDom).not.toBe(undefined)
    expect(containerWrapperVDom.getDOMNode()).toBe(containerDom)

    expect(rootVDom).not.toBe(undefined)
    expect(rootVDom.getDOMNode()).toBe(rootDom)

    expect(containerVDom).not.toBe(undefined)
    expect(containerVDom.getDOMNode()).toBe(containerDom)

    expect(nodeWrapperVDom).not.toBe(undefined)
    expect(nodeWrapperVDom.getDOMNode()).toBe(nodeDom)

    expect(nodeVDom).not.toBe(undefined)
    expect(nodeVDom.getDOMNode()).toBe(nodeDom)
  })

  it('should fire MoveIntent when TestContainer dragged inside TestRoot', () => {
    const dragCapability = engine.capabilities[0] as DragCapability
    const editPolicy = engine.editPolicies[0]
    const eventCreator = new EventCreator(htmlDocument)

    dragCapability.onMouseDown(eventCreator.mouseDown({ buttons: 1, target: containerDom }))
    dragCapability.onMouseMove(eventCreator.mouseDown({ buttons: 1, target: rootDom }))
    dragCapability.onMouseUp(eventCreator.mouseDown({ buttons: 1, target: rootDom }))

    expect(editPolicy.requestFeedback).toHaveBeenCalled()
    expect(editPolicy.eraseFeedback).toHaveBeenCalled()
    expect(editPolicy.perform).toHaveBeenCalled()
  })

  xit('should fire MoveIntent when TestNode dragged inside TestContainer', () => {})
  xit('should fire AddIntent when TestNode dragged from TestContainer to TestRoot', () => {})
})
