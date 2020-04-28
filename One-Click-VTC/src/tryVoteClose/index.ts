import { haveVotedOnQuestion } from '../haveVotedOnQuestion';
import { openDuplicateModal } from './openDuplicateModal';
import { getCanSendRequest, submitCloseVote } from './submitCloseVote';
import { getSettings } from '../settings';
// Wait until SE has attached listeners and applied personal vote classes to vote buttons
export const tryVoteCloseWhenSEReady = (event: Event) => {
    window.StackExchange.ready(() => {
        tryVoteClose(event);
    });
};

const tryVoteClose = (event: Event) => {
    if (!getCanSendRequest()) {
        return;
    }
    const target = event.target as HTMLElement;
    const closeTextElement = target.matches('[data-close-reason-id]') ? target : target.nextElementSibling;
    if (!closeTextElement || !closeTextElement.matches('[data-close-reason-id]')) {
        // All of the elements that are intended to be clickable have this:
        return;
    }
    const okButtonWasClicked = target !== closeTextElement;
    const { closeReasonId, siteSpecificCloseReasonId } = (closeTextElement as HTMLElement).dataset;
    const voteIsDuplicate = closeReasonId === 'Duplicate';
    const { downvoteCondition } = getSettings();
    const downvoteButton = document.querySelector<HTMLElement>('.question .js-vote-down-btn')!;
    if (
        !okButtonWasClicked &&
        !haveVotedOnQuestion() &&
        (downvoteCondition === 'Always' || (downvoteCondition === 'Non-dupes only' && !voteIsDuplicate))
    ) {
        downvoteButton.click();
    }
    downvoteButton.removeAttribute('data-cpuserscript-one-click-vtc-imminent-downvote');
    if (voteIsDuplicate) {
        openDuplicateModal();
        return;
    }
    submitCloseVote(closeReasonId!, siteSpecificCloseReasonId);
};
