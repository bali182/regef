import React from 'react'
import { mount } from 'enzyme'
import {
  TestRoot,
  _TestRoot,
  TestContainer,
  _TestContainer,
  TestNode,
  _TestNode,
  TEST_CONTAINER_TYPE,
  TEST_ROOT_TYPE,
  TEST_PART_ID,
  TEST_NODE_TYPE,
} from './testComponents'
import { DiagramPart, Engine, IntentType, Intent, ConnectCapability } from '../src'
import { mockDocument, mockEditPolicy, EventCreator } from './testUtils'

describe('ConnectCapability', () => {
  const editPolicy = mockEditPolicy()

  function typeOf(intent: Intent): IntentType {
    return intent.type
  }

  afterEach(() => {
    jest.clearAllMocks()
    editPolicy.clear()
  })

  const htmlDocument = mockDocument('<div id="app" />')
  const engine = new Engine((e) => ({
    htmlDocument,
    capabilities: [
      new ConnectCapability(e, {
        parts: [TEST_PART_ID],
        sourceTypes: [TEST_NODE_TYPE],
        targetTypes: [TEST_CONTAINER_TYPE],
      }),
    ],
    editPolicies: [editPolicy],
    types: [TEST_NODE_TYPE, TEST_CONTAINER_TYPE, TEST_ROOT_TYPE],
    rootType: TEST_ROOT_TYPE,
  }))
  const vDom = mount(
    <DiagramPart id={TEST_PART_ID} engine={engine}>
      <TestRoot id="@root">
        <TestNode id="@node" />
        <TestNode id="@node2" />
        <TestContainer id="@container" />
      </TestRoot>
    </DiagramPart>,
    { attachTo: htmlDocument.getElementById('app') },
  )

  const rootWrapperVDom = vDom.find(TestRoot)
  const rootVDom = vDom.find(_TestRoot)
  const containerWrapperVDom = vDom.find(TestContainer)
  const containerVDom = vDom.find(_TestContainer)
  const nodeWrapperVDom = vDom.findWhere((c) => c.prop('id') === '@node').find(TestNode)
  const nodeVDom = vDom.findWhere((c) => c.prop('id') === '@node').find(_TestNode)
  const node2WrapperVDom = vDom.findWhere((c) => c.prop('id') === '@node2').find(TestNode)
  const node2VDom = vDom.findWhere((c) => c.prop('id') === '@node2').find(_TestNode)
  const rootDom = htmlDocument.getElementById('@root')
  const containerDom = htmlDocument.getElementById('@container')
  const nodeDom = htmlDocument.getElementById('@node')
  const node2Dom = htmlDocument.getElementById('@node2')

  const connectCapability = engine.capabilities[0] as ConnectCapability
  const eventCreator = new EventCreator(htmlDocument)

  it('should have rendered the correct structures (sanity checks)', () => {
    expect(rootWrapperVDom).not.toBe(undefined)
    expect(rootWrapperVDom.getDOMNode()).toBe(rootDom)

    expect(rootVDom).not.toBe(undefined)
    expect(rootVDom.getDOMNode()).toBe(rootDom)

    expect(nodeWrapperVDom).not.toBe(undefined)
    expect(nodeWrapperVDom.getDOMNode()).toBe(nodeDom)

    expect(nodeVDom).not.toBe(undefined)
    expect(nodeVDom.getDOMNode()).toBe(nodeDom)

    expect(node2VDom).not.toBe(undefined)
    expect(node2VDom.getDOMNode()).toBe(node2Dom)

    expect(node2WrapperVDom).not.toBe(undefined)
    expect(node2WrapperVDom.getDOMNode()).toBe(node2Dom)

    expect(containerVDom).not.toBe(null)
    expect(containerVDom.getDOMNode()).toBe(containerDom)

    expect(containerWrapperVDom).not.toBe(null)
    expect(containerWrapperVDom.getDOMNode()).toBe(containerDom)
  })

  it('should not fire a ConnectionIntent when connecting 2 TestNodes', () => {
    connectCapability.onMouseDown(eventCreator.mouseDown({ buttons: 1, target: nodeDom }))
    connectCapability.onMouseMove(eventCreator.mouseMove({ buttons: 1, target: node2Dom }))
    connectCapability.onMouseUp(eventCreator.mouseUp({ buttons: 1, target: node2Dom }))

    expect(editPolicy.requestFeedback).toHaveBeenCalled()
    expect(editPolicy.eraseFeedback).toHaveBeenCalled()
    expect(editPolicy.perform).not.toHaveBeenCalled()

    const { performed, feedbackRequested, feedbackErased } = editPolicy

    expect(performed.map(typeOf)).toMatchObject([])
    expect(feedbackRequested.map(typeOf)).toMatchObject([IntentType.START_CONNECTION])
    expect(feedbackErased.map(typeOf)).toMatchObject([IntentType.START_CONNECTION])
  })

  it('should not fire a ConnectionIntent when connecting TestNode to TestContainer', () => {
    connectCapability.onMouseDown(eventCreator.mouseDown({ buttons: 1, target: nodeDom }))
    connectCapability.onMouseMove(eventCreator.mouseMove({ buttons: 1, target: containerDom }))
    connectCapability.onMouseUp(eventCreator.mouseUp({ buttons: 1, target: containerDom }))

    expect(editPolicy.requestFeedback).toHaveBeenCalled()
    expect(editPolicy.eraseFeedback).toHaveBeenCalled()
    expect(editPolicy.perform).toHaveBeenCalled()

    const { performed, feedbackRequested, feedbackErased } = editPolicy

    expect(performed.map(typeOf)).toMatchObject([IntentType.END_CONNECTION])
    expect(feedbackRequested.map(typeOf)).toMatchObject([
      IntentType.START_CONNECTION,
      IntentType.END_CONNECTION,
    ])
    expect(feedbackErased.map(typeOf)).toMatchObject([
      IntentType.START_CONNECTION,
      IntentType.END_CONNECTION,
    ])
  })
})
