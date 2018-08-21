import Capability from './Capability'
import { partMatches } from './utils'

const DEFAULT_CONFIG = {
  parts: null,
  keys: ['Escape'],
}

export default class CancelCapability extends Capability {
  constructor(engine, config = {}) {
    super(engine)
    this.config = { ...DEFAULT_CONFIG, ...config }
  }

  focusOnTargetedParts(target) {
    return Boolean(this.engine.domHelper.findPart(target, partMatches(this.config.parts)))
  }

  keyMatches(key) {
    return this.config.keys.indexOf(key) >= 0
  }

  onKeyDown({ key, target }) {
    if (this.keyMatches(key) && this.focusOnTargetedParts(target)) {
      this.engine.capabilities.forEach((capability) => capability.cancel())
    }
  }
}
