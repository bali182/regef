import { DispatchingEditPolicy } from '../src/DispatchingEditPolicy'
import { IntentType } from '../src/typings'
import { dummyIntent } from './testUtils'

describe('DispatchingEditPolicy', () => {
  afterEach(() => jest.clearAllMocks())

  const addIntent = dummyIntent(IntentType.ADD)
  const moveIntent = dummyIntent(IntentType.MOVE)
  const delIntent = dummyIntent(IntentType.DELETE)
  const endConnIntent = dummyIntent(IntentType.END_CONNECTION)
  const selIntent = dummyIntent(IntentType.SELECT)
  const startConnIntent = dummyIntent(IntentType.START_CONNECTION)
  const unknownIntent = dummyIntent('x' as IntentType)

  const policy = new DispatchingEditPolicy()

  it('should dispatch to the right "perform" type method', () => {
    const addSpy = jest.spyOn(policy, 'add')
    const moveSpy = jest.spyOn(policy, 'move')
    const delSpy = jest.spyOn(policy, 'delete')
    const endConnSpy = jest.spyOn(policy, 'endConnection')
    const selSpy = jest.spyOn(policy, 'select')
    const startConnSpy = jest.spyOn(policy, 'startConnection')

    policy.perform(addIntent)
    expect(addSpy).toHaveBeenCalledTimes(1)

    policy.perform(moveIntent)
    expect(moveSpy).toHaveBeenCalledTimes(1)

    policy.perform(delIntent)
    expect(delSpy).toHaveBeenCalledTimes(1)

    policy.perform(endConnIntent)
    expect(endConnSpy).toHaveBeenCalledTimes(1)

    policy.perform(selIntent)
    expect(selSpy).toHaveBeenCalledTimes(1)

    policy.perform(startConnIntent)
    expect(startConnSpy).toHaveBeenCalledTimes(1)

    expect(() => policy.perform(unknownIntent)).toThrow()
  })

  it('should dispatch to the right "requestFeedback" type method', () => {
    const addSpy = jest.spyOn(policy, 'requestAddFeedback')
    const moveSpy = jest.spyOn(policy, 'requestMoveFeedback')
    const endConnSpy = jest.spyOn(policy, 'requestEndConnectionFeedback')
    const selSpy = jest.spyOn(policy, 'requestSelectFeedback')
    const startConnSpy = jest.spyOn(policy, 'requestStartConnectionFeedback')

    policy.requestFeedback(addIntent)
    expect(addSpy).toHaveBeenCalledTimes(1)

    policy.requestFeedback(moveIntent)
    expect(moveSpy).toHaveBeenCalledTimes(1)

    policy.requestFeedback(endConnIntent)
    expect(endConnSpy).toHaveBeenCalledTimes(1)

    policy.requestFeedback(selIntent)
    expect(selSpy).toHaveBeenCalledTimes(1)

    policy.requestFeedback(startConnIntent)
    expect(startConnSpy).toHaveBeenCalledTimes(1)

    expect(() => policy.requestFeedback(unknownIntent)).toThrow()
  })

  it('should dispatch to the right "eraseFeedback" type method', () => {
    const addSpy = jest.spyOn(policy, 'eraseAddFeedback')
    const moveSpy = jest.spyOn(policy, 'eraseMoveFeedback')
    const endConnSpy = jest.spyOn(policy, 'eraseEndConnectionFeedback')
    const selSpy = jest.spyOn(policy, 'eraseSelectFeedback')
    const startConnSpy = jest.spyOn(policy, 'eraseStartConnectionFeedback')

    policy.eraseFeedback(addIntent)
    expect(addSpy).toHaveBeenCalledTimes(1)

    policy.eraseFeedback(moveIntent)
    expect(moveSpy).toHaveBeenCalledTimes(1)

    policy.eraseFeedback(endConnIntent)
    expect(endConnSpy).toHaveBeenCalledTimes(1)

    policy.eraseFeedback(selIntent)
    expect(selSpy).toHaveBeenCalledTimes(1)

    policy.eraseFeedback(startConnIntent)
    expect(startConnSpy).toHaveBeenCalledTimes(1)

    expect(() => policy.eraseFeedback(unknownIntent)).toThrow()
  })
})
