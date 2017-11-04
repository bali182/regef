
import { DATA_ID, DATA_TYPE, DATA_CONTAINER_ID } from '../constants'

const createDataAttributes = ({ id, type, container }) => ({
  [DATA_ID]: id,
  [DATA_TYPE]: type,
  ...(container ? { [DATA_CONTAINER_ID]: container } : {}),
})

export default createDataAttributes
