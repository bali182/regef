import { Capability } from './Capability';
import { Engine } from './Engine';
import { Id } from './typings';
interface CancelCapabilityConfig {
    parts?: Id[];
    keys?: string[];
}
export declare class CancelCapability extends Capability<CancelCapabilityConfig> {
    constructor(engine: Engine, config?: CancelCapabilityConfig);
    focusOnTargetedParts(target: Element): boolean;
    keyMatches(key: string): boolean;
    onKeyDown({ key, target }: KeyboardEvent): void;
}
export {};
