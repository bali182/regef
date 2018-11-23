import { PartDomHelper } from '../src/PartDomHelper'
import { ComponentWrapper } from '../src/ComponentWrapper'
import { ComponentRegistry } from '../src/ComponentRegistry'
import { registerDummyTree, mockDocument } from './testUtils'

describe('PartDomHelper', () => {
  afterEach(() => jest.clearAllMocks())

  describe('#findClosest', () => {
    const registry = new ComponentRegistry()
    const helper = new PartDomHelper(registry)
    const doc = mockDocument(`<div data-root="true" id="root">
      <div id="wrapper">
        <div data-component="true" id="hello-component">
          <div id="hello-component-child"></div>
        </div>
      </div>
    </div>`)

    const root = doc.getElementById('root')
    const wrapper = doc.getElementById('wrapper')
    const helloComponent = doc.getElementById('hello-component')
    const helloComponentChild = doc.getElementById('hello-component-child')

    registerDummyTree(root, registry)

    it('should find the closest elements without a predicate', () => {
      expect(helper.findClosest(root).dom).toBe(root)
      expect(helper.findClosest(wrapper).dom).toBe(root)
      expect(helper.findClosest(helloComponent).dom).toBe(helloComponent)
      expect(helper.findClosest(helloComponentChild).dom).toBe(helloComponent)
    })

    it('should find the closest elements or null when using a predicate', () => {
      const predicate = (wrapper: ComponentWrapper) => wrapper.dom === root
      expect(helper.findClosest(root, predicate).dom).toBe(root)
      expect(helper.findClosest(wrapper, predicate).dom).toBe(root)
      expect(helper.findClosest(helloComponent, predicate)).toBe(null)
      expect(helper.findClosest(helloComponentChild, predicate)).toBe(null)
    })
  })

  describe('#findRelevantChildren', () => {
    const registry = new ComponentRegistry()
    const helper = new PartDomHelper(registry)
    const doc = mockDocument(`<div data-root="true" id="root">
      <div id="wrapper">
        <div data-component="true" id="nested-component">
          <div data-component="true" id="deeply-nested-component-1"></div>
          <div id="nested-wrapper">
            <div data-component="true" id="deeply-nested-component-2"></div>
          </div>
        </div>
      </div>
      <div data-component="true" id="non-nested-component-1"></div>
      <div data-component="true" id="non-nested-component-2"></div>
    </div>`)

    const root = doc.getElementById('root')
    const nested = doc.getElementById('nested-component')
    const deeplyNested1 = doc.getElementById('deeply-nested-component-1')
    const deeplyNested2 = doc.getElementById('deeply-nested-component-2')
    const nonNested1 = doc.getElementById('non-nested-component-1')
    const nonNested2 = doc.getElementById('non-nested-component-2')

    registerDummyTree(root, registry)

    it('should find the relevant children of root element', () => {
      const children = helper.findRelevantChildren(root)
      expect(new Set(children)).toEqual(new Set([nested, nonNested1, nonNested2]))
    })

    it('should find the relevant children of a nested element', () => {
      const children = helper.findRelevantChildren(nested)
      expect(new Set(children)).toEqual(new Set([deeplyNested1, deeplyNested2]))
    })
  })

  describe('#partContains', () => {
    const registry = new ComponentRegistry()
    const helper = new PartDomHelper(registry)
    const doc = mockDocument(`<div id="root">
      <div data-root="true" id="part-root">
        <div id="wrapper">
          <div data-component="true" id="nested-component"></div>
        </div>
        <div data-component="true" id="non-nested-component"></div>
      </div>
      <div id="external"></div>
    </div>`)

    const root = doc.getElementById('root')
    const partRoot = doc.getElementById('part-root')
    const wrapper = doc.getElementById('wrapper')
    const nested = doc.getElementById('nested-component')
    const nonNested = doc.getElementById('non-nested-component')
    const external = doc.getElementById('external')

    registerDummyTree(partRoot, registry)

    it('should properly determine if a component is part of the diagram part', () => {
      expect(registry.root.dom).toBe(partRoot)

      expect(helper.partContains(partRoot)).toBe(true)
      expect(helper.partContains(wrapper)).toBe(true)
      expect(helper.partContains(nested)).toBe(true)
      expect(helper.partContains(nonNested)).toBe(true)

      expect(helper.partContains(root)).toBe(false)
      expect(helper.partContains(external)).toBe(false)
    })
  })
})
