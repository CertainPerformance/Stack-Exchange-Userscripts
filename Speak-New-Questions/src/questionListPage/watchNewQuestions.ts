import { checkNewQuestions } from './checkNewQuestions';
import { assignState } from './state';

export const watchNewQuestions = (channel: BroadcastChannel, speakInterface: HTMLElement) => {
    assignState({ channel });
    new MutationObserver((_, observer) => {
        if (speakInterface.textContent === 'Use more recent newest tab') {
            observer.disconnect();
            return;
        }
        /* The following element will appear immediately in response to a websocket message from SE
         * Clicking it results in an ajax request for every watched tag
         * When any request succeeds, the new question row gets inserted (removing the old row for that question if there is one)
         */
        const newPostActivity = document.querySelector<HTMLElement>('.js-new-post-activity');
        if (newPostActivity) {
            newPostActivity.click();
        }
    }).observe(document.querySelector('#questions')!, { childList: true });
    // tslint:disable-next-line: variable-name
    window.$(document).ajaxComplete((_event, _jqXHR, ajaxOptions) => {
        if (ajaxOptions && ajaxOptions.url && ajaxOptions.url.startsWith('/posts/ajax-load-realtime-list/')) {
            // By this point, a new question div will have been inserted
            checkNewQuestions();
        }
    });
};
