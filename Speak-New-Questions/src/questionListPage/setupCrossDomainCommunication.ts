export const setupCrossDomainCommunication = () => {
    /* This enables the userscript on different Newest tabs to communicate despite being on different domains
     * Each Newest tab will create an iframe to example.com
     * To communicate, the Newest tab will post a message to the iframe
     * The userscript running on example.com in the iframe will see the message
     * and relay it over a BroadcastChannel
     * All other example.com iframes will see the channel message
     * and can relay it up to their parent Newest pages using postMessage
     * See https://stackoverflow.com/a/61052335
     */
    const iframe = document.body.appendChild(document.createElement('iframe'));
    iframe.src = 'https://example.com/fakepage';
    iframe.style.display = 'none';
    window.addEventListener('message', (messageEvent) => {
        if (messageEvent.origin !== 'https://example.com') {
            return;
        }
        const data = String(messageEvent.data);
        if (!data.startsWith('cpUserscriptSpeakNewQuestionsCrossDomain: ')) {
            return;
        }
        const message = data.match(/: (.*)/)![1];
        for (const callback of onMessageCallbacks) {
            callback(message);
        }
    });
    const onMessageCallbacks = new Set<(message: string) => void>();
    return {
        addMessageListener(callback: (message: string) => void) {
            onMessageCallbacks.add(callback);
        },
        removeMessageListener(callback: (message: string) => void) {
            onMessageCallbacks.delete(callback);
        },
        postMessage(message: string) {
            iframe.contentWindow?.postMessage(`cpUserscriptSpeakNewQuestionsCrossDomain: ${message}`, '*');
        },
    };
};
