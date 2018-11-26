import { ComponentRegistry } from './ComponentRegistry';
import { PartToolkit } from './PartToolkit';
import { PartDomHelper } from './PartDomHelper';
import { Engine } from './Engine';
import { Id } from './typings';
export declare class DiagramPartWrapper {
    readonly id: Id;
    readonly engine: Engine;
    readonly registry: ComponentRegistry;
    readonly domHelper: PartDomHelper;
    readonly toolkit: PartToolkit;
    readonly rootType: Id;
    constructor(id: Id, rootType: Id, engine: Engine);
}
