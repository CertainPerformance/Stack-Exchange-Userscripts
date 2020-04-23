import { commentHrefToIds } from '../commentHrefToIds';

/**
 * Saves the comment surrounding this anchor in the database
 * @returns True if the database was changed, otherwise false
 */
export const saveComment = (userCommentAnchor: HTMLAnchorElement, savedComments: SavedComments) => {
    const dateElm = userCommentAnchor.nextElementSibling!.querySelector<HTMLElement>('.relativetime-clean')!;
    const timestamp = new Date(dateElm.title).getTime();
    // Some sites have a MathJax preview which is the first child of the body, rather than the comment-copy being the first child
    const commentHTML = userCommentAnchor.closest('.comment-body')!.querySelector('.comment-copy')!.innerHTML;
    const questionAnchor = document.querySelector('#question-header > h1 > a');
    if (!questionAnchor) {
        // Spam/rude question - it's likely already in the database, just don't try to update it
        return false;
    }
    const questionTitle = questionAnchor.textContent!;
    // Cannot just use .href  of the comment-link below,
    // because there may be a query string which comes between the /question-title and the #commentID_postID
    const commentHrefAttrib = userCommentAnchor.parentElement!.querySelector('a.comment-link')!.getAttribute('href')!;
    const commentHref = window.location.origin + window.location.pathname + commentHrefAttrib;
    const { commentId } = commentHrefToIds(commentHref);
    const newCommentObj = {
        commentHTML,
        commentHref,
        questionTitle,
        timestamp,
    };
    if (JSON.stringify(newCommentObj) !== JSON.stringify(savedComments[commentId])) {
        savedComments[commentId] = newCommentObj;
        // A change was made:
        return true;
    }
    // No changes were made:
    return false;
};
