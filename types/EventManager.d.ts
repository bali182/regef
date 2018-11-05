import { Engine } from './Engine';
export declare class EventManager {
    private engine;
    hooked: boolean;
    constructor(engine: Engine);
    hookListeners(): void;
    unhookListeners(): void;
    onKeyUp(e: KeyboardEvent): void;
    onKeyDown(e: KeyboardEvent): void;
    onMouseDown(e: MouseEvent): void;
    onMouseMove(e: MouseEvent): void;
    onMouseUp(e: MouseEvent): void;
}
