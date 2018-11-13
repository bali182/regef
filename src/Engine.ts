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
  rootType: null,
  types: [],
  htmlDocument: document,
}

export class Engine {
  public readonly toolkit: Toolkit
  public readonly eventManager: EventManager
  public readonly domHelper: DomHelper
  public readonly capabilities: Capability[]
  public readonly editPolicies: EditPolicy[]
  public readonly selectionProvider: SelectionProvider
  public readonly types: Id[]
  public readonly rootType: Id
  public readonly htmlDocument: Document

  /** @internal */
  public readonly __parts: Map<Id, DiagramPartWrapper>

  constructor(config: EngineConfigProvider = () => DEFAULT_ENGINE_CONFIG) {
    this.toolkit = new Toolkit(this)
    this.eventManager = new EventManager(this)
    this.domHelper = new DomHelper(this)
    this.__parts = new Map()

    const evaluatedConfig = { ...DEFAULT_ENGINE_CONFIG, ...config(this) }

    this.capabilities = evaluatedConfig.capabilities
    this.editPolicies = evaluatedConfig.editPolicies
    this.selectionProvider = evaluatedConfig.selectionProvider
    this.types = evaluatedConfig.types
    this.rootType = evaluatedConfig.rootType
    this.htmlDocument = evaluatedConfig.htmlDocument || document
  }
  part(id: Id): DiagramPartWrapper {
    return this.__parts.get(id)
  }
  allParts(): DiagramPartWrapper[] {
    return Array.from(this.__parts.values())
  }
}
