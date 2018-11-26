import { ComponentRegistry } from './ComponentRegistry'
import { PartToolkit } from './PartToolkit'
import { PartDomHelper } from './PartDomHelper'
import { Engine } from './Engine'
import { Id } from './typings'

export class DiagramPartWrapper {
  public readonly id: Id
  public readonly engine: Engine
  public readonly registry: ComponentRegistry
  public readonly domHelper: PartDomHelper
  public readonly toolkit: PartToolkit
  public readonly rootType: Id

  constructor(id: Id, rootType: Id, engine: Engine) {
    this.id = id
    this.engine = engine
    this.rootType = rootType
    this.registry = new ComponentRegistry()
    this.domHelper = new PartDomHelper(this.registry)
    this.toolkit = new PartToolkit(this.registry, this.domHelper)
  }
}
