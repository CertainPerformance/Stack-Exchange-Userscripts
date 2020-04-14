import { haveVotedOnQuestion } from '../haveVotedOnQuestion';
import { openDuplicateModal } from './openDuplicateModal';
import { getCanSendRequest, submitCloseVote } from './submitCloseVote';

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
    // localStorage will definitely be populated by this point; it's done on the top level of listenForAutoVoteChanges
    const downvoteCondition = localStorage.cpUserscriptOneClickVTCDownvoteWhenVotingToClose;
    const downvoteButton = document.querySelector<HTMLElement>('.question .js-vote-down-btn')!;
    if (
        !okButtonWasClicked &&
        !haveVotedOnQuestion() &&
        (downvoteCondition === 'Always' || (downvoteCondition === 'Non-dupes only' && !voteIsDuplicate))
    ) {
        downvoteButton.click();
    }
    downvoteButton.style.removeProperty('background-color');
    if (voteIsDuplicate) {
        openDuplicateModal();
        return;
    }
    submitCloseVote(closeReasonId!, siteSpecificCloseReasonId);
};
