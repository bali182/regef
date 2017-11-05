import createVisitior from '../utils/visitor'
import { DATA_TYPE } from '../constants'

const getType = (target) => {
  if (!target || !target.getAttribute) {
    return null
  }
  return target.getAttribute(DATA_TYPE)
}

const visitorMethods = {
  node(e) {
    console.log('node', e.target)
  },
  diagram(e) {
    console.log('diagram', e.target)
  },
  any(e) {
    console.log('any', e.target)
  },
}

const classifier = (e) => getType(e.target)

const testVisitor = createVisitior(visitorMethods, classifier)

export default testVisitor
