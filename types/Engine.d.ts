import { EventManager } from './EventManager';
import { Toolkit } from './Toolkit';
import { DomHelper } from './DomHelper';
import { Capability } from './Capability';
import { EditPolicy } from './EditPolicy';
import { SelectionProvider } from './SelectionProvider';
import { DiagramPartWrapper } from './DiagramPartWrapper';
import { Id, EngineConfigProvider } from './typings';
export declare class Engine {
    readonly toolkit: Toolkit;
    readonly eventManager: EventManager;
    readonly domHelper: DomHelper;
    readonly capabilities: Capability[];
    readonly editPolicies: EditPolicy[];
    readonly selectionProvider: SelectionProvider;
    readonly types: Id[];
    readonly rootType: Id;
    readonly htmlDocument: Document;
    constructor(config?: EngineConfigProvider);
    part(id: Id): DiagramPartWrapper;
    allParts(): DiagramPartWrapper[];
}
