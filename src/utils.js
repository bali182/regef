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

const onEachPolicy = (callback) => (policies, intent) => {
  if (Array.isArray(policies) && intent && intent.type) {
    for (let i = 0; i < policies.length; i += 1) {
      callback(policies[i], intent)
    }
  }
}

export const perform = onEachPolicy((policy, intent) => policy.perform(intent))
export const requestFeedback = onEachPolicy((policy, intent) => policy.requestFeedback(intent))
export const eraseFeedback = onEachPolicy((policy, intent) => policy.eraseFeedback(intent))

export const getParts = (engine, ids = null) => {
  if (ids === null || ids === undefined) {
    return engine.parts
  }
  return ids.map((id) => engine.part(id))
}

// https://stackoverflow.com/a/12737882/1126273
export const isLeftButton = (e) => {
  if ('buttons' in e) {
    return e.buttons === 1
  } else if ('which' in e) {
    return e.which === 1
  }
  return e.button === 1
}
