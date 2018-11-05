import { Engine } from './Engine';
export declare class Capability<Config = any> {
    protected progress: boolean;
    protected engine: Engine;
    protected config: Config;
    constructor(engine: Engine, config: Config);
    onKeyDown(e: KeyboardEvent): void;
    onKeyUp(e: KeyboardEvent): void;
    onMouseDown(e: MouseEvent): void;
    onMouseMove(e: MouseEvent): void;
    onMouseUp(e: MouseEvent): void;
    cancel(): void;
}
