import { isAdjustable } from '../isAdjustable';
import { createToggleButton } from './createToggleButton';
import * as postRootState from './postRootState';

export const openLayout = (newPostRoot: HTMLElement) => {
    const textarea = newPostRoot.querySelector<HTMLTextAreaElement>('textarea.wmd-input')!;
    // Remove rows attribute so that the height: 100% in the CSS can take effect:
    textarea.removeAttribute('rows');
    // If "Enter 3-column layout" was just pressed, the textarea won't be focused, so focus it:
    textarea.focus();
    newPostRoot.setAttribute('data-cpuserscript-three-columns-post-root', '');
    const toggleButton = newPostRoot.querySelector('button[data-cpuserscript-three-columns-toggle]');
    if (!toggleButton) {
        createToggleButton(newPostRoot, openLayout);
    } else {
        toggleButton.textContent = 'Close 3-column layout';
    }
    if (isAdjustable) {
        newPostRoot.insertAdjacentHTML('beforeend', '<div data-resizer></div><div data-resizer></div>');
    }
    document.documentElement.setAttribute('data-cpuserscript-three-columns-layout-open', '');
    postRootState.set(newPostRoot);
};
