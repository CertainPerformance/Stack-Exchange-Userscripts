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
    // If the question had an edit notice, and the downvote button was .click()ed, the post will be refreshed,
    // likely overwriting the newly updated updated close vote count (eg "close (2)").
    // If the request already came back, the post will be replaced after 150ms (see replaceIndividualPostContents in full.en.js)
    setTimeout(haveSEUpdateCloseLinkCount, 100);

    // The post-update response might not have come back yet, so for the next 1 second,
    // if an ajaxComplete resolves with a URL that results in a post update, call haveSEUpdateCloseLinkCount 200ms afterwards:
    // tslint:disable-next-line: variable-name
    const handler = (_event: unknown, _jqXHR: unknown, { url }: { url: string }) => {
        if (!url.startsWith('/posts/ajax-load-realtime/')) {
            return;
        }
        setTimeout(haveSEUpdateCloseLinkCount, 200);
        window.$(document).off('ajaxComplete', handler);
    };
    window.$(document).on('ajaxComplete', handler);
    setTimeout(() => {
        window.$(document).off('ajaxComplete', handler);
    }, 1000);
};
