import React from 'react'
import { REGEF_PROP_KEY, RegefInternalProps } from './typings'

export const RegefContext = React.createContext<RegefInternalProps>({
  id: null,
  engine: null,
})

export function withRegefContext(Wrapped: React.ComponentClass<any>) {
  class WithRegefContext extends React.Component<any> {
    render() {
      return (
        <RegefContext.Consumer>
          {(context: RegefInternalProps) => {
            const allProps: any = {
              ...this.props,
              [REGEF_PROP_KEY]: context,
            }
            return <Wrapped {...allProps} />
          }}
        </RegefContext.Consumer>
      )
    }
  }
  return WithRegefContext as any
}

export default RegefInternalProps
