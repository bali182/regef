import { EventManager } from './EventManager';
import { Toolkit } from './Toolkit';
import { DomHelper } from './DomHelper';
import { Capability } from './Capability';
import { EditPolicy } from './EditPolicy';
import { SelectionProvider } from './SelectionProvider';
import { DiagramPartWrapper } from './DiagramPartWrapper';
import { Id } from './typings';
declare type EngineConfig = {
    capabilities: Capability<any>[];
    editPolicies: EditPolicy[];
    selectionProvider: SelectionProvider;
    rootType: Id;
    types: Id[];
};
declare type EngineConfigProvider = (engine: Engine) => EngineConfig;
export declare class Engine {
    readonly toolkit: Toolkit;
    readonly eventManager: EventManager;
    readonly domHelper: DomHelper;
    readonly capabilities: Capability[];
    readonly editPolicies: EditPolicy[];
    readonly selectionProvider: SelectionProvider;
    readonly types: Id[];
    readonly rootType: Id;
    private _parts;
    constructor(config?: EngineConfigProvider);
    __partsMap(): Map<Id, DiagramPartWrapper>;
    part(id: Id): DiagramPartWrapper;
    allParts(): DiagramPartWrapper[];
}
export {};
