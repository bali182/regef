import { ComponentWrapper } from './ComponentWrapper'
import { ComponentRegistry } from './ComponentRegistry'

const matches = (target: any, wrapper: ComponentWrapper) => {
  const { userComponent, dom, component } = wrapper
  return wrapper === target || userComponent === target || dom === target || component === target
}

export const watchRegister = (registry: ComponentRegistry, target: any) =>
  new Promise((resolve, reject) => {
    if (!registry || !target) {
      reject(new Error('registry or target was falsy value'))
      return
    }
    if (registry.has(target)) {
      resolve()
      return
    }
    const listener = (wrapper: ComponentWrapper) => {
      if (wrapper && matches(target, wrapper)) {
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
