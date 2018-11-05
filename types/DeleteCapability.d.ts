import { Capability } from './Capability';
import { DeleteCapabilityConfig } from './typings';
import { Engine } from './Engine';
export declare class DeleteCapability extends Capability {
    private currentSelection;
    constructor(engine: Engine, config?: DeleteCapabilityConfig);
    private init;
    private getDeleteRequest;
    private focusOnTargetedParts;
    private keyMatches;
    onKeyDown({ key, target }: KeyboardEvent): void;
}
