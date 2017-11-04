
export const ID = 'data-regef-id'
export const CONTAINER_ID = 'data-regef-container-id'
export const TYPE = 'data-regef-type'

export const DIAGRAM_TYPE = 'diagram'
export const LAYER_TYPE = 'layer'
export const NODE_TYPE = 'node'
export const PORT_TYPE = 'port'
export const CONNECTION_TYPE = 'connection'

export const COMPONENT_TYPE = Symbol('COMPONENT_TYPE')

export const create = ({ id, type, container }) => ({
  [ID]: id,
  [TYPE]: type,
  ...(container ? { [CONTAINER_ID]: container } : {}),
})
