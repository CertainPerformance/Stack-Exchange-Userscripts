import { closeLayoutOnPostEditorClose } from './closeLayoutOnPostEditorClose';
import { closeLayoutWhenPostRefreshed } from './closeLayoutWhenPostRefreshed';
import { openLayout } from './openLayout';
import * as postRootState from './postRootState';

// The below is needed because, when a post needs to be updated,
// if the user presses "Edit", the textarea will temporarily be focused before the post gets replaced.
// Don't enter the interface in this situation.
const postIdsAboutToBeReplaced = new Set<number>();
// tslint:disable-next-line: variable-name
window.$(document).on('refreshEdit', (_event, postId) => {
    if (typeof postId !== 'number') {
        return;
    }
    postIdsAboutToBeReplaced.add(postId);
});
// tslint:disable-next-line: variable-name
window.$(document).ajaxComplete((_event, _jqXHR, { url = '' }) => {
    const match = url.match(/^\/posts\/ajax-load-realtime\/(\d+)\?/);
    if (!match) {
        return;
    }
    const postId = Number(match[1]);
    window.setTimeout(
        () => {
            postIdsAboutToBeReplaced.delete(postId);
            // The post gets replaced 150ms after the ajaxComplete comes back - see replaceIndividualPostContents, in realtime-se.js, in full.en.js
        },
        200,
    );
});

export const attachListenersAndOpen3ColLayoutOnTextareaFocus = () => {
    const focusinHandler = (e: FocusEvent) => {
        const target = e.target as HTMLElement;
        const currentPostRoot = postRootState.get();
        // Run the function body when the user is not in the 3-column layout, and either:
        // the user clicks on the Answer textarea,
        // or when the user clicks Edit, has the inline editing privilege, and the site's built-in JS focuses the newly created textarea
        if (currentPostRoot || !target.matches('.wmd-input')) {
            return;
        }
        if (target.closest('.review-content')) {
            // Don't do anything for "Improve Edit" or "Reject and Edit" interfaces
            return;
        }
        const { href } = window.location;
        const newPostRoot = target.closest<HTMLElement>(
            href.endsWith('/ask')
                ? '.post-editor'
                : '#post-form, .answer, .question, #client-revision-guid ~ .post-editor .ps-relative',
        );
        if (!newPostRoot) {
            // This should not happen
            // tslint:disable-next-line: no-console
            console.error(target);
            throw new Error('Stack Three Columns: No containing post root found, but .wmd-input was just focused!');
        }
        const postIdMatch = target.id.match(/\d+$/);
        if (postIdMatch && postIdsAboutToBeReplaced.has(Number(postIdMatch[0]))) {
            return;
        }
        if (href.endsWith('/edit')) {
            document.querySelector('#mainbar')!.setAttribute('data-cpuserscript-three-columns-edit-mainbar', '');
        }
        // If this was a post root previously, but it was closed, do not proceed:
        const postHasBeenHandledBefore = Boolean(newPostRoot.querySelector('button[data-cpuserscript-three-columns-toggle]'));
        if (postHasBeenHandledBefore) {
            return;
        }
        const isInlineEdit = newPostRoot.matches('.question, .answer');
        if (isInlineEdit) {
            closeLayoutOnPostEditorClose(newPostRoot);
            closeLayoutWhenPostRefreshed(newPostRoot);
        }
        openLayout(newPostRoot);
    };
    window.addEventListener('focusin', focusinHandler);
};
