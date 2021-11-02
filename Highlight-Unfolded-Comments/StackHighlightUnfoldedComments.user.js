// ==UserScript==
// @name             Stack Highlight Unfolded Comments
// @description      Keeps newly-unfolded comments highlighted, to easily distinguish them from higher-scoring comments you've already read
// @author           CertainPerformance
// @namespace        https://github.com/CertainPerformance/Stack-Exchange-Userscripts
// @version          1.0.7
// @include          /^https://(?:[^/]+\.)?(?:(?:stackoverflow|serverfault|superuser|stackexchange|askubuntu|stackapps)\.com|mathoverflow\.net)/(?:questions/\d|review/\w(?!.*/stats|.*/history))/
// @grant            none
// ==/UserScript==

'use strict';

const seenCommentIds = new Set();
document.addEventListener('click', ({ target }) => {
    // When a .comments-link is clicked, new comments will be fetched, and the container contents will shortly be replaced
    if (!target.closest('.comments-link')) {
        return;
    }
    const commentsContainer = target.closest('.post-layout--right');
    commentsContainer.querySelectorAll('.js-comment').forEach((comment) => {
        seenCommentIds.add(comment.dataset.commentId);
    });
    observeContainer(commentsContainer);
});
const observedContainers = new Set();
const observeContainer = (commentsContainer) => {
    if (observedContainers.has(commentsContainer)) {
        return;
    }
    observedContainers.add(commentsContainer);
    const ul = commentsContainer.querySelector('ul');
    new MutationObserver(() => {
        const newComments = [];
        for (const comment of ul.querySelectorAll('.js-comment')) {
            /* If the "Show # more comments" that was clicked is the same one as was present on pageload,
             * all comment <li>s will be replaced with the response from the server.
             * Otherwise, if the clicked link appeared as a result of new comment(s) that were just recently made,
             * only the newly posted comment <li>s will be appended (prior <li>s will stay in the document).
             */
            if (!seenCommentIds.has(comment.dataset.commentId)) {
                newComments.push(comment);
            } else {
                comment.children[0].style.removeProperty('background-color');
                comment.children[1].style.removeProperty('background-color');
            }
        }
        const myProfile = document.querySelector('.my-profile');
        const anchorToUserId = a => a.href.match(/\d+/)[0];
        // User may not be logged in:
        const userid = myProfile ? anchorToUserId(myProfile) : null;
        const someoneElseMadeNewComment = newComments.some(
            comment => anchorToUserId(comment.querySelector('.comment-user')) !== userid,
        );
        // Only highight new comments if at least one comment was made by someone other than yourself:
        if (!someoneElseMadeNewComment) {
            return;
        }
        for (const comment of newComments) {
            window.setTimeout(() => {
                const highlightColor =
                  document.body.matches('.theme-system') && window.matchMedia('(prefers-color-scheme: dark)').matches ||
                  document.body.matches('.theme-dark')
                    ? '#403d33' // Dark brown, close to default dark background
                    : '#fff2e0'; // Pale yellow, close to default light background
                // eslint-disable-next-line no-param-reassign
                comment.children[0].style.backgroundColor = highlightColor;
                // eslint-disable-next-line no-param-reassign
                comment.children[1].style.backgroundColor = highlightColor;
                // The built-in transition from --yellow-100 to no background lasts for 2000ms
                // Assign the style at 1500ms for display consistency
            }, 1500);
        }
    })
        .observe(ul, { childList: true });
};
