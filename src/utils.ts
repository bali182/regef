import { Component } from 'react'
import { SelectionProvider } from './SelectionProvider'
import { ComponentWrapper } from './ComponentWrapper'
import { DiagramPartWrapper } from './DiagramPartWrapper'
import { Engine } from './Engine'
import { EditPolicy } from './EditPolicy'
import { Intent, Id } from './constants'

export function matchesSingleType(type: Id): (wrapper: ComponentWrapper) => boolean {
  return ({ component }: ComponentWrapper) => component.type === type
}

export function matchesMultiTypes(types: Id[]): (wrapper: ComponentWrapper) => boolean {
  return ({ component }: ComponentWrapper) => types.indexOf(component.type) >= 0
}

export function matchesSinglePart(partId: Id): (part: DiagramPartWrapper) => boolean {
  return (part: DiagramPartWrapper) => part.id === partId
}

export function matchesMultiParts(partIds: Id[]): (part: DiagramPartWrapper) => boolean {
  return (part: DiagramPartWrapper) => partIds.indexOf(part.id) >= 0
}

export function alwaysTrue(): true {
  return true
}

export function getSelection(engine: Engine): Component[] {
  if (engine && engine.selectionProvider instanceof SelectionProvider) {
    return engine.selectionProvider.selection()
  }
  return []
}

export function typeMatches(types: Id | Id[]): (wrapper: ComponentWrapper) => boolean {
  if (types === null || types === undefined) {
    return alwaysTrue
  } else if (Array.isArray(types)) {
    return matchesMultiTypes(types)
  }
  return matchesSingleType(types)
}

export function partMatches(ids: Id[]): (part: DiagramPartWrapper) => boolean {
  if (ids === null || ids === undefined) {
    return alwaysTrue
  } else if (Array.isArray(ids)) {
    return matchesMultiParts(ids)
  }
  return matchesSinglePart(ids)
}

function onEachPolicy(
  callback: (e: EditPolicy, i: Intent) => void,
): (policies: EditPolicy[], intent: Intent) => void {
  return (policies: EditPolicy[], intent: Intent): void => {
    if (Array.isArray(policies) && intent && intent.type) {
      for (let i = 0; i < policies.length; i += 1) {
        callback(policies[i], intent)
      }
    }
  }
}

export const perform = onEachPolicy((policy, intent) => policy.perform(intent))
export const requestFeedback = onEachPolicy((policy, intent) => policy.requestFeedback(intent))
export const eraseFeedback = onEachPolicy((policy, intent) => policy.eraseFeedback(intent))

export function getParts(engine: Engine, ids: Id[] = null): DiagramPartWrapper[] {
  if (ids === null || ids === undefined) {
    return engine.allParts()
  }
  return ids.map((id) => engine.part(id))
}

// https://stackoverflow.com/a/12737882/1126273
export function isLeftButton(e: MouseEvent & any): boolean {
  if ('buttons' in e) {
    return e.buttons === 1
  } else if ('which' in e) {
    return e.which === 1
  }
  return e.button === 1
}
