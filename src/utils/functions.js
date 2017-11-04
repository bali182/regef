export const noop = () => { /* noop function */ }
export const constant = (value) => () => value
export const mandatory = (name) => () => {
  throw new TypeError(`method ${name} must be provided`)
}
export const fillObject = (keys = [], fn, initial = {}) => keys.reduce((object, key) => {
  // eslint-disable-next-line no-param-reassign
  object[key] = fn(key)
  return object
}, initial)
