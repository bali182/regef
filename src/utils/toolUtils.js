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

export const isElementRelevant = (element, root) => {
  if (element === root) {
    return true
  }
  // eslint-disable-next-line
  return Boolean(element.compareDocumentPosition(root) & Node.DOCUMENT_POSITION_CONTAINS)
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

export const buildInitialEventDeltas = (e, element) => {
  const { clientX, clientY } = e
  const { top, left } = element.getBoundingClientRect()
  const deltaX = clientX - left
  const deltaY = clientY - top
  return {
    deltaX,
    deltaY,
  }
}

export const buildEventCoordinates = ({ clientX, clientY }, { deltaX, deltaY }) => ({
  x: clientX - deltaX,
  y: clientY - deltaY,
})

export const findTargetedParent = (e, target, currentParent, root, registry) => {
  const targetDom = findPrimaryTarget(e.target, root, registry)
  if (targetDom === target || target.contains(targetDom)) {
    return currentParent
  }
  return targetDom
}

export const getCommandSafe = (request, component) => {
  if (!component || !component.getCommand) {
    return null
  }
  return component.getCommand(request)
}
