import createVisitior from './createVisitor'
import PanHandler from './handlers/PanHandler'
import NoopHandler from './handlers/Handler'

const createHandlerVisitor = createVisitior({
  node(e, registry) {
    return new NoopHandler(registry)
  },
  diagram(e, registry) {
    return new PanHandler(registry)
  },
  any(e, registry) {
    return new NoopHandler(registry)
  },
})

export default createHandlerVisitor
