import { ComponentRegistry } from './ComponentRegistry';
import { ComponentWrapper } from './ComponentWrapper';
declare type WrapperPredicate = (wrapper: ComponentWrapper) => boolean;
export declare class PartDomHelper {
    private registry;
    constructor(registry: ComponentRegistry);
    findClosest(dom: Element, matcher?: WrapperPredicate): ComponentWrapper;
    findRelevantChildren(element: Element): Element[];
    partContains(element: Element): boolean;
}
export {};
