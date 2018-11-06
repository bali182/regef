import { EventManager } from './EventManager'
import { Toolkit } from './Toolkit'
import { DomHelper } from './DomHelper'
import { Capability } from './Capability'
import { EditPolicy } from './EditPolicy'
import { SelectionProvider } from './SelectionProvider'
import { DiagramPartWrapper } from './DiagramPartWrapper'
import { Id, EngineConfig, EngineConfigProvider } from './typings'

const DefaultEngineConfig: EngineConfig = {
  capabilities: [],
  editPolicies: [],
  selectionProvider: null,
  rootType: null,
  types: [],
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

  /** @internal */
  public readonly __parts: Map<Id, DiagramPartWrapper>

  constructor(config: EngineConfigProvider = () => DefaultEngineConfig) {
    this.toolkit = new Toolkit(this)
    this.eventManager = new EventManager(this)
    this.domHelper = new DomHelper(this)
    this.__parts = new Map()

    const { capabilities, editPolicies, selectionProvider, rootType, types } = config(this)

    this.capabilities = capabilities
    this.editPolicies = editPolicies
    this.selectionProvider = selectionProvider
    this.types = types
    this.rootType = rootType
  }
  part(id: Id): DiagramPartWrapper {
    return this.__parts.get(id)
  }
  allParts(): DiagramPartWrapper[] {
    return Array.from(this.__parts.values())
  }
}
