import SelectionProvider from './SelectionProvider'

const matchesSingleType = (type) => ({ component }) => component.type === type

const matchesMultiTypes = (types) => ({ component }) => types.indexOf(component.type) >= 0

const matchesSinglePart = (partId) => (part) => part.id === partId

const matchesMultiParts = (partIds) => (part) => partIds.indexOf(part.id) >= 0

export const alwaysTrue = () => true

export const getSelection = (engine) => {
  if (engine && engine.selectionProvider instanceof SelectionProvider) {
    return engine.selectionProvider.selection()
  }
  return []
}

export const typeMatches = (types) => {
  if (types === null || types === undefined) {
    return alwaysTrue
  } else if (Array.isArray(types)) {
    return matchesMultiTypes(types)
  }
  return matchesSingleType(types)
}

export const partMatches = (ids) => {
  if (ids === null || ids === undefined) {
    return alwaysTrue
  } else if (Array.isArray(ids)) {
    return matchesMultiParts(ids)
  }
  return matchesSinglePart(ids)
}

export const perform = (policies, intent) => policies
  .forEach((policy) => policy.perform(intent))

export const requestFeedback = (policies, intent) => policies
  .forEach((policy) => policy.requestFeedback(intent))

export const eraseFeedback = (policies, intent) => policies
  .forEach((policy) => policy.eraseFeedback(intent))

export const getParts = (engine, ids = null) => {
  if (ids === null || ids === undefined) {
    return engine.parts
  }
  return ids.map((id) => engine.part(id))
}
