import { IntentType } from './typings';
declare type Intent = {
    type: IntentType;
};
export declare class EditPolicy {
    perform(intent: Intent): void;
    requestFeedback(intent: Intent): void;
    eraseFeedback(intent: Intent): void;
}
export {};
