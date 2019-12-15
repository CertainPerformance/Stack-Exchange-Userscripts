import { closeLayout } from '../closeLayout';
import * as postRootState from './postRootState';

export const createToggleButton = (postRootOfButton: HTMLElement, openLayout: (newPostRoot: HTMLElement) => void) => {
    // Get a reference to the container that either has "Save Edits" or "Post Your Answer" button:
    const postBottomContainer = postRootOfButton.querySelector('.form-submit, .post-editor ~ .grid.ai-center') || postRootOfButton;
    const toggleButton = postBottomContainer.appendChild(document.createElement('button'));
    toggleButton.setAttribute('data-cpuserscript-three-columns-toggle', '');
    toggleButton.textContent = 'Close 3-column layout';
    // This function will always be called just before entering the 3-column layout:
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
            // Nothing is currently open:
            openLayout(postRootOfButton);
        }
    });
};
