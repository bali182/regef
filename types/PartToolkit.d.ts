import { Rectangle } from 'regef-geometry';
import { ComponentRegistry } from './ComponentRegistry';
import { PartDomHelper } from './PartDomHelper';
export declare class PartToolkit {
    private registry;
    private domHelper;
    constructor(registry: ComponentRegistry, domHelper: PartDomHelper);
    root(): React.Component;
    parent(component: React.Component): React.Component;
    children(component: React.Component): React.Component[];
    ofType(type: string | Symbol): React.Component[];
    bounds(component: React.Component): Rectangle;
}
