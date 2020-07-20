import * as postRootState from './attachListenersAndOpen3ColLayoutOnTextareaFocus/postRootState';
export const closeLayout = (scrollImmediately = false) => {
    const oldPostRoot = postRootState.get();
    if (!oldPostRoot) {
        // User is not in the 3-column layout; nothing to do
        return;
    }
    oldPostRoot.querySelectorAll('[data-resizer]').forEach((resizer) => {
        resizer.remove();
    });
    // Restore the rows attribute to its default value (which was removed when the layout was opened):
    (oldPostRoot.querySelector('textarea.wmd-input') as HTMLTextAreaElement).rows = 15;
    oldPostRoot.querySelector('button[data-cpuserscript-three-columns-toggle]')!.textContent = 'Open 3-column layout';
    oldPostRoot.removeAttribute('data-cpuserscript-three-columns-post-root');
    if (window.location.href.endsWith('/edit')) {
        document.querySelector('#mainbar')!.removeAttribute('data-cpuserscript-three-columns-edit-mainbar');
    }
    /* The grippie bar is invisible in the 3-col interface.
     * SE's JS sets style properties directly to it, which can rarely result in width issues after the layout is closed
     * (like if user tries to review an edit while in 3-col interface on a post).
     * Just remove all styles from it
     */
    oldPostRoot.querySelector<HTMLElement>('.grippie')!.removeAttribute('style');
    document.documentElement.removeAttribute('data-cpuserscript-three-columns-layout-open');
    window.$('html, body').animate({ scrollTop: window.$(oldPostRoot).offset()!.top - 55 }, scrollImmediately ? 0 : 200);
    postRootState.set(null);
};
