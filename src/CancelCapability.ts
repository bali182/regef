import { Capability } from './Capability'
import { partMatches } from './utils'
import { Engine } from './Engine'
import { CancelCapabilityConfig } from './typings'

const DEFAULT_CONFIG: CancelCapabilityConfig = {
  parts: null,
  keys: ['Escape'],
}

export class CancelCapability extends Capability<CancelCapabilityConfig> {
  constructor(engine: Engine, config: CancelCapabilityConfig = {}) {
    super(engine, { ...DEFAULT_CONFIG, ...config })
  }

  /** @internal */
  focusOnTargetedParts(target: Element): boolean {
    return Boolean(this.engine.domHelper.findPart(target, partMatches(this.config.parts)))
  }

  protected keyMatches(key: string): boolean {
    return this.config.keys.indexOf(key) >= 0
  }

  onKeyDown({ key, target }: KeyboardEvent): void {
    if (this.keyMatches(key) && this.focusOnTargetedParts(target as Element)) {
      this.engine.capabilities.forEach((capability) => capability.cancel())
    }
  }
}
