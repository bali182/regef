import { EventManager } from './EventManager';
import { Toolkit } from './Toolkit';
import { DomHelper } from './DomHelper';
import { Capability } from './Capability';
import { EditPolicy } from './EditPolicy';
import { SelectionProvider } from './SelectionProvider';
import { DiagramPartWrapper } from './DiagramPartWrapper';
import { Id, EngineConfigProvider } from './typings';
export declare class Engine {
    readonly capabilities: Capability[];
    readonly editPolicies: EditPolicy[];
    readonly selectionProvider: SelectionProvider;
    readonly htmlDocument: Document;
    readonly toolkit: Toolkit;
    readonly eventManager: EventManager;
    readonly domHelper: DomHelper;
    readonly rootType: Id;
    constructor(config?: EngineConfigProvider);
    part(id: Id): DiagramPartWrapper;
    allParts(): DiagramPartWrapper[];
}
