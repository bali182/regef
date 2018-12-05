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
import { DiagramPart, Engine, IntentType, SingleSelectionCapability, SelectionIntent } from '../src'
import {
  mockDocument,
  mockEditPolicy,
  EventCreator,
  typeOf,
  mockSelectionProvider,
} from './testUtils'

describe('SingleSelectionCapability', () => {
  const editPolicy = mockEditPolicy()
  const selectionProvider = mockSelectionProvider()

  afterEach(() => {
    jest.clearAllMocks()
    editPolicy.clear()
    selectionProvider.setSelection([])
  })

  const htmlDocument = mockDocument('<div id="app" />')
  const engine = new Engine((e) => ({
    selectionProvider,
    htmlDocument,
    capabilities: [
      new SingleSelectionCapability(e, {
        parts: [TEST_PART_ID],
        selectables: [TEST_NODE_TYPE],
      }),
    ],
    editPolicies: [editPolicy],
    types: [TEST_NODE_TYPE, TEST_CONTAINER_TYPE, TEST_ROOT_TYPE],
    rootType: TEST_ROOT_TYPE,
  }))
  const vDom = mount(
    <DiagramPart id={TEST_PART_ID} engine={engine} rootType={TEST_ROOT_TYPE}>
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

  const selectionCapability = engine.capabilities[0] as SingleSelectionCapability
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

  xit('should fire selection Intent when clicking on a node type component', () => {
    selectionCapability.onMouseDown(eventCreator.mouseDown({ buttons: 1, target: nodeDom }))
    selectionCapability.onMouseUp(eventCreator.mouseUp({ buttons: 1, target: nodeDom }))

    expect(editPolicy.requestFeedback).not.toHaveBeenCalled()
    expect(editPolicy.eraseFeedback).not.toHaveBeenCalled()
    expect(editPolicy.perform).toHaveBeenCalled()

    const { performed, feedbackRequested, feedbackErased } = editPolicy

    expect(feedbackRequested).toMatchObject([])
    expect(feedbackErased).toMatchObject([])
    expect(performed.map(typeOf)).toMatchObject([IntentType.SELECT])
  })

  it('should fire additive selection Intent when clicking on a node type component. while another on is selected', () => {
    selectionProvider.setSelection([nodeVDom.instance()])
    selectionCapability.onMouseDown(
      eventCreator.mouseDown({ buttons: 1, target: node2Dom, ctrlKey: true, metaKey: true }),
    )
    selectionCapability.onMouseUp(
      eventCreator.mouseUp({ buttons: 1, target: node2Dom, ctrlKey: true, metaKey: true }),
    )

    expect(editPolicy.requestFeedback).not.toHaveBeenCalled()
    expect(editPolicy.eraseFeedback).not.toHaveBeenCalled()
    expect(editPolicy.perform).toHaveBeenCalled()

    const { performed, feedbackRequested, feedbackErased } = editPolicy

    expect(feedbackRequested).toMatchObject([])
    expect(feedbackErased).toMatchObject([])
    expect(performed.map(typeOf)).toMatchObject([IntentType.SELECT])

    const selection = (performed[0] as SelectionIntent).selection

    expect(selection).toHaveLength(2)
    expect(selection).toContain(node2VDom.instance())
    expect(selection).toContain(nodeVDom.instance())
  })

  it('should not fire selection Intent when clicking on a container type component', () => {
    selectionCapability.onMouseDown(eventCreator.mouseDown({ buttons: 1, target: containerDom }))
    selectionCapability.onMouseUp(eventCreator.mouseUp({ buttons: 1, target: containerDom }))

    expect(editPolicy.requestFeedback).not.toHaveBeenCalled()
    expect(editPolicy.eraseFeedback).not.toHaveBeenCalled()
    expect(editPolicy.perform).not.toHaveBeenCalled()

    const { performed, feedbackRequested, feedbackErased } = editPolicy

    expect(feedbackRequested).toMatchObject([])
    expect(feedbackErased).toMatchObject([])
    expect(performed).toMatchObject([])
  })
})
