/**
 * Runs on example.com inside an iframe in a Newest tab to allow for communication between different SE domains
 */
export const handleFakePage = () => {
    // See setupCrossDomainCommunication for detailed description
    if (window.top === window) {
        return;
    }
    const channel = new BroadcastChannel('cpUserscriptSpeakNewQuestionsCrossDomain');
    channel.addEventListener('message', ({ data }) => {
        if (!String(data).startsWith('cpUserscriptSpeakNewQuestionsCrossDomain: ')) {
            return;
        }
        window.top.postMessage(data, '*');
    });
    window.addEventListener('message', (messageEvent) => {
        const data = String(messageEvent.data);
        if (!data.startsWith('cpUserscriptSpeakNewQuestionsCrossDomain: ')) {
            return;
        }
        channel.postMessage(data);
    });
};
