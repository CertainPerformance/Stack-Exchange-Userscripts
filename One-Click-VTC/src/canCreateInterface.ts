export const canCreateInterface = () => {
    const myProfile = document.querySelector<HTMLAnchorElement>('.my-profile');
    if (!myProfile) {
        // Not logged in, don't do anything
        return;
    }
    const myProfileLink = myProfile.href;
    const { rep } = window.StackExchange.options.user;
    if (rep < 3000) {
        // tslint:disable-next-line: no-console
        console.error(`Stack One Click VTC: Need 3000 rep to VTC, but you only have ${rep}`);
        return;
    }
    // Do not display the VTC interface if you've posted a non-deleted answer:
    const stillVisibleAnswerAuthorAnchors = [...document.querySelectorAll<HTMLAnchorElement>('.answer:not(.deleted-answer) .user-details[itemprop="author"] a[href^="/users/"]')];
    if (stillVisibleAnswerAuthorAnchors.some(a => a.href === myProfileLink)) {
        return;
    }
    // Interface will be ~250px wide
    // So, only create interface if there's at least 250px between container and viewport edge:
    const emptySpaceToLeftOfContent = document.querySelector<HTMLElement>('.container')!.getBoundingClientRect().left;
    if (emptySpaceToLeftOfContent < 250) {
        // tslint:disable-next-line: no-console
        console.warn(`Not enough space to put Stack One Click VTC interface to left of main content: 250px required, ${Math.floor(emptySpaceToLeftOfContent)}px found`);
        if (document.querySelector<HTMLElement>('#left-sidebar')!.offsetParent !== null) {
            // tslint:disable-next-line: no-console
            console.warn('Consider disabling the left sidebar at https://stackoverflow.com/users/preferences/');
        }
        // tslint:disable-next-line: no-console
        console.warn('To acquire more space, consider installing Stack Right Content: https://github.com/CertainPerformance/Stack-Exchange-Userscripts/tree/master/Right-Content');
        return;
    }
    const closeQuestionLink = document.querySelector<HTMLAnchorElement>('.close-question-link');
    if (!closeQuestionLink) {
        // Probably only occurs with locked posts
        // or with deleted posts user does not have the privilege to see
        // or 404 pages
        return;
    }
    if (document.querySelector('#question.deleted-answer')) {
        // Question is deleted. Yes, deleted questions have the deleted-answer class
        return;
    }
    if (closeQuestionLink.textContent === 'reopen' || closeQuestionLink.title.includes('You voted')) {
        return;
    }
    return true;
};
