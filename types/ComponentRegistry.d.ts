import { ComponentWrapper } from './ComponentWrapper';
import React from 'react';
declare type WrapperField = ComponentWrapper | Element | React.Component;
declare type RegisterListener = (c: ComponentWrapper) => void;
export declare class ComponentRegistry {
    private mapping;
    private wrappers;
    private registerListeners;
    private unregisterListeners;
    root: ComponentWrapper;
    constructor();
    init(): void;
    setRoot(root: ComponentWrapper): void;
    register(wrapper: ComponentWrapper): void;
    unregister(input: WrapperField): void;
    get(input: WrapperField): ComponentWrapper;
    all(): ComponentWrapper[];
    has(input: WrapperField): boolean;
    addRegisterListener(listener: RegisterListener): void;
    addUnregisterListener(listener: RegisterListener): void;
    removeRegisterListener(listener: RegisterListener): void;
    removeUnregisterListener(listener: RegisterListener): void;
}
export {};
