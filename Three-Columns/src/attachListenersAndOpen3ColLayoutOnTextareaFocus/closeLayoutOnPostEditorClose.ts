import { closeLayout } from '../closeLayout';
import { closeLayoutIfEditCancelSucceeds } from './closeLayoutIfEditCancelSucceeds';
import * as postRootState from './postRootState';

/**
 * If 3-columns layout is open for a post edit when the edit gets submitted, or when the user cancels the edit via Escape or cancel button,
 * close the layout
 */
export const closeLayoutOnPostEditorClose = (thisPostRoot: HTMLElement) => {
    // Close layout when edit is submitted
    // This must be done through jQuery, because SE's JS sometimes submits the form by calling `div.find('form').submit()`
    // which does not trigger native DOM submit event listeners
    const form = thisPostRoot.querySelector('form')!;
    window.$(form).on('submit', () => {
        if (postRootState.get() === thisPostRoot) {
            closeLayout();
        }
    });
    // When exiting editing via clicking "Cancel" button:
    thisPostRoot.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.closest('[data-cpuserscript-three-columns-post-root]') && target.matches('.cancel-edit')) {
            closeLayoutIfEditCancelSucceeds(target);
        }
    });
    // When exiting editing via pressing "Escape" in one of the inputs:
    const keydownHandler = (e: KeyboardEvent) => {
        if (e.key !== 'Escape') {
            return;
        }
        const inputsThatTryToExitEditingWhenEscPressed = '#title, .wmd-input, #tagnames, .edit-comment';
        const target = e.target as HTMLElement;
        if (target.matches(inputsThatTryToExitEditingWhenEscPressed) && target.closest('[data-cpuserscript-three-columns-post-root]')) {
            closeLayoutIfEditCancelSucceeds(target);
        }
    };
    // Must listen in capturing phase, because SE's JS will return false -> stopPropagation() in jQuery
    thisPostRoot.addEventListener('keydown', keydownHandler, true);
};
