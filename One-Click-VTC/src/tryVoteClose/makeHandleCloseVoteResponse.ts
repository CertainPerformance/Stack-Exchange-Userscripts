import { showToastError } from '../../../common/showToast';
import { getSettings, saveSettings } from '../settings';

type CloseVoteResponse = Readonly<{
    Success: boolean;
    ResultChangedState: boolean;
    Message: string;
    Tooltip: string;
    Count: number;
}>;

export const makeHandleCloseVoteResponse = (questionId: number, setCanSendRequestToTrue: () => void) => (result: CloseVoteResponse) => {
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

    const downvoteButton = document.querySelector<HTMLElement>('.question .js-vote-down-btn')!;
    // In very rare cases, this element will still have the attribute
    // (perhaps if they clicked to close, then moved mouse out and back in before response is received)
    downvoteButton.removeAttribute('data-cpuserscript-one-click-vtc-imminent-downvote');

    const oneClickVTCContainer = document.querySelector('[data-cpuserscript-one-click-vtc]')!;
    oneClickVTCContainer.remove();
    updateCloseVoteCount(result);
    if (window.StackExchange.options.user.rep < 3000) {
        /* User flagged to close, but did not vote to close
         * If someone has the VTC privilege, it's easy to determine, on pageload, if they've already VTC'd
         * by examining the .close-question-link title
         * Doesn't look like there's anything similar for flags without actually opening the close dialog,
         * so save close flags in Local Storage instead
         */
        const { raisedCloseFlags } = getSettings();
        raisedCloseFlags.push(questionId);
        // Only need to keep recent-ish raisedCloseFlags in Local Storage:
        if (raisedCloseFlags.length > 100) {
            saveSettings({ raisedCloseFlags: raisedCloseFlags.slice(-100) });
        }
        saveSettings({ raisedCloseFlags });
    }
};
const updateCloseVoteCount = (result: CloseVoteResponse) => {
    type SETypeHere = {
        vote_closingAndFlagging: {
            updateCloseLinkCount: (closeVoteResponse: CloseVoteResponse, closeQuestionLink: JQuery) => void;
        };
    };
    const { updateCloseLinkCount } = (window.StackExchange as unknown as SETypeHere).vote_closingAndFlagging;
    const haveSEUpdateCloseLinkCount = () => {
        updateCloseLinkCount(result, window.$('.close-question-link'));
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
    window.setTimeout(
        () => {
            outerObserver.disconnect();
        },
        1000,
    );
};
