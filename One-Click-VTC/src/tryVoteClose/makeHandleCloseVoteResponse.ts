import { showToastError } from '../../../common/showToast';

type CloseVoteResponse = Readonly<{
    Success: boolean;
    ResultChangedState: boolean;
    Message: string;
    Tooltip: string;
    Count: number;
}>;

export const makeHandleCloseVoteResponse = (setCanSendRequestToTrue: () => void) => (result: CloseVoteResponse) => {
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
    const oneClickVTCContainer = document.querySelector('[data-cpuserscript-one-click-vtc]')!;
    oneClickVTCContainer.remove();
    updateCloseVoteCount(result);
};
const updateCloseVoteCount = (result: CloseVoteResponse) => {
    type SETypeHere = {
        vote_closingAndFlagging: {
            updateCloseLinkCount: (closeVoteResponse: CloseVoteResponse, closeQuestionLink: JQuery) => void;
        };
    };
    const { updateCloseLinkCount } = (window.StackExchange as unknown as SETypeHere).vote_closingAndFlagging;
    const haveSEUpdateCloseLinkCount = () => {
        updateCloseLinkCount(result, $('.close-question-link'));
    };
    haveSEUpdateCloseLinkCount();
    // If the question had an edit notice, and the downvote button was .click()ed, the postcell will be refreshed,
    // likely overwriting the newly updated updated close vote count (eg "close (2)").
    // Watch to see if the post gets replaced in the near future, and if it does, update the link count:
    const postcell = document.querySelector('.question .postcell')!;
    const outerObserver = new MutationObserver((mutations, observer) => {
        for (const { removedNodes } of mutations) {
            if ([...removedNodes].includes(postcell)) {
                // This will run in a microtask after replacement is finished
                haveSEUpdateCloseLinkCount();
                observer.disconnect();
                return;
            }
        }
    });
    outerObserver.observe(postcell.parentElement!, { childList: true });
    setTimeout(() => {
        outerObserver.disconnect();
    }, 1000);
};
