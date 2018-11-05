import { Capability } from './Capability';
import { DeleteIntent, DeleteCapabilityConfig } from './typings';
import { Engine } from './Engine';
export declare class DeleteCapability extends Capability {
    private currentSelection;
    constructor(engine: Engine, config?: DeleteCapabilityConfig);
    init(): void;
    getDeleteRequest(): DeleteIntent;
    focusOnTargetedParts(target: Element): boolean;
    keyMatches(key: string): boolean;
    onKeyDown({ key, target }: KeyboardEvent): void;
}
