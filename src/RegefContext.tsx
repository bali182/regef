import React from 'react'
import { REGEF_PROP_KEY, DiagramPartProps } from './typings'

export const RegefContext = React.createContext<DiagramPartProps>({
  id: null,
  engine: null,
  rootType: null,
})

export function withRegefContext(Wrapped: React.ComponentClass<any>) {
  class WithRegefContext extends React.Component<any> {
    render() {
      return (
        <RegefContext.Consumer>
          {(context: DiagramPartProps) => {
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

export default DiagramPartProps
