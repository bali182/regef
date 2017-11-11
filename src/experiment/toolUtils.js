import { findDOMNode } from 'react-dom'
import { DATA_ID } from '../constants'

export const isValidTarget = (element, root, registry) => {
  if (element === root) {
    return true
  }
  if (!element.getAttribute) {
    return false
  }
  if (!registry.has(element.getAttribute(DATA_ID))) {
    return false
  }
  return true
}

export const findClosestValidParent = (element, root, registry) => {
  let pointer = element.parentNode
  while (pointer !== root && pointer !== null) {
    if (isValidTarget(pointer, root, registry)) {
      return pointer
    }
    pointer = pointer.parentNode
  }
  return root
}

export const findAllTargets = (element, root, registry) => {
  const targets = []
  let pointer = element
  while (pointer !== root && pointer !== null) {
    if (isValidTarget(pointer, root, registry)) {
      targets.push(pointer)
    }
    pointer = pointer.parentNode
  }
  targets.push(root)
  return targets
}

export const findPrimaryTarget = (element, root, registry) => {
  if (isValidTarget(element, root, registry)) {
    return element
  }
  return findClosestValidParent(element, root, registry)
}

export const buildMouseDownData = (e, registry) => {
  const { target: eventTarget, clientX, clientY } = e

  const root = registry.getDiagramDom()

  const targetDom = findPrimaryTarget(eventTarget, root, registry)
  const parentDom = findClosestValidParent(targetDom, root, registry)

  const targetComponent = findDOMNode(targetDom)
  const parentComponent = findDOMNode(parentDom)

  const { top, left } = targetDom.getBoundingClientRect()
  const deltaX = clientX - left
  const deltaY = clientY - top

  return {
    targetComponent,
    parentComponent,
    targetDom,
    parentDom,
    deltaX,
    deltaY,
  }
}
