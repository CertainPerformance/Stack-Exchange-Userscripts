import { closeLayout } from '../closeLayout';

/**
 * Close layout if user confirms (via SE's window.confirm) that they want to discard the edit
 */
export const closeLayoutIfEditCancelSucceeds = (child: HTMLElement) => {
    /* A dialog may be about to come up asking for confirmation that the user wants to stop editing. See:
     * https://dev.stackoverflow.com/content//Js/full.en.js
     * search for: var cancelEdit = function (elem) {
     * SE's JS changes the .edit-post's handling-event data from 1 to 0 after the confirmation that an edit should be canceled
     * (On edit cancel, elements don't get removed from the DOM immediately, which is why handling-event is checked)
     */
    const $editPost = window.$(child.closest('.post-layout')!.querySelector('.edit-post')!);
    // Give Stack Exchange's JS time to see the event, then see if the editor is still open:
    window.setTimeout(() => {
        if ($editPost.data('handling-event') !== 1) {
            // User is no longer editing this post:
            closeLayout();
        }
    });
};
