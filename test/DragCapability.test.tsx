import React from 'react'
import { mount } from 'enzyme'
import {
  TestRoot,
  _TestContainer,
  TestContainer,
  _TestRoot,
  TestNode,
  _TestNode,
  TEST_CONTAINER_TYPE,
  TEST_ROOT_TYPE,
  TEST_PART_ID,
  TEST_NODE_TYPE,
} from './testComponents'
import { DiagramPart, Engine, DragCapability, IntentType } from '../src'
import { mockDocument, mockEditPolicy, EventCreator, typeOf } from './testUtils'

describe('DragCapability', () => {
  const editPolicy = mockEditPolicy()

  afterEach(() => {
    jest.clearAllMocks()
    editPolicy.clear()
  })

  const htmlDocument = mockDocument('<div id="app" />')
  const engine = new Engine((e) => ({
    htmlDocument,
    capabilities: [
      new DragCapability(e, {
        draggables: [TEST_NODE_TYPE, TEST_CONTAINER_TYPE],
        hosts: [TEST_CONTAINER_TYPE],
        parts: [TEST_PART_ID],
      }),
    ],
    editPolicies: [editPolicy],
    types: [TEST_NODE_TYPE, TEST_CONTAINER_TYPE, TEST_ROOT_TYPE],
    rootType: TEST_ROOT_TYPE,
  }))
  const vDom = mount(
    <DiagramPart id={TEST_PART_ID} engine={engine} rootType={TEST_ROOT_TYPE}>
      <TestRoot id="@root">
        <TestContainer id="@container">
          <TestNode id="@node" />
        </TestContainer>
        <TestContainer id="@container2" />
      </TestRoot>
    </DiagramPart>,
    { attachTo: htmlDocument.getElementById('app') },
  )

  const rootWrapperVDom = vDom.find(TestRoot)
  const rootVDom = vDom.find(_TestRoot)
  const containerWrapperVDom = vDom
    .findWhere((e) => e.prop('id') === '@container')
    .find(TestContainer)
  const containerVDom = vDom.findWhere((e) => e.prop('id') === '@container').find(_TestContainer)
  const container2WrapperVDom = vDom
    .findWhere((e) => e.prop('id') === '@container2')
    .find(TestContainer)
  const container2VDom = vDom.findWhere((e) => e.prop('id') === '@container2').find(_TestContainer)
  const nodeWrapperVDom = vDom.find(TestNode)
  const nodeVDom = vDom.find(_TestNode)
  const rootDom = htmlDocument.getElementById('@root')
  const containerDom = htmlDocument.getElementById('@container')
  const container2Dom = htmlDocument.getElementById('@container2')
  const nodeDom = htmlDocument.getElementById('@node')

  const dragCapability = engine.capabilities[0] as DragCapability
  const eventCreator = new EventCreator(htmlDocument)

  it('should have rendered the correct structures (sanity checks)', () => {
    expect(rootWrapperVDom).not.toBe(undefined)
    expect(rootWrapperVDom.getDOMNode()).toBe(rootDom)

    expect(rootVDom).not.toBe(undefined)
    expect(rootVDom.getDOMNode()).toBe(rootDom)

    expect(containerWrapperVDom).not.toBe(undefined)
    expect(containerWrapperVDom.getDOMNode()).toBe(containerDom)

    expect(containerVDom).not.toBe(undefined)
    expect(containerVDom.getDOMNode()).toBe(containerDom)

    expect(container2WrapperVDom).not.toBe(undefined)
    expect(container2WrapperVDom.getDOMNode()).toBe(container2Dom)

    expect(container2VDom).not.toBe(undefined)
    expect(container2VDom.getDOMNode()).toBe(container2Dom)

    expect(nodeWrapperVDom).not.toBe(undefined)
    expect(nodeWrapperVDom.getDOMNode()).toBe(nodeDom)

    expect(nodeVDom).not.toBe(undefined)
    expect(nodeVDom.getDOMNode()).toBe(nodeDom)
  })

  it('should fire MoveIntent when TestContainer dragged inside TestRoot', () => {
    dragCapability.onMouseDown(eventCreator.mouseDown({ buttons: 1, target: containerDom }))
    dragCapability.onMouseMove(eventCreator.mouseMove({ buttons: 1, target: rootDom }))
    dragCapability.onMouseUp(eventCreator.mouseUp({ buttons: 1, target: rootDom }))

    expect(editPolicy.requestFeedback).toHaveBeenCalled()
    expect(editPolicy.eraseFeedback).toHaveBeenCalled()
    expect(editPolicy.perform).toHaveBeenCalled()

    const { performed, feedbackRequested, feedbackErased } = editPolicy

    expect(performed.map(typeOf)).toMatchObject([IntentType.SELECT, IntentType.MOVE])
    expect(feedbackRequested.map(typeOf)).toMatchObject([IntentType.MOVE])
    expect(feedbackErased.map(typeOf)).toMatchObject([IntentType.MOVE])
  })

  it('should fire MoveIntent when TestNode dragged inside TestContainer', () => {
    dragCapability.onMouseDown(eventCreator.mouseDown({ buttons: 1, target: nodeDom }))
    dragCapability.onMouseMove(eventCreator.mouseMove({ buttons: 1, target: containerDom }))
    dragCapability.onMouseUp(eventCreator.mouseUp({ buttons: 1, target: containerDom }))

    expect(editPolicy.requestFeedback).toHaveBeenCalled()
    expect(editPolicy.eraseFeedback).toHaveBeenCalled()
    expect(editPolicy.perform).toHaveBeenCalled()

    const { performed, feedbackRequested, feedbackErased } = editPolicy

    expect(performed.map(typeOf)).toMatchObject([IntentType.SELECT, IntentType.MOVE])
    expect(feedbackRequested.map(typeOf)).toMatchObject([IntentType.MOVE])
    expect(feedbackErased.map(typeOf)).toMatchObject([IntentType.MOVE])
  })

  it('should fire AddIntent when TestNode dragged from TestContainer to TestContainer 2', () => {
    dragCapability.onMouseDown(eventCreator.mouseDown({ buttons: 1, target: nodeDom }))
    dragCapability.onMouseMove(eventCreator.mouseMove({ buttons: 1, target: container2Dom }))
    dragCapability.onMouseUp(eventCreator.mouseUp({ buttons: 1, target: container2Dom }))

    expect(editPolicy.requestFeedback).toHaveBeenCalled()
    expect(editPolicy.eraseFeedback).toHaveBeenCalled()
    expect(editPolicy.perform).toHaveBeenCalled()

    const { performed, feedbackRequested, feedbackErased } = editPolicy

    expect(performed.map(typeOf)).toMatchObject([IntentType.SELECT, IntentType.ADD])
    expect(feedbackRequested.map(typeOf)).toMatchObject([IntentType.ADD])
    expect(feedbackErased.map(typeOf)).toMatchObject([IntentType.ADD])
  })

  // TODO investigate why this isn't implemented this way.
  xit('should fire AddIntent when TestNode dragged from TestContainer to TestRoot', () => {
    dragCapability.onMouseDown(eventCreator.mouseDown({ buttons: 1, target: nodeDom }))
    dragCapability.onMouseMove(eventCreator.mouseMove({ buttons: 1, target: rootDom }))
    dragCapability.onMouseUp(eventCreator.mouseUp({ buttons: 1, target: rootDom }))

    expect(editPolicy.requestFeedback).toHaveBeenCalled()
    expect(editPolicy.eraseFeedback).toHaveBeenCalled()
    expect(editPolicy.perform).toHaveBeenCalled()

    const { performed, feedbackRequested, feedbackErased } = editPolicy

    expect(performed.map(typeOf)).toMatchObject([IntentType.SELECT, IntentType.ADD])
    expect(feedbackRequested.map(typeOf)).toMatchObject([IntentType.ADD])
    expect(feedbackErased.map(typeOf)).toMatchObject([IntentType.ADD])
  })
})
