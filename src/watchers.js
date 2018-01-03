export const watchRegister = (registry, target) => new Promise((resolve, reject) => {
  if (registry.has(target)) {
    resolve()
    return
  }
  try {
    const listener = (wrapper) => {
      const { userComponent, dom, component } = wrapper
      if (wrapper === target
        || userComponent === target
        || dom === target
        || component === target) {
        resolve()
        registry.removeRegisterListener(listener)
      }
    }
    registry.addRegisterListener(listener)
  } catch (e) {
    reject(e)
  }
})

export const watchUnregister = (registry, target) => new Promise((resolve, reject) => {
  if (registry.has(target)) {
    resolve()
    return
  }
  try {
    const listener = (wrapper) => {
      const { userComponent, dom, component } = wrapper
      if (wrapper === target
        || userComponent === target
        || dom === target
        || component === target) {
        resolve()
        registry.removeUnregisterListener(listener)
      }
    }
    registry.addUnregisterListener(listener)
  } catch (e) {
    reject(e)
  }
})
