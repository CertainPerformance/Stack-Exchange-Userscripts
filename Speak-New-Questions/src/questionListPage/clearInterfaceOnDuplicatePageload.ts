export const clearInterfaceOnDuplicatePageload = (channel: BroadcastChannel, speakInterface: Element) => {
    // Tell question pages that a new list page is active
    channel.postMessage('New Newest page');
    channel.addEventListener('message', ({ data }) => {
        if (data === 'New Newest page') {
            // This is a Newest list page, but another Newest page has been opened
            // This page is now obsolete
            speakInterface.textContent = 'Use more recent newest tab';
            channel.close();
        }
    });
};
