import React from 'react';
import types from 'prop-types';
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
    static propTypes: {
        engine: types.Validator<Engine>;
        id: types.Validator<string | symbol>;
    };
}
export {};
