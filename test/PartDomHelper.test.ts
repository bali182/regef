import { PartDomHelper } from '../src/PartDomHelper'
import { ComponentWrapper } from '../src/ComponentWrapper'
import { ComponentRegistry } from '../src/ComponentRegistry'
import { JSDOM, ConstructorOptions } from 'jsdom'
import { registerDummyTree } from './testUtils'

describe('PartDomHelper', () => {
  afterEach(() => jest.clearAllMocks())

  const jsdomConfig: ConstructorOptions = {
    contentType: 'text/xml',
  }

  describe('#findClosest', () => {
    const registry = new ComponentRegistry()
    const helper = new PartDomHelper(registry)
    const html = `<div data-root="true" id="root">
      <div id="wrapper">
        <div data-component="true" id="hello-component">
          <div id="hello-component-child"></div>
        </div>
      </div>
    </div>`
    const tree = new JSDOM(html, jsdomConfig)

    const root = tree.window.document.getElementById('root')
    const wrapper = tree.window.document.getElementById('wrapper')
    const helloComponent = tree.window.document.getElementById('hello-component')
    const helloComponentChild = tree.window.document.getElementById('hello-component-child')

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
    const html = `<div data-root="true" id="root">
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
    </div>`
    const tree = new JSDOM(html, jsdomConfig)

    const root = tree.window.document.getElementById('root')
    const nested = tree.window.document.getElementById('nested-component')
    const deeplyNested1 = tree.window.document.getElementById('deeply-nested-component-1')
    const deeplyNested2 = tree.window.document.getElementById('deeply-nested-component-2')
    const nonNested1 = tree.window.document.getElementById('non-nested-component-1')
    const nonNested2 = tree.window.document.getElementById('non-nested-component-2')

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
    const html = `<div id="root">
      <div data-root="true" id="part-root">
        <div id="wrapper">
          <div data-component="true" id="nested-component"></div>
        </div>
        <div data-component="true" id="non-nested-component"></div>
      </div>
      <div id="external"></div>
    </div>`
    const tree = new JSDOM(html, jsdomConfig)

    const root = tree.window.document.getElementById('root')
    const partRoot = tree.window.document.getElementById('part-root')
    const wrapper = tree.window.document.getElementById('wrapper')
    const nested = tree.window.document.getElementById('nested-component')
    const nonNested = tree.window.document.getElementById('non-nested-component')
    const external = tree.window.document.getElementById('external')

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
