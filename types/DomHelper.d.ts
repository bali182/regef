import { Engine } from './Engine';
import { DiagramPartWrapper } from './DiagramPartWrapper';
declare type PartPredicate = (part: DiagramPartWrapper) => boolean;
export declare class DomHelper {
    private engine;
    constructor(engine: Engine);
    findPart(dom: Element, matcher?: PartPredicate): DiagramPartWrapper;
}
export {};
