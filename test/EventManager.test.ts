import { Capability } from '../src/Capability'
import { Engine } from '../src/Engine'
import { EventManager } from '../src/EventManager'
import { mouseDownEvent, mouseMoveEvent, mouseUpEvent, keyDownEvent, keyUpEvent } from './testUtils'

describe('EventManager', () => {
  afterEach(() => jest.clearAllMocks())

  it('should hook/unhook the 5 document listeners when EventManager#hookListeners is called', () => {
    const eventManager = new EventManager(null)
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener')
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener')

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
    const dummyEngine = { capabilities: [dummyCapability] } as Engine
    const eventManager = new EventManager(dummyEngine)

    eventManager.hookListeners()

    const mouseDownSpy = jest.spyOn(dummyCapability, 'onMouseDown')
    const mouseMoveSpy = jest.spyOn(dummyCapability, 'onMouseMove')
    const mouseUpSpy = jest.spyOn(dummyCapability, 'onMouseUp')
    const keyDownSpy = jest.spyOn(dummyCapability, 'onKeyDown')
    const keyUpSpy = jest.spyOn(dummyCapability, 'onKeyUp')

    document.dispatchEvent(mouseDownEvent())
    expect(mouseDownSpy).toHaveBeenCalledTimes(1)

    document.dispatchEvent(mouseMoveEvent())
    expect(mouseMoveSpy).toHaveBeenCalledTimes(1)

    document.dispatchEvent(mouseUpEvent())
    expect(mouseUpSpy).toHaveBeenCalledTimes(1)

    document.dispatchEvent(keyDownEvent())
    expect(keyDownSpy).toHaveBeenCalledTimes(1)

    document.dispatchEvent(keyUpEvent())
    expect(keyUpSpy).toHaveBeenCalledTimes(1)

    eventManager.unhookListeners()
  })
})
