import { Capability } from './Capability'
import { partMatches } from './utils'
import { Engine } from './Engine'
import { Id } from './constants';

interface CancelCapabilityConfig {
  parts?: Id[]
  keys?: string[]
}

const DEFAULT_CONFIG: CancelCapabilityConfig = {
  parts: null,
  keys: ['Escape'],
}

export default class CancelCapability extends Capability<CancelCapabilityConfig> {
  constructor(engine: Engine, config: CancelCapabilityConfig = {}) {
    super(engine, { ...DEFAULT_CONFIG, ...config })
  }

  focusOnTargetedParts(target: Element): boolean {
    return Boolean(this.engine.domHelper.findPart(target, partMatches(this.config.parts)))
  }

  keyMatches(key: string): boolean {
    return this.config.keys.indexOf(key) >= 0
  }

  onKeyDown({ key, target }: KeyboardEvent): void {
    if (this.keyMatches(key) && this.focusOnTargetedParts(target as Element)) {
      this.engine.capabilities.forEach((capability) => capability.cancel())
    }
  }
}
