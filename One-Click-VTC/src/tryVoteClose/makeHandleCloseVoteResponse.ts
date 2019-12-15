import { showToastError } from '../../../common/showToast';

type CloseVoteResponse = Readonly<{
    Success: boolean;
    ResultChangedState: boolean;
    Message: string;
    Tooltip: string;
    Count: number;
}>;

export const makeHandleCloseVoteResponse = (target: HTMLElement, setCanSendRequestToTrue: () => void) => (result: CloseVoteResponse) => {
    if (result.ResultChangedState) {
        // Question successfully closed
        window.location.href = window.location.href;
        return;
    }
    if (!result.Success) {
        setCanSendRequestToTrue();
        showToastError(result.Message);
        return;
    }
    target.closest('[data-cpuserscript-one-click-vtc]')!.remove();
    type SETypeHere = {
        vote_closingAndFlagging: {
            updateCloseLinkCount: (closeVoteResponse: CloseVoteResponse, closeQuestionLink: JQuery) => void;
        };
    };
    (window.StackExchange as unknown as SETypeHere).vote_closingAndFlagging.updateCloseLinkCount(result, $('.close-question-link'));
};
