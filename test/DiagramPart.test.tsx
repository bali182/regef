import React from 'react'
import { DiagramPart } from '../src/DiagramPart'
import { mount } from 'enzyme'
import { Engine } from '../src/Engine'
import { RegefInternalProps } from '../src'
import { RegefContext } from '../src/RegefContext'

describe('DiagramPart', () => {
  afterEach(() => jest.clearAllMocks())

  it('should mount/unmount without a problem when rendered without children', () => {
    mount(<DiagramPart id="test" engine={new Engine()} />).unmount()
  })

  it('should pass along the regef context to child consumers', () => {
    const id = '__TEST__'
    const engine = new Engine()
    const ChildComponent = jest.fn((props: RegefInternalProps) => {
      expect(props).not.toBe(null)
      expect(props.id).toBe(id)
      expect(props.engine).toBe(engine)
      return null
    })
    mount(
      <DiagramPart id={id} engine={engine}>
        <RegefContext.Consumer>{ChildComponent}</RegefContext.Consumer>
      </DiagramPart>,
    ).unmount()
    expect(ChildComponent).toHaveBeenCalledTimes(1)
  })
})
