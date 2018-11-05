import { Rectangle, Point } from 'regef-geometry';
import { Component } from 'react';
import { Toolkit } from './Toolkit';
import { Engine } from './Engine';
export declare const REGEF_PROP_KEY = "@@regef-internal-context@@";
export declare type Id = string | Symbol;
export declare type HasUserComponent = {
    userComponent: React.Component;
};
export declare type HasType = {
    type: Id;
};
export declare type RegefComponent = React.Component & HasUserComponent & HasType;
export declare const ADD = "add";
export declare const MOVE = "move";
export declare const SELECT = "select";
export declare const DELETE = "delete";
export declare const START_CONNECTION = "start-connection";
export declare const END_CONNECTION = "end-connection";
export declare type IntentType = typeof ADD | typeof MOVE | typeof SELECT | typeof DELETE | typeof START_CONNECTION | typeof END_CONNECTION;
export declare type Intent = {
    type: IntentType;
};
export declare type SelectionIntent = {
    type: typeof SELECT;
    bounds: Rectangle;
    startLocation: Point;
    endLocation: Point;
    selection: Component[];
};
export declare type MoveIntent = {
    type: typeof MOVE;
    components: Component[];
    container: Component;
    location: Point;
    offset: Point;
    delta: Point;
};
export declare type DeleteIntent = {
    type: typeof DELETE;
    selection: Component[];
};
export declare type AddIntent = {
    type: typeof ADD;
    components: Component[];
    targetContainer: Component;
    container: Component;
    location: Point;
    offset: Point;
    delta: Point;
};
export declare type StartConnectionIntent = {
    type: typeof START_CONNECTION;
    source: Component;
    location: Point;
};
export declare type EndConnectionIntent = {
    type: typeof END_CONNECTION;
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
