import { showToastError, showToastInfo } from '../../../common/showToast';
import { getVoteResponse } from './getVoteResponse';
import { handleError } from './handleError';

// Now, always displaying .message, if it exists. Check that it works. (vote limit, locked posts)
// "already voted on this post more than 5 min ago"
// Also check that the right toast color comes up - blue when near vote limit, red when at vote limit

export const listenForUpDownVotes = (votingContainer: HTMLElement) => {
    const [upButton, centerNetSumDiv, downButton] = votingContainer.children;
    const voteHandler = ({ currentTarget }: Event) => {
        const currentlyVotedButton = votingContainer.querySelector('.fc-theme-primary');
        if (currentlyVotedButton) {
            currentlyVotedButton.classList.remove('fc-theme-primary');
        }
        const voteParam = currentlyVotedButton
            ? '0' // Retract your vote
            : currentTarget === upButton
                ? '2' // upvotes request /vote/2
                : '3'; // downvotes request /vote/3;
        getVoteResponse(voteParam)
            .then((result) => {
                if (result.Message) {
                    if (result.Success) {
                        showToastInfo(result.Message);
                    } else {
                        showToastError(result.Message);
                    }
                }
                if (result.Success) {
                    // result.LastVoteTypeId will be 2 if you just voted up, 3 if you just voted down, 0 or undefined otherwise
                    if (result.LastVoteTypeId) {
                        (result.LastVoteTypeId === 2 ? upButton : downButton).classList.add('fc-theme-primary');
                    }
                    centerNetSumDiv.textContent = String(result.NewScore);
                } else if (currentlyVotedButton) {
                    currentlyVotedButton.classList.add('fc-theme-primary');
                }
            })
            .catch(handleError);
    };
    upButton.addEventListener('click', voteHandler);
    downButton.addEventListener('click', voteHandler);
};
