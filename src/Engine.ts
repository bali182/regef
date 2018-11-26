import { EventManager } from './EventManager'
import { Toolkit } from './Toolkit'
import { DomHelper } from './DomHelper'
import { Capability } from './Capability'
import { EditPolicy } from './EditPolicy'
import { SelectionProvider } from './SelectionProvider'
import { DiagramPartWrapper } from './DiagramPartWrapper'
import { Id, EngineConfig, EngineConfigProvider } from './typings'

const DEFAULT_ENGINE_CONFIG: EngineConfig = {
  capabilities: [],
  editPolicies: [],
  selectionProvider: null,
  htmlDocument: document,
}

export class Engine {
  // From config
  public readonly capabilities: Capability[]
  public readonly editPolicies: EditPolicy[]
  public readonly selectionProvider: SelectionProvider
  public readonly htmlDocument: Document
  // Extra properties
  public readonly toolkit: Toolkit
  public readonly eventManager: EventManager
  public readonly domHelper: DomHelper
  public readonly rootType: Id

  /** @internal */
  public readonly __parts: Map<Id, DiagramPartWrapper> = new Map()

  constructor(config: EngineConfigProvider = () => DEFAULT_ENGINE_CONFIG) {
    this.toolkit = new Toolkit(this)
    this.eventManager = new EventManager(this)
    this.domHelper = new DomHelper(this)

    const evaluatedConfig = { ...DEFAULT_ENGINE_CONFIG, ...config(this) }

    this.capabilities = evaluatedConfig.capabilities
    this.editPolicies = evaluatedConfig.editPolicies
    this.selectionProvider = evaluatedConfig.selectionProvider
    this.htmlDocument = evaluatedConfig.htmlDocument || document
  }
  part(id: Id): DiagramPartWrapper {
    return this.__parts.get(id)
  }
  allParts(): DiagramPartWrapper[] {
    return Array.from(this.__parts.values())
  }
}
