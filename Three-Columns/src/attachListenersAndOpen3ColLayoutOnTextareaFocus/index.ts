import { closeLayoutOnPostEditorClose } from './closeLayoutOnPostEditorClose';
import { closeLayoutWhenPostRefreshed } from './closeLayoutWhenPostRefreshed';
import { openLayout } from './openLayout';
import * as postRootState from './postRootState';

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
        const newPostRoot = target.closest('#post-form, .answer, .question');
        if (!newPostRoot) {
            // This should not happen
            console.error(target);
            throw new Error('Stack Three Columns: No containing post root found, but .wmd-input was just focused!');
        }
        const validatedNewPostRoot = newPostRoot as HTMLElement;
        // If this was a post root previously, but it was closed, do not proceed:
        const postHasBeenHandledBefore = Boolean(validatedNewPostRoot.querySelector('button[data-three-columns-userscript-toggle]'));
        if (postHasBeenHandledBefore) {
            return;
        }
        const isEdit = !validatedNewPostRoot.matches('#post-form');
        if (isEdit) {
            closeLayoutOnPostEditorClose(validatedNewPostRoot);
            closeLayoutWhenPostRefreshed(validatedNewPostRoot);
        }
        openLayout(validatedNewPostRoot);
    };
    window.addEventListener('focusin', focusinHandler);
};
