import Capability from './Capability'
import { partMatches } from './utils'

export default class CancelCapability extends Capability {
  constructor(engine, config = { parts: null, keys: ['Escape'] }) {
    super(engine)
    this.config = config
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
