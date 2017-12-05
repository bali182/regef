import { NODE_TYPE, PORT_TYPE } from './constants'
import createDecorator from './createDecorator'

export const node = createDecorator(NODE_TYPE)
export const port = createDecorator(PORT_TYPE)
