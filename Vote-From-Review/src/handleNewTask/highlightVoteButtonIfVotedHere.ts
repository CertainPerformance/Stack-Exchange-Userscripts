import { showToastError } from '../../../common/showToast';
import { getApi } from './getApi';
import { getPostId } from './getPostId';
import { handleError } from './handleError';
import { requestAccessToken } from './requestAccessToken';

export const highlightVoteButtonIfVotedHere = (votingContainer: HTMLElement) => {
    const postId = getPostId();
    getApi(postId)
        .then((apiResponseUntyped) => {
            const { error_id, items } = apiResponseUntyped as ApiPostResponse;
            if (error_id) {
                if (error_id === 403) {
                    // Need to refresh access token:
                    requestAccessToken();
                } else {
                    showToastError(`Stack Vote From Review Error: Stack Exchange API response code ${error_id}`);
                }
                return;
            }
            if (!items[0]) {
                // API did not return the post. Probably an audit
                return;
            }
            const { upvoted, downvoted } = items[0];
            if (upvoted) {
                votingContainer.children[0].classList.add('fc-theme-primary');
            } else if (downvoted) {
                votingContainer.children[2].classList.add('fc-theme-primary');
            }
        })
        .catch(handleError);
};
