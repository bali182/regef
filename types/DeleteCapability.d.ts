import { Capability } from './Capability';
import { Id, DeleteIntent } from './typings';
import { Engine } from './Engine';
declare type DeleteCapabilityConfig = {
    parts?: Id[];
    keys?: string[];
};
export declare class DeleteCapability extends Capability {
    private currentSelection;
    constructor(engine: Engine, config?: DeleteCapabilityConfig);
    init(): void;
    getDeleteRequest(): DeleteIntent;
    focusOnTargetedParts(target: Element): boolean;
    keyMatches(key: string): boolean;
    onKeyDown({ key, target }: KeyboardEvent): void;
}
export {};
