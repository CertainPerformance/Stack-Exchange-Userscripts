import { queueUtterance } from './queueUtterance';
import { setupCrossDomainCommunication } from './setupCrossDomainCommunication';

const pageLoadTimestamp = Date.now();

export const speakOnNewMessage = () => {
    const crossDomainListenerObj = setupCrossDomainCommunication();
    crossDomainListenerObj.addMessageListener((message) => {
        if (message === 'Page load timestamp?') {
            crossDomainListenerObj.postMessage(`Page load timestamp: ${pageLoadTimestamp}`);
        }
    });
    const unreadSpan = document.querySelector('.indicator-badge.js-unread-count')!;
    new MutationObserver(() => {
        /* A new inbox message was seen
         * Post a message to other Newest pages on different sites, to see if this page is the latest one open
         * If no responses with a later pageLoadTimestamp appear after 200ms, queue a Message utterance from this page
         * (On Chrome, the full process looks to take around 20ms on average, when the system isn't busy)
         * This ensures that "Message" only gets spoken once, rather than once for each Newest page that's currently open
         */
        const timeoutId = window.setTimeout(
            () => {
                queueUtterance('Message');
                crossDomainListenerObj.removeMessageListener(listener);
            },
            200,
        );
        const listener = (message: string) => {
            const match = message.match(/Page load timestamp: (\d+)/);
            if (!match) {
                return;
            }
            const otherTimestamp = Number(match[1]);
            if (otherTimestamp > pageLoadTimestamp) {
                window.clearTimeout(timeoutId);
                crossDomainListenerObj.removeMessageListener(listener);
            }
        };
        crossDomainListenerObj.addMessageListener(listener);
        crossDomainListenerObj.postMessage('Page load timestamp?');
    })
        .observe(unreadSpan, { childList: true });
};
