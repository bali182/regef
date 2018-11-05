import { Id, SelectionIntent } from './typings';
import { Capability } from './Capability';
import { Engine } from './Engine';
declare type SingleSelectionCapabilityConfig = {
    parts: Id[];
    selectables: Id[];
};
export declare class SingleSelectionCapability extends Capability<SingleSelectionCapabilityConfig> {
    private location;
    private possibleSingleSelection;
    private additional;
    private selection;
    constructor(engine: Engine, config?: Partial<SingleSelectionCapabilityConfig>);
    init(): void;
    createSingleSelectionRequest(): SelectionIntent;
    cancel(): void;
    onMouseDown(e: MouseEvent): void;
    onMouseMove(): void;
    onMouseUp({ ctrlKey, metaKey }: MouseEvent): void;
}
export {};
