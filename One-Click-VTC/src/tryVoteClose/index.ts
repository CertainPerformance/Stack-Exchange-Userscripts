import { haveVotedOnQuestion } from '../haveVotedOnQuestion';
import { openDuplicateModal } from './openDuplicateModal';
import { getCanSendRequest, submitCloseVote } from './submitCloseVote';

export const tryVoteClose = (event: Event) => {
    if (!getCanSendRequest()) {
        return;
    }
    const target = event.target as HTMLElement;
    const closeTextElement = target.matches('[data-close-reason-id]') ? target : target.previousElementSibling;
    if (!closeTextElement || !closeTextElement.matches('[data-close-reason-id]')) {
        // All of the elements that are intended to be clickable have this:
        return;
    }
    const okButtonWasClicked = target !== closeTextElement;
    const { closeReasonId, closeAsOffTopicReasonId } = (closeTextElement as HTMLElement).dataset;
    const voteIsDuplicate = closeReasonId === 'Duplicate';
    // localStorage will definitely be populated by this point; it's done on the top level of listenForAutoVoteChanges
    const downvoteCondition = localStorage.cpUserscriptOneClickVTCDownvoteWhenVotingToClose;
    const downvoteButton = document.querySelector('.question .js-vote-down-btn') as HTMLElement;
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
    submitCloseVote(closeReasonId!, closeAsOffTopicReasonId, target);
};
