import * as postRootState from './attachListenersAndOpen3ColLayoutOnTextareaFocus/postRootState';
export const closeLayout = (scrollImmediately = false) => {
    const oldPostRoot = postRootState.get();
    if (!oldPostRoot) {
        // User is not in the 3-column layout; nothing to do
        return;
    }
    // Restore the rows attribute to its default value (which was removed when the layout was opened):
    (oldPostRoot.querySelector('textarea.wmd-input') as HTMLTextAreaElement).rows = 15;
    oldPostRoot.querySelector('button[data-three-columns-userscript-toggle]')!.textContent = 'Open 3-column layout';
    oldPostRoot.removeAttribute('data-three-columns-userscript-post-root');
    document.documentElement.removeAttribute('data-three-columns-userscript');
    window.$('html, body').animate({ scrollTop: $(oldPostRoot).offset()!.top - 55 }, scrollImmediately ? 0 : 200);
    postRootState.set(null);
};
