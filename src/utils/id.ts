const ID = 'data-regef-id'
const CONTAINER_ID = 'data-regef-container-id'
const TYPE = 'data-regef-type'

const DIAGRAM_TYPE = 'diagram'
const LAYER_TYPE = 'layer'
const NODE_TYPE = 'node'
const PORT_TYPE = 'port'
const CONNECTION_TYPE = 'connection'

type ElementType = typeof DIAGRAM_TYPE | typeof LAYER_TYPE | typeof NODE_TYPE | typeof PORT_TYPE | typeof CONNECTION_TYPE

type CreateInput = {
  id?: string
  type: ElementType,
  container?: string
}

export const id = () => Math.random().toString(36).slice(2, 9)

export const create = (input: CreateInput) => ({
  [ID]: input.id ? input.id : id(),
  [TYPE]: input.type,
  ...(input.container ? { [CONTAINER_ID]: input.container } : {})
})