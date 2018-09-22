import { EventManager } from './EventManager'
import { Toolkit } from './Toolkit'
import { DomHelper } from './DomHelper'
import { Capability } from './Capability'
import { EditPolicy } from './EditPolicy'
import { SelectionProvider } from './SelectionProvider'
import { DiagramPartWrapper } from './DiagramPartWrapper'
import { Id } from './constants'

type EngineConfig = {
  capabilities: Capability<any>[]
  editPolicies: EditPolicy[]
  selectionProvider: SelectionProvider
  rootType: Id
  types: Id[]
}

type EngineConfigProvider = (engine: Engine) => EngineConfig

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

  private _parts: Map<Id, DiagramPartWrapper>

  constructor(config: EngineConfigProvider = () => DefaultEngineConfig) {
    this.toolkit = new Toolkit(this)
    this.eventManager = new EventManager(this)
    this.domHelper = new DomHelper(this)
    this._parts = new Map()

    const { capabilities, editPolicies, selectionProvider, rootType, types } = config(this)

    this.capabilities = capabilities
    this.editPolicies = editPolicies
    this.selectionProvider = selectionProvider
    this.types = types
    this.rootType = rootType
  }
  __partsMap(): Map<Id, DiagramPartWrapper> {
    return this._parts
  }
  part(id: Id): DiagramPartWrapper {
    return this._parts.get(id)
  }
  allParts(): DiagramPartWrapper[] {
    return Array.from(this._parts.values())
  }
}
