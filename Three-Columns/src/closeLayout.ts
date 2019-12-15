import * as postRootState from './attachListenersAndOpen3ColLayoutOnTextareaFocus/postRootState';
export const closeLayout = (scrollImmediately = false) => {
    const oldPostRoot = postRootState.get();
    if (!oldPostRoot) {
        // User is not in the 3-column layout; nothing to do
        return;
    }
    // Restore the rows attribute to its default value (which was removed when the layout was opened):
    (oldPostRoot.querySelector('textarea.wmd-input') as HTMLTextAreaElement).rows = 15;
    oldPostRoot.querySelector('button[data-cpuserscript-three-columns-toggle]')!.textContent = 'Open 3-column layout';
    oldPostRoot.removeAttribute('data-cpuserscript-three-columns-post-root');
    if (window.location.href.endsWith('/edit')) {
        document.querySelector('#mainbar')!.removeAttribute('data-cpuserscript-three-columns-edit-mainbar');
    }
    document.documentElement.removeAttribute('data-cpuserscript-three-columns-layout-open');
    window.$('html, body').animate({ scrollTop: $(oldPostRoot).offset()!.top - 55 }, scrollImmediately ? 0 : 200);
    postRootState.set(null);
};
