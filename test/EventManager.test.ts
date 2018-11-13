import { Capability } from '../src/Capability'
import { Engine } from '../src/Engine'
import { EventManager } from '../src/EventManager'
import { EventCreator, mockDocument } from './testUtils'

describe('EventManager', () => {
  afterEach(() => jest.clearAllMocks())

  it('should hook/unhook the 5 document listeners when EventManager#hookListeners is called', () => {
    const mockEngine = { htmlDocument: mockDocument(`<div />`) } as Engine
    const eventManager = new EventManager(mockEngine)
    const addEventListenerSpy = jest.spyOn(mockEngine.htmlDocument, 'addEventListener')
    const removeEventListenerSpy = jest.spyOn(mockEngine.htmlDocument, 'removeEventListener')

    expect(eventManager.hooked).toBe(false)

    eventManager.hookListeners()

    expect(eventManager.hooked).toBe(true)
    expect(addEventListenerSpy).toHaveBeenCalledTimes(5)

    eventManager.unhookListeners()

    expect(eventManager.hooked).toBe(false)
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(5)
  })

  it('should dispatch events to the registered Capability', () => {
    const dummyCapability = new Capability<void>(null, null)
    const dummyEngine = {
      capabilities: [dummyCapability],
      htmlDocument: mockDocument(`<div />`),
    } as Engine
    const eventManager = new EventManager(dummyEngine)

    eventManager.hookListeners()

    const mouseDownSpy = jest.spyOn(dummyCapability, 'onMouseDown')
    const mouseMoveSpy = jest.spyOn(dummyCapability, 'onMouseMove')
    const mouseUpSpy = jest.spyOn(dummyCapability, 'onMouseUp')
    const keyDownSpy = jest.spyOn(dummyCapability, 'onKeyDown')
    const keyUpSpy = jest.spyOn(dummyCapability, 'onKeyUp')

    const ec = new EventCreator(dummyEngine.htmlDocument)

    dummyEngine.htmlDocument.dispatchEvent(ec.mouseDown())
    expect(mouseDownSpy).toHaveBeenCalledTimes(1)

    dummyEngine.htmlDocument.dispatchEvent(ec.mouseMove())
    expect(mouseMoveSpy).toHaveBeenCalledTimes(1)

    dummyEngine.htmlDocument.dispatchEvent(ec.mouseUp())
    expect(mouseUpSpy).toHaveBeenCalledTimes(1)

    dummyEngine.htmlDocument.dispatchEvent(ec.keyDown())
    expect(keyDownSpy).toHaveBeenCalledTimes(1)

    dummyEngine.htmlDocument.dispatchEvent(ec.keyUp())
    expect(keyUpSpy).toHaveBeenCalledTimes(1)

    eventManager.unhookListeners()
  })
})
