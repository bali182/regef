import { Capability } from './Capability';
import { Engine } from './Engine';
import { CancelCapabilityConfig } from './typings';
export declare class CancelCapability extends Capability<CancelCapabilityConfig> {
    constructor(engine: Engine, config?: CancelCapabilityConfig);
    private focusOnTargetedParts;
    private keyMatches;
    onKeyDown({ key, target }: KeyboardEvent): void;
}
