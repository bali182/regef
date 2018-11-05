import { SelectionIntent, MultiSelectionCapabilityConfig } from './typings';
import { Capability } from './Capability';
import { Engine } from './Engine';
export declare class MultiSelectionCapability extends Capability<MultiSelectionCapabilityConfig> {
    private startLocation;
    private endLocation;
    private lastRequest;
    private selectionBounds;
    private selection;
    private additional;
    constructor(engine: Engine, config?: Partial<MultiSelectionCapabilityConfig>);
    init(): void;
    createMultiSelectionRequest(): SelectionIntent;
    buildSelectionBounds(): void;
    buildSelection(): void;
    cancel(): void;
    onMouseDown(e: MouseEvent): void;
    onMouseMove(e: MouseEvent): void;
    onMouseUp(e: MouseEvent): void;
}
