import { Capability } from './Capability'
import { IntentType, DeleteIntent, DeleteCapabilityConfig } from './typings'
import { perform, partMatches, getSelection } from './utils'
import { Engine } from './Engine'

const DEFAULT_CONFIG: DeleteCapabilityConfig = {
  parts: null,
  keys: ['Backspace', 'Delete'],
}

export class DeleteCapability extends Capability {
  private currentSelection: any[] = null

  constructor(engine: Engine, config: DeleteCapabilityConfig = {}) {
    super(engine, { ...DEFAULT_CONFIG, ...config })
    this.init()
  }

  private init(): void {
    this.currentSelection = []
    this.progress = false
  }

  private getDeleteRequest(): DeleteIntent {
    return {
      type: IntentType.DELETE,
      selection: this.currentSelection,
    }
  }

  private focusOnTargetedParts(target: Element): boolean {
    return Boolean(this.engine.domHelper.findPart(target, partMatches(this.config.parts)))
  }

  private keyMatches(key: string): boolean {
    return this.config.keys.indexOf(key) >= 0
  }

  onKeyDown({ key, target }: KeyboardEvent): void {
    if (this.keyMatches(key) && this.focusOnTargetedParts(target as Element)) {
      this.currentSelection = getSelection(this.engine)
      if (this.currentSelection.length > 0) {
        perform(this.engine.editPolicies, this.getDeleteRequest())
      }
    }
    this.init()
  }
}
