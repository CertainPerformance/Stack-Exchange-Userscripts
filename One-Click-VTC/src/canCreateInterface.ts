export const canCreateInterface = () => {
    const myProfile = document.querySelector('.my-profile');
    if (!myProfile) {
        // Not logged in, don't do anything
        return;
    }
    const myProfileLink = (myProfile as HTMLAnchorElement).href;
    const { rep } = window.StackExchange.options.user;
    if (rep < 3000) {
        console.error(`Stack One Click VTC: Need 3000 rep to VTC, but you only have ${rep}`);
        return;
    }
    // Do not display the VTC interface if you've posted a non-deleted answer:
    const stillVisibleAnswerAuthorAnchors = [...document.querySelectorAll('.answer:not(.deleted-answer) .user-details[itemprop="author"] a[href^="/users/"]')] as HTMLAnchorElement[];
    if (stillVisibleAnswerAuthorAnchors.some(a => a.href === myProfileLink)) {
        return;
    }
    const viewportWidth = document.documentElement.clientWidth;
    // Interface will be ~250px wide, and will be placed 250px to the right of the .container
    // So, only create interface if there's at least 250px between (centered) container and viewport edge:
    const containerWidth = (document.querySelector('.container') as HTMLElement).offsetWidth;
    if (containerWidth + 500 > viewportWidth) {
        console.warn('Not enough space to put Stack One Click VTC interface to left of main content');
        if (document.querySelector('#left-sidebar')) {
            console.warn('Consider disabling the left sidebar at https://stackoverflow.com/users/preferences/');
        }
        return;
    }
    const closeQuestionLink = document.querySelector('.close-question-link');
    if (!closeQuestionLink) {
        // Probably only occurs with locked posts
        // or with deleted posts user does not have the privilege to see
        // or 404 pages
        return;
    }
    if (closeQuestionLink.textContent === 'reopen' || (closeQuestionLink as HTMLAnchorElement).title.includes('You voted')) {
        return;
    }
    return true;
};
