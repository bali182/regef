import React from 'react';
import { Engine } from './Engine';
import { Id } from './typings';
declare type DiagramPartProps = {
    engine: Engine;
    id: Id;
};
export declare class DiagramPart extends React.PureComponent<DiagramPartProps> {
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): React.ReactNode;
}
export {};
