/*
 * Iterate through all rowstatsContainers on the page.
 * If the comment associated with a container is not in apiCommentIds,
 * identify the cause and set the appropriate attribute for color-coding
 */
export const highlightCommentsWithoutData = (
    rowstatsContainersByIds: RowstatsContainersByIds,
    apiCommentIds: Set<number>,
    apiPostIds: Set<number>,
    savedComments: SavedComments,
) => {
    [...rowstatsContainersByIds.byComment.entries()].forEach(([commentId, rowstatsContainer]) => {
        if (apiCommentIds.has(commentId)) {
            // Comment still exists in system - nothing to highlight
            return;
        }
        // Either the post was deleted, or the comment was deleted:
        const tr = rowstatsContainer.closest('tr')!;
        const postId = Number(tr.dataset.postid);
        const commentIsPossibleDuplicateOf = tr.querySelector('td:nth-child(3) > span')!.textContent!.startsWith('Possible duplicate of ');
        // Note that the the post deletion indicator takes priority over both comment self-deletion indicator and mod deletion indicator
        if (!apiPostIds.has(postId)) {
            // The parent post was deleted; the comment was not singled out
            tr.setAttribute('data-cpuserscript-post-removed', '');
        } else if (savedComments[commentId] && savedComments[commentId].selfDeleted) {
            // You deleted the comment:
            tr.setAttribute('data-cpuserscript-self-deleted', '');
        } else if (commentIsPossibleDuplicateOf) {
            // Comment starts with "Possible duplicate of" and no longer exists:
            tr.setAttribute('data-cpuserscript-duplicate-removed', '');
        } else {
            // The parent post still exists; the comment was deleted by a mod or the system:
            tr.setAttribute('data-cpuserscript-comment-removed', '');
        }
    });
};
