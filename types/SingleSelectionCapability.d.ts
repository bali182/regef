import { SingleSelectionCapabilityConfig } from './typings';
import { Capability } from './Capability';
import { Engine } from './Engine';
export declare class SingleSelectionCapability extends Capability<SingleSelectionCapabilityConfig> {
    private location;
    private possibleSingleSelection;
    private additional;
    private selection;
    constructor(engine: Engine, config?: Partial<SingleSelectionCapabilityConfig>);
    private init;
    private createSingleSelectionRequest;
    cancel(): void;
    onMouseDown(e: MouseEvent): void;
    onMouseMove(): void;
    onMouseUp({ ctrlKey, metaKey }: MouseEvent): void;
}
