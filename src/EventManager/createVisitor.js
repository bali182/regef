import { noop } from '../utils/functions'
import { DATA_TYPE } from '../constants'

const classifier = ({ target }) => ((target && target.getAttribute)
  ? target.getAttribute(DATA_TYPE) || null
  : null)

const createVisitor = (visitor = {}) => (input, ...args) => {
  const methodName = classifier(input)
  const method = visitor[methodName] || noop
  const result = method.call(visitor, input, ...args)
  return result
}

export default createVisitor
