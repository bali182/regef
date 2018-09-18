import { SelectionProvider } from './SelectionProvider'
import { ComponentWrapper } from './ComponentWrapper';
import { DiagramPartWrapper } from './DiagramPartWrapper';
import { Engine } from './Engine';
import { EditPolicy } from './EditPolicy';
import { Intent, Id } from './constants';


const matchesSingleType = (type: Id) => ({ component }: ComponentWrapper) => component.type === type

const matchesMultiTypes = (types: Id[]) => ({ component }: ComponentWrapper) => types.indexOf(component.type) >= 0

const matchesSinglePart = (partId: Id) => (part: DiagramPartWrapper) => part.id === partId

const matchesMultiParts = (partIds: Id[]) => (part: DiagramPartWrapper) => partIds.indexOf(part.id) >= 0

export const alwaysTrue = () => true

export const getSelection = (engine: Engine) => {
  if (engine && engine.selectionProvider instanceof SelectionProvider) {
    return engine.selectionProvider.selection()
  }
  return []
}

export const typeMatches = (types: Id | Id[]) => {
  if (types === null || types === undefined) {
    return alwaysTrue
  } else if (Array.isArray(types)) {
    return matchesMultiTypes(types)
  }
  return matchesSingleType(types)
}

export const partMatches = (ids: Id[]) => {
  if (ids === null || ids === undefined) {
    return alwaysTrue
  } else if (Array.isArray(ids)) {
    return matchesMultiParts(ids)
  }
  return matchesSinglePart(ids)
}

const onEachPolicy = (callback: (e: EditPolicy, i: Intent) => void) => (policies: EditPolicy[], intent: Intent): void => {
  if (Array.isArray(policies) && intent && intent.type) {
    for (let i = 0; i < policies.length; i += 1) {
      callback(policies[i], intent)
    }
  }
}

export const perform = onEachPolicy((policy, intent) => policy.perform(intent))
export const requestFeedback = onEachPolicy((policy, intent) => policy.requestFeedback(intent))
export const eraseFeedback = onEachPolicy((policy, intent) => policy.eraseFeedback(intent))

export const getParts = (engine: Engine, ids: Id[] = null): DiagramPartWrapper[] => {
  if (ids === null || ids === undefined) {
    return engine.allParts()
  }
  return ids.map((id) => engine.part(id))
}

// https://stackoverflow.com/a/12737882/1126273
export const isLeftButton = (e: MouseEvent & any) => {
  if ('buttons' in e) {
    return e.buttons === 1
  } else if ('which' in e) {
    return e.which === 1
  }
  return e.button === 1
}
