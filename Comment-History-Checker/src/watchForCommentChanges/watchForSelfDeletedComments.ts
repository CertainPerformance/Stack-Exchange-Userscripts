import { saveDeletedComment } from './saveDeletedComment';

export const watchForSelfDeletedComments = () => {
    const responseJSONHasSuccessProp = (responseJSON: object): responseJSON is { Success: unknown } => 'Success' in responseJSON;
    window.$(document).ajaxComplete((_, jqXHR, ajaxOptions) => {
        if (!ajaxOptions || !ajaxOptions.url) {
            return;
        }
        // A self-deleted comment results in a request to /posts/comments/commentId/vote/10:
        const commentIdMatch = ajaxOptions.url.match(/^\/posts\/comments\/(\d+)\/vote\/10$/);
        if (!commentIdMatch) {
            return;
        }
        const deletedCommentId = Number(commentIdMatch[1]);
        const responseJSON = jqXHR.responseJSON as unknown;
        if (typeof responseJSON !== 'object' || responseJSON === null) {
            return;
        }
        if (responseJSONHasSuccessProp(responseJSON) && responseJSON.Success === true) {
            // The comment was deleted successfully
            // wait for all SE handlers to finish, and wait for the MutationObserver (watching the <UL>) in watchForNewComments to finish too
            window.setTimeout(saveDeletedComment, 0, deletedCommentId);
        }
    });
};
