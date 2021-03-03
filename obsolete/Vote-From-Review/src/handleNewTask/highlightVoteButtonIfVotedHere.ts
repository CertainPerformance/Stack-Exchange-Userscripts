import { showToastError } from '../../../common/showToast';
import { getApi } from './getApi';
import { getPostId } from './getPostId';
import { handleError } from './handleError';
import { requestAccessToken } from './requestAccessToken';

export const highlightVoteButtonIfVotedHere = (votingContainer: HTMLElement, accessTokenWasJustSaved: boolean) => {
    const postId = getPostId();
    getApi(postId)
        .then((apiResponseUntyped) => {
            const { error_id, items } = apiResponseUntyped as ApiPostResponse;
            if (error_id) {
                if (error_id === 403) {
                    // Need to refresh access token:
                    if (accessTokenWasJustSaved) {
                        // In case there's an issue with the SE API or in this userscript, make sure not to enter an endless redirecting loop
                        // This may also occur if user stays on a /review page for more than 24 hours, but that's rare and not worth bothering with
                        // tslint:disable-next-line: no-console
                        console.error('Stack Vote From Review: Access token was just saved, but API gave an error ID of 403');
                    } else {
                        requestAccessToken();
                    }
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
            if (upvoted || downvoted) {
                votingContainer.children[upvoted ? 0 : 2].classList.add('fc-theme-primary');
            }
        })
        .catch(handleError);
};
