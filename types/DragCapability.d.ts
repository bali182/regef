import { DragCapabilityConfig } from './typings';
import { Capability } from './Capability';
import { Engine } from './Engine';
export declare class DragCapability extends Capability<DragCapabilityConfig> {
    private target;
    private lastTargetParent;
    private targetParent;
    private currentParent;
    private coordinates;
    private offset;
    private lastRequest;
    private mouseMoved;
    private startLocation;
    constructor(engine: Engine, config?: DragCapabilityConfig);
    private init;
    private findTargetedParent;
    private deltaCoordinates;
    private offsetCoordinates;
    private locationCoordinates;
    private updateCoordinates;
    private updateParents;
    private getMovedComponents;
    private getMoveChildRequest;
    private getAddChildRequest;
    private getSelectionRequest;
    private handleFeedback;
    private buildDragRequest;
    cancel(): void;
    onMouseDown(e: MouseEvent): void;
    onMouseMove(e: MouseEvent): void;
    onMouseUp(e: MouseEvent): void;
}
