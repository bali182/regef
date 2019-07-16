import { dummyElement, dummyUserComponent, dummyRegefComponent } from './testUtils'
import { ComponentWrapper } from '../src/ComponentWrapper'

describe('ComponentWrapper', () => {
  afterEach(() => jest.clearAllMocks())

  it('should set fields properly on constructor call', () => {
    const dom = dummyElement()
    const userComponent = dummyUserComponent()
    const regefComponent = dummyRegefComponent()
    const wrapper = new ComponentWrapper(dom, regefComponent, userComponent)
    expect(wrapper.dom).toBe(dom)
    expect(wrapper.component).toBe(regefComponent)
    expect(wrapper.userComponent).toBe(userComponent)
  })
})
