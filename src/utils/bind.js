
const has = (object, key) => Object.prototype.hasOwnProperty.call(object, key)

function bind(target, key, descriptor) {
  let fn = descriptor.value
  let definingProperty = false

  return {
    configurable: true,
    get() {
      if (definingProperty || this === target.prototype || has(this, key) || typeof fn !== 'function') {
        return fn
      }
      const boundFn = fn.bind(this)
      definingProperty = true
      Object.defineProperty(this, key, {
        configurable: true,
        get() {
          return boundFn
        },
        set(value) {
          fn = value
          delete this[key]
        },
      })
      definingProperty = false
      return boundFn
    },
    set(value) {
      fn = value
    },
  }
}

export default bind
