import { closeLayout } from '../closeLayout';

/**
 * If the user clicks on "An edit has been made to this post" while editing that post in 3-column layout, close the layout
 */
export const closeLayoutWhenPostRefreshed = (newPostRoot: HTMLElement) => {
    const clickHandler = (e: MouseEvent) => {
        if ((e.target as HTMLElement).matches('[data-three-columns-userscript-post-root] .new-post-activity > a')) {
            closeLayout();
        }
    };
    // The site's JS will call stopPropagation on this event, so for this delegated listener to work, it must be triggered in the capturing phase
    // see function postEdit in https://dev.stackoverflow.com/content//Js/full.en.js
    newPostRoot.addEventListener('click', clickHandler, true);
};
