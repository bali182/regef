/// <reference types="react" />
import { Engine } from './Engine';
import { PartToolkit } from './PartToolkit';
export declare class Toolkit {
    private engine;
    constructor(engine: Engine);
    forPart(id: string | Symbol): PartToolkit;
    forComponent(component: React.Component): PartToolkit;
}
