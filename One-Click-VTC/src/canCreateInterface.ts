import { getSettings } from './settings';

export const canCreateInterface = () => {
    const myProfile = document.querySelector<HTMLAnchorElement>('.my-profile');
    if (!myProfile) {
        // Not logged in, or site is down, don't do anything
        return;
    }
    const myProfileLink = myProfile.getAttribute('href');
    const { rep } = window.StackExchange.options.user;
    if (rep < 15) {
        // tslint:disable-next-line: no-console
        console.error(`Stack One Click VTC: Need 15 rep to flag and 3000 to close, but you only have ${rep}`);
        return;
    }
    // Do not display the VTC interface if you've posted a non-deleted answer:
    const stillVisiblePersonalAnswerAuthorAnchor = document.querySelector(`.answer:not(.deleted-answer) .user-details[itemprop="author"] a[href^="${myProfileLink}"]`);
    if (stillVisiblePersonalAnswerAuthorAnchor) {
        return;
    }
    // Do not display the VTC interface if you posted the question:
    if (document.querySelector(`.owner a[href^="${myProfileLink}"]`)) {
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
    const flagQuestionLink = document.querySelector<HTMLAnchorElement>('.flag-post-link ');
    if (!flagQuestionLink) {
        // Probably only occurs with locked posts
        // or with deleted posts user does not have the privilege to see
        // or 404 pages
        return;
    }
    if (document.querySelector('#question.deleted-answer')) {
        // Question is deleted. Yes, deleted questions have the deleted-answer class
        return;
    }
    const questionTitle = document.querySelector('.question-hyperlink')!.textContent!;
    if (questionTitle.endsWith(' [closed]') || questionTitle.endsWith(' [duplicate]')) {
        return;
    }
    const closeQuestionLink = document.querySelector<HTMLAnchorElement>('.close-question-link');
    if (closeQuestionLink && closeQuestionLink.title.includes('You voted')) {
        return;
    }
    const questionId = Number(window.location.href.match(/\d+/)![0]);
    if (rep < 3000 && localStorage.cpUserscriptOneClickVTCSettings && getSettings().raisedCloseFlags.includes(questionId)) {
        return;
    }
    return true;
};
