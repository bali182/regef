import React from 'react';
import { HasUserComponent, HasType } from './typings';
declare type RegefComponent = React.Component & HasType & HasUserComponent;
export declare class ComponentWrapper {
    dom: Element;
    component: RegefComponent;
    userComponent: React.Component;
    constructor(dom: Element, component: RegefComponent, userComponent: React.Component);
}
export declare function fromComponent(component: RegefComponent): ComponentWrapper;
export {};
