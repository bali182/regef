import React from 'react'
import { REGEF_PROP_KEY } from './constants'

export const RegefContext = React.createContext({
  id: null,
  engine: null,
})

export function withRegefContext(Wrapped: React.ComponentClass<any>) {
  function WithRegefContext(props: any) {
    return (<RegefContext.Consumer>
      {(regef) => <Wrapped {...props} {...{ [REGEF_PROP_KEY]: regef }} />}
    </RegefContext.Consumer>)
  }
  return WithRegefContext
}

export default RegefContext
