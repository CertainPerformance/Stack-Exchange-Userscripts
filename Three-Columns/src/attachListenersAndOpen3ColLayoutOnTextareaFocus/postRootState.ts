/**
 * This variable will hold the element with [data-three-columns-userscript-post-root], while it's being displayed in 3 columns.
 * When not in 3-column layout, will be null (and no element will match [data-three-columns-userscript-post-root])
 * The currentPostRoot will match one of: #post-form, .answer, .question
 */
let currentPostRoot: HTMLElement | null;
export const get = () => currentPostRoot;
export const set = (newPostRoot: HTMLElement | null) => {
    currentPostRoot = newPostRoot;
};
