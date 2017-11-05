import { noop } from './functions'

const createVisitor = (visitor = {}, classifier) => (input, ...args) => {
  const methodName = classifier(input)
  const method = (visitor[methodName] || visitor.any || noop)
  const result = method.call(visitor, input, ...args)
  return result
}

export default createVisitor
