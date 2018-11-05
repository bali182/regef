import { Capability } from './Capability';
import { StartConnectionIntent, EndConnectionIntent, ConnectCapabilityConfig } from './typings';
import { Engine } from './Engine';
declare type ConnectIntent = StartConnectionIntent | EndConnectionIntent;
export declare class ConnectCapability extends Capability<ConnectCapabilityConfig> {
    private source;
    private target;
    private coordinates;
    private lastRequest;
    constructor(engine: Engine, config?: ConnectCapabilityConfig);
    init(): void;
    cancel(): void;
    getStartConnectionRequest(): StartConnectionIntent;
    getEndConnectionRequest(): EndConnectionIntent;
    buildEndConnectRequest(e: MouseEvent): EndConnectionIntent;
    buildStartConnectionRequest(e: MouseEvent): StartConnectionIntent;
    handleFeedback(lastRequest: ConnectIntent, request: ConnectIntent): void;
    onMouseDown(e: MouseEvent): void;
    onMouseMove(e: MouseEvent): void;
    onMouseUp(e: MouseEvent): void;
}
export {};
