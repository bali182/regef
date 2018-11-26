import { ComponentWrapper } from './ComponentWrapper';
import { RegisterListener, ComponentWrapperField } from './typings';
export declare class ComponentRegistry {
    private mapping;
    wrappers: Set<ComponentWrapper>;
    private registerListeners;
    private unregisterListeners;
    root: ComponentWrapper;
    constructor();
    private init;
    setRoot(root: ComponentWrapper): void;
    register(wrapper: ComponentWrapper): void;
    unregister(input: ComponentWrapperField): void;
    get(input: ComponentWrapperField): ComponentWrapper;
    all(): ComponentWrapper[];
    has(input: ComponentWrapperField): boolean;
    addRegisterListener(listener: RegisterListener): void;
    addUnregisterListener(listener: RegisterListener): void;
    removeRegisterListener(listener: RegisterListener): void;
    removeUnregisterListener(listener: RegisterListener): void;
}
