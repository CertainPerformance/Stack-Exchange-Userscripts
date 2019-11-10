export const enterInterfaceWhenCopyToAnswer = () => {
    /* This will only actually enter the interface if it's currently closed (and this textarea hasn't been focused before).
     * The interface won't open in the rare case that this is an extremely popular question
     * that asks for confirmation that you want to add yet another answer,
     * but that's so rare it's not worth worrying about (and user can always focus the textarea manually)
     */
    window.addEventListener('click', (e) => {
        if (!((e.target as HTMLElement).matches('.copySnippet'))) {
            return;
        }
        const markdownTextarea = $('#post-editor textarea.wmd-input');
        markdownTextarea.focus();
    });
};
