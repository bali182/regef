import { MultiSelectionCapabilityConfig } from './typings';
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
    private init;
    private createMultiSelectionRequest;
    private buildSelectionBounds;
    private buildSelection;
    cancel(): void;
    onMouseDown(e: MouseEvent): void;
    onMouseMove(e: MouseEvent): void;
    onMouseUp(e: MouseEvent): void;
}
