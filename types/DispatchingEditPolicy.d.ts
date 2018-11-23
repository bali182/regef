import { EditPolicy } from './EditPolicy';
import { AddIntent, MoveIntent, StartConnectionIntent, EndConnectionIntent, SelectionIntent, DeleteIntent, RecognizedIntent } from './typings';
export declare class DispatchingEditPolicy extends EditPolicy {
    perform(intent: RecognizedIntent): void;
    requestFeedback(intent: RecognizedIntent): void;
    eraseFeedback(intent: RecognizedIntent): void;
    add(intent: AddIntent): void;
    move(intent: MoveIntent): void;
    startConnection(intent: StartConnectionIntent): void;
    endConnection(intent: EndConnectionIntent): void;
    select(intent: SelectionIntent): void;
    delete(intent: DeleteIntent): void;
    requestAddFeedback(intent: AddIntent): void;
    requestMoveFeedback(intent: MoveIntent): void;
    requestStartConnectionFeedback(intent: StartConnectionIntent): void;
    requestEndConnectionFeedback(intent: EndConnectionIntent): void;
    requestSelectFeedback(intent: SelectionIntent): void;
    eraseAddFeedback(intent: AddIntent): void;
    eraseMoveFeedback(intent: MoveIntent): void;
    eraseStartConnectionFeedback(intent: StartConnectionIntent): void;
    eraseEndConnectionFeedback(intent: EndConnectionIntent): void;
    eraseSelectFeedback(intent: SelectionIntent): void;
}
