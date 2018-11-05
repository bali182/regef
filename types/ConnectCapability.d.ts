import { Capability } from './Capability';
import { ConnectCapabilityConfig } from './typings';
import { Engine } from './Engine';
export declare class ConnectCapability extends Capability<ConnectCapabilityConfig> {
    private source;
    private target;
    private coordinates;
    private lastRequest;
    constructor(engine: Engine, config?: ConnectCapabilityConfig);
    private init;
    cancel(): void;
    private getStartConnectionRequest;
    private getEndConnectionRequest;
    private buildEndConnectRequest;
    private buildStartConnectionRequest;
    private handleFeedback;
    onMouseDown(e: MouseEvent): void;
    onMouseMove(e: MouseEvent): void;
    onMouseUp(e: MouseEvent): void;
}
