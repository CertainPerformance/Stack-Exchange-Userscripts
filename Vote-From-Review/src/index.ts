import '../../common/declareGlobalStackExchange';
import { handleNewTask } from './handleNewTask';
import { requestAccessToken } from './handleNewTask/requestAccessToken';
import { redirectOauthResultOnStackexchange } from './redirectOauthResultOnStackexchange';
import { saveOauthResultOnOrigin } from './saveOauthResultOnOrigin';

// See handleNewTask/requestAccessToken for a description of this
if (window.location.href.startsWith('https://stackexchange.com/oauth-vote-from-review')) {
    redirectOauthResultOnStackexchange();
} else {
    const { search } = window.location;
    const accessTokenWasJustSaved = saveOauthResultOnOrigin(search);
    if (!localStorage.cpUserscriptVoteFromReviewAccessToken && !accessTokenWasJustSaved) {
        /* This if-block should only occur the first time the script is run, ever
         * The access token only stays active for 24 hours (there is no duration option other than 24 hours, or completely permanent)
         * After it expires, the API will return an error, and the user will have to re-authenticate
         * (handled in highlightVoteButtonIfVotedHere)
         */
        requestAccessToken();
    } else {
        const reviewContent = document.querySelector('.review-content');
        if (reviewContent) {
            new MutationObserver(() => {
                handleNewTask(accessTokenWasJustSaved);
            })
                .observe(reviewContent, { childList: true });
        }
    }
}
