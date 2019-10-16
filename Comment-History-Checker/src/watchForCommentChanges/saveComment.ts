import { commentHrefToIds } from '../commentHrefToIds';

const anchorExists = (element: Element | null): element is HTMLAnchorElement => Boolean(element);
/**
 * Saves the comment surrounding this anchor in the database
 * @returns True if the database was changed, otherwise false
 */
export const saveComment = (userCommentAnchor: HTMLAnchorElement, savedComments: SavedComments) => {
    const dateElm = userCommentAnchor.nextElementSibling!.querySelector('.relativetime-clean') as HTMLElement;
    const timestamp = new Date(dateElm.title).getTime();
    const commentHTML = userCommentAnchor.closest('.comment-body')!.children[0].innerHTML;
    const questionAnchor = document.querySelector('#question-header > h1 > a');
    if (!anchorExists(questionAnchor)) {
        // Spam/rude question - it's likely already in the database, just don't try to update it
        return false;
    }
    const questionTitle = questionAnchor.textContent!;
    const commentHrefAttrib = userCommentAnchor.parentElement!.querySelector('a.comment-link')!.getAttribute('href')!;
    const commentHref = questionAnchor.href + commentHrefAttrib;
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
