import { DATA_ID, DATA_TYPE } from '../constants'

export const getType = (target) => {
  if (!target || !target.getAttribute) {
    return null
  }
  return target.getAttribute(DATA_TYPE)
}

export const getId = (target) => {
  if (!target || !target.getAttribute) {
    return null
  }
  return target.getAttribute(DATA_ID)
}

export const getComponent = ({ target }, registry) => {
  const id = getId(target)
  const type = getType(target)
  return (id && type) ? registry.get(id, type) : null
}
