import { commentHrefToIds } from '../../commentHrefToIds';

/**
 * Remove the TRs at the bottom of the comment table which will be visible if user navigates to the next page
 * so as to leave visible only the TRs for deleted comments which would have fallen through the cracks due to pagination
 */
export const removeRedundantTrs = (apiCommentIds: Set<number>) => {
    /* Starting at the topmost invisible tr near the bottom (these TRs were all dynamically inserted),
     * make the trs visible until you come across one whose comment_id exists
     * do not show that tr, and don't show any trs after that one either
     * because they'll all be visible at the top of the next page
     */
    const trailingRows = document.querySelectorAll('[data-cpuserscript-unverified-trailing-row]');
    let haveFoundExistingPost = false;
    trailingRows.forEach((tr) => {
        const { commentId } = commentHrefToIds(tr.querySelector('a')!.href);
        if (apiCommentIds.has(commentId)) {
            haveFoundExistingPost = true;
        }
        if (haveFoundExistingPost) {
            tr.remove();
        } else {
            // Make the row visible:
            tr.removeAttribute('data-cpuserscript-unverified-trailing-row');
        }
    });
};
