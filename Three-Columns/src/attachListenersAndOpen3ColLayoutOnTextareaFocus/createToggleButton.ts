import { closeLayout } from '../closeLayout';
import * as postRootState from './postRootState';

export const createToggleButton = (postRootOfButton: HTMLElement, openLayout: (newPostRoot: HTMLElement) => void) => {
    // Get a reference to the container that either has "Save Edits" or "Post Your Answer" button:
    const postButtomContainerSelector = postRootOfButton.matches('#post-form') ? '.form-submit' : '.post-editor ~ .grid.ai-center';
    const postBottomContainer = postRootOfButton.querySelector(postButtomContainerSelector)!;
    const toggleButton = postBottomContainer.appendChild(document.createElement('button'));
    toggleButton.setAttribute('data-three-columns-userscript-toggle', '');
    // This function will always be called just before entering the 3-column layout:
    toggleButton.textContent = 'Close 3-column layout';
    /* Want to put the button on the right of the postBottomContainer,
     * but postBottomContainer may or may not have display: flex
     * margin-left: auto is effective when flex is being used - otherwise, float: right does it
     */
    toggleButton.style.cssText = 'float: right; margin-left: auto;';
    toggleButton.addEventListener('click', (e) => {
        // Don't submit the surrounding form:
        e.preventDefault();
        const currentPostRoot = postRootState.get();
        const columnsLayoutOpen = Boolean(currentPostRoot);
        const thisPostRootOpen = currentPostRoot === postRootOfButton;
        if (thisPostRootOpen) {
            (postRootOfButton.querySelector('.wmd-input') as HTMLTextAreaElement).focus();
            closeLayout();
        } else if (columnsLayoutOpen) {
            // A different post root is currently open, so close that other one and open this one:
            closeLayout();
            openLayout(postRootOfButton);
        } else {
            openLayout(postRootOfButton);
        }
    });
};
