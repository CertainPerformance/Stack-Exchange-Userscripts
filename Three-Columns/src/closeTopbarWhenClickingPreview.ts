/**
 * When one of the topbar menus are open (inbox, reputation, etc), clicking anywhere else is supposed to close it
 * Due to a bug, this does not happen when clicking the post preview section, which is a big problem when the preview comprises a large part of the screen
 * See: https://dev.stackoverflow.com/content//Js/full.en.js
 * Search for "// clicking anywhere else closes dialogs"
 */
export const closeTopbarWhenClickingPreview = () => {
    window.addEventListener('click', (e) => {
        if ((e.target as HTMLElement).closest('.wmd-preview')) {
            window.StackExchange.topbar.hideAll();
        }
    }, true);
};
