const matches = (target, wrapper) => {
  const { userComponent, dom, component } = wrapper
  return wrapper === target
    || userComponent === target
    || dom === target
    || component === target
}

export const watchRegister = (registry, target) => new Promise((resolve, reject) => {
  if (registry.has(target)) {
    resolve()
    return
  }
  const listener = (wrapper) => {
    if (matches(target, wrapper)) {
      try {
        resolve()
      } catch (e) {
        reject(e)
      } finally {
        registry.removeRegisterListener(listener)
      }
    }
  }
  registry.addRegisterListener(listener)
})
