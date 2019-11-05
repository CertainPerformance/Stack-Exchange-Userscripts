import '../../common/declareGlobalStackExchange';
import { handleNewTask } from './handleNewTask';
import { redirectOauthResultOnStackexchange } from './redirectOauthResultOnStackexchange';
import { saveOauthResultOnOrigin } from './saveOauthResultOnOrigin';

// See handleNewTask/requestAccessToken for a description of this
if (window.location.href.startsWith('https://stackexchange.com/oauth-vote-from-review')) {
    redirectOauthResultOnStackexchange();
} else {
    const { hash } = window.location;
    if (window.location.hash) {
        saveOauthResultOnOrigin(hash);
    }
    const reviewContent = document.querySelector('.review-content');
    if (reviewContent) {
        new MutationObserver(handleNewTask)
            .observe(reviewContent, { childList: true });
    }
}
