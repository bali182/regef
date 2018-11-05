import { Rectangle, Point } from 'regef-geometry';
import { Component } from 'react';
import { Toolkit } from './Toolkit';
import { Engine } from './Engine';
import { Capability } from './Capability';
import { EditPolicy } from './EditPolicy';
import { SelectionProvider } from './SelectionProvider';
export declare const REGEF_PROP_KEY = "@@regef-internal-context@@";
export declare type Id = string | Symbol;
export declare type HasUserComponent = {
    userComponent: React.Component;
};
export declare type HasType = {
    type: Id;
};
export declare type RegefComponent = React.Component & HasUserComponent & HasType;
export declare enum IntentType {
    ADD = "add",
    MOVE = "move",
    SELECT = "select",
    DELETE = "delete",
    START_CONNECTION = "start-connection",
    END_CONNECTION = "end-connection"
}
export declare type Intent = {
    type: IntentType;
};
export declare type SelectionIntent = {
    type: IntentType.SELECT;
    bounds: Rectangle;
    startLocation: Point;
    endLocation: Point;
    selection: Component[];
};
export declare type MoveIntent = {
    type: IntentType.MOVE;
    components: Component[];
    container: Component;
    location: Point;
    offset: Point;
    delta: Point;
};
export declare type DeleteIntent = {
    type: IntentType.DELETE;
    selection: Component[];
};
export declare type AddIntent = {
    type: IntentType.ADD;
    components: Component[];
    targetContainer: Component;
    container: Component;
    location: Point;
    offset: Point;
    delta: Point;
};
export declare type StartConnectionIntent = {
    type: IntentType.START_CONNECTION;
    source: Component;
    location: Point;
};
export declare type EndConnectionIntent = {
    type: IntentType.END_CONNECTION;
    source: Component;
    target: Component;
    location: Point;
};
export declare type ToolkitProvider = () => Promise<Toolkit>;
export interface RegefObject {
    toolkit: ToolkitProvider;
}
export interface RegefComponentProps {
    regef: RegefObject;
}
export declare type RegefInternalProps = {
    engine: Engine;
    id: Id;
};
export declare type RegefProps = {
    [REGEF_PROP_KEY]: RegefInternalProps;
};
export interface CancelCapabilityConfig {
    parts?: Id[];
    keys?: string[];
}
export interface ConnectCapabilityConfig {
    parts?: Id[];
    sourceTypes?: Id[];
    targetTypes?: Id[];
}
export interface DeleteCapabilityConfig {
    parts?: Id[];
    keys?: string[];
}
export interface DragCapabilityConfig {
    parts?: Id[];
    draggables?: Id[];
    hosts?: Id[];
}
export interface MultiSelectionCapabilityConfig {
    parts: Id[];
    selectables: Id[];
    intersection: boolean;
    containment: boolean;
}
export interface SingleSelectionCapabilityConfig {
    parts: Id[];
    selectables: Id[];
}
export interface EngineConfig {
    capabilities: Capability<any>[];
    editPolicies: EditPolicy[];
    selectionProvider: SelectionProvider;
    rootType: Id;
    types: Id[];
}
export declare type EngineConfigProvider = (engine: Engine) => EngineConfig;
