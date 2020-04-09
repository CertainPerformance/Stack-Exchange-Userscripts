// ==UserScript==
// @name             Stack Snippet Find
// @description      Makes control-F inside snippet editor only show results inside the editor
// @author           CertainPerformance
// @namespace        https://github.com/CertainPerformance/Stack-Exchange-Userscripts
// @version          1.0.1
// @include          /^https://(?:(?:(?:codereview|gamedev|codegolf|meta)\.)(?:[^/]+\.)?stackexchange\.com|(?:[^/]+\.)?stackoverflow\.com)/(?:questions/(?:\d|ask/)|posts/\d+/edit|review/\w(?!.*/stats|.*/history))/
// @grant            none
// ==/UserScript==

'use strict';

const style = document.createElement('style');
style.textContent = `
body > *:not(.snippet-modal):not(.lightbox) {
  display: none !important;
}
`;

// Need to store the scroll position because it gets lost when the page content is set to display: none
// When the snippet closes and the page content is displayed again, scroll to previous position
let lastScrollY;

const mutCallback = (mutations) => {
    const snippetModalAdded = mutations.some(({ addedNodes }) => addedNodes[0] && addedNodes[0].matches('.snippet-modal'));
    // This runs when the user has either clicked on "Edit the above snippet",
    // or on the create-snippet icon at the top of a post textarea
    // or when pressing Control-M when inside a post textarea:
    if (snippetModalAdded) {
        lastScrollY = window.scrollY;
        document.body.appendChild(style);
        // The lightbox's height will have already been set to the height of the pre-hidden body, which is too large
        // No scrollbars should be visible
        document.querySelector('.lightbox').style.height = `${window.innerHeight}px`;
        return;
    }
    const snippetModalRemoved = mutations.some(({ removedNodes }) => removedNodes[0] && removedNodes[0].matches('.snippet-modal'));
    if (snippetModalRemoved) {
        style.remove();
        window.scrollTo(0, lastScrollY);
    }
};
const observer = new MutationObserver(mutCallback);
observer.observe(document.body, { childList: true });

window.addEventListener(
    'keyup',
    (e) => {
        // When in snippet editor, when escape key is pressed, call stopPropagation in the capturing phase
        // so that the editor doesn't try to close, if you just wanted to close the browser's Find box
        if (e.key === 'Escape' && document.querySelector('.snippet-modal')) {
            e.stopPropagation();
        }
    },
    true,
);
