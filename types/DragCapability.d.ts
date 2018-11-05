/// <reference types="react" />
import { Point } from 'regef-geometry';
import { Id, MoveIntent, AddIntent, SelectionIntent } from './typings';
import { Capability } from './Capability';
import { Engine } from './Engine';
import { ComponentWrapper } from './ComponentWrapper';
import { DiagramPartWrapper } from './DiagramPartWrapper';
declare type DragIntent = MoveIntent | AddIntent | SelectionIntent;
declare type DragCapabilityConfig = {
    parts?: Id[];
    draggables?: Id[];
    hosts?: Id[];
};
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
    init(): void;
    findTargetedParent(eventTarget: Element, part: DiagramPartWrapper): ComponentWrapper;
    deltaCoordinates({ clientX, clientY }: MouseEvent): Point;
    screenCoordinates({ clientX, clientY }: MouseEvent): Point;
    offsetCoordinates(): Point;
    locationCoordinates({ clientX, clientY }: MouseEvent): Point;
    updateCoordinates(e: MouseEvent): void;
    updateParents(e: MouseEvent, part: DiagramPartWrapper): void;
    getMovedComponents(): import("react").Component<{}, {}, any>[];
    getMoveChildRequest(): MoveIntent;
    getAddChildRequest(): AddIntent;
    getSelectionRequest(): SelectionIntent;
    handleFeedback(lastRequest: DragIntent, request: DragIntent): void;
    buildDragRequest(e: MouseEvent): DragIntent;
    cancel(): void;
    onMouseDown(e: MouseEvent): void;
    onMouseMove(e: MouseEvent): void;
    onMouseUp(e: MouseEvent): void;
}
export {};
