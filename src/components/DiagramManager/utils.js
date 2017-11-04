import { DIAGRAM_TYPE, LAYER_TYPE, NODE_TYPE, CONNECTION_TYPE, PORT_TYPE } from '../../constants'
import { fillObject, constant } from '../../utils/functions'

export const ALL_TYPES = [DIAGRAM_TYPE, LAYER_TYPE, NODE_TYPE, CONNECTION_TYPE, PORT_TYPE]

export const ALLOWED_TYPES = fillObject(ALL_TYPES, constant(true))

export const fillComponentStore = () => fillObject(ALL_TYPES, () => ({}))

export const assertType = (type) => {
  if (ALLOWED_TYPES[type] !== true) {
    throw new TypeError(`unknown type "${type}"`)
  }
}

export const assertComponent = (node) => {
  if (typeof node !== 'object') {
    throw new TypeError(`node should be a jsx node, got ${node} (${typeof node}) instead`)
  }
}

export const assertId = (id) => {
  if (typeof id !== 'string') {
    throw new TypeError(`id should be a string, got "${id}" (${typeof id}) instead`)
  }
}

export const getComponent = (components, id, type) => {
  assertType(type)
  return components[type][id] || null
}

export const configOf = (component) => component.props.config
