import React from 'react';
import { Id, RegefComponentProps } from './typings';
export declare function component<P extends Partial<RegefComponentProps>>(type: Id): (Wrapped: React.ComponentClass<P, any>) => React.ComponentClass<Pick<P, Exclude<keyof P, "regef">>, any>;
