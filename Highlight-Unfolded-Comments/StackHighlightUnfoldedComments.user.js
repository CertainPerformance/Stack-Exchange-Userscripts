// ==UserScript==
// @name             Stack Highlight Unfolded Comments
// @description      Keeps newly-unfolded comments highlighted, to easily distinguish them from higher-scoring comments you've already read
// @author           CertainPerformance
// @namespace        https://github.com/CertainPerformance/Stack-Exchange-Userscripts
// @version          1.0.1
// @include          /^https://(?:[^/]+\.)?(?:(?:stackoverflow|serverfault|superuser|stackexchange|askubuntu|stackapps)\.com|mathoverflow\.net)/(?:questions/\d|review)/
// @grant            none
// ==/UserScript==

'use strict';

const seenCommentIds = new Set();
document.addEventListener('click', ({ target }) => {
    // When a .comments-link is clicked, new comments will be fetched, and the container contents will shortly be replaced
    if (!target.closest('.comments-link')) {
        return;
    }
    const commentsContainer = target.closest('.post-layout');
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
        ul.querySelectorAll('.js-comment').forEach((comment) => {
            if (!seenCommentIds.has(comment.dataset.commentId)) {
                window.setTimeout(() => {
                    // eslint-disable-next-line no-param-reassign
                    comment.children[0].style.backgroundColor = '#fff2e0';
                    // eslint-disable-next-line no-param-reassign
                    comment.children[1].style.backgroundColor = '#fff2e0';
                    // The built-in transition lasts for 2000ms. Assign the lighter style at 1500ms for display consistency
                }, 1500);
            }
        });
    })
        .observe(ul, { childList: true });
};
