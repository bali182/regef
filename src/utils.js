const matchesSingleType = (type) => ({ component }) => component.type === type

const matchesMultiTypes = (types) => ({ component }) => types.indexOf(component.type) >= 0

const matchesSinglePart = (partId) => (part) => part.id === partId

const matchesMultiParts = (partIds) => (part) => partIds.indexOf(part.id) >= 0

const alwaysTrue = () => true

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
