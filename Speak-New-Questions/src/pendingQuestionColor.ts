export const pendingQuestionColor = (() => {
    if (window.location.href === 'https://example.com/fakepage') {
        // Export won't be used
        return '';
    }
    return document.body.matches('.theme-dark')
        ? '#404000'
        : 'yellow';
})();
