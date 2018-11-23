import { mockDocument, EventCreator, mockCapability } from './testUtils'
import { CancelCapability, Engine } from '../src'

describe('CancelCapability', () => {
  afterEach(() => jest.clearAllMocks())

  it('should cancel all capabilities when the configurated key is pressed (no parts provided).', () => {
    const htmlDocument = mockDocument('<div />')
    const mockedCapability = mockCapability()
    const engine = new Engine((e) => {
      const cancel = new CancelCapability(e, { keys: ['Escape', 'a', 'x'], parts: null })
      cancel.focusOnTargetedParts = () => true
      return {
        htmlDocument,
        capabilities: [mockedCapability, cancel],
      }
    })
    const ec = new EventCreator(engine.htmlDocument)

    // registered keys
    engine.eventManager.onKeyDown(ec.keyDown({ key: 'Escape' }))
    engine.eventManager.onKeyDown(ec.keyDown({ key: 'a' }))
    engine.eventManager.onKeyDown(ec.keyDown({ key: 'x' }))

    expect(mockedCapability.cancel).toHaveBeenCalledTimes(3)

    // npn-registered keys
    engine.eventManager.onKeyDown(ec.keyDown({ key: 'c' }))
    engine.eventManager.onKeyDown(ec.keyDown({ key: 'z' }))
    engine.eventManager.onKeyDown(ec.keyDown({ key: 'g' }))

    expect(mockedCapability.cancel).toHaveBeenCalledTimes(3)
  })
})
