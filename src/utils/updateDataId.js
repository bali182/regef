
import { DATA_ID } from '../constants'

const updateDataId = (component, get, set) => (id) => {
  const current = get()
  if (current[DATA_ID] === id) {
    return current
  }
  const updated = { ...current, [DATA_ID]: id }
  set(updated)
  return updated
}

export default updateDataId
