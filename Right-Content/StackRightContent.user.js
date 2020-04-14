// ==UserScript==
// @name             Stack Right Content
// @description      Makes question content stick to the right of the screen, resulting in more open space on the left
// @author           CertainPerformance
// @namespace        https://github.com/CertainPerformance/Stack-Exchange-Userscripts
// @version          1.0.0
// @include          /^https://stackoverflow\.com/questions/\d/
// @run-at           document-start
// @grant            none
// ==/UserScript==

// IMPORTANT: To avoid layout flickering during pageload, this script must run before before the page content loads
// If using Tampermonkey, enable instant script injection via:
// Settings -> Experimental -> Inject Mode -> Instant

'use strict';

// Make sure the container sticks to the right as soon as it appears, to avoid flickering
const styleTag = document.createElement('style');
styleTag.textContent = `
  body > .container {
    margin: 0 0 0 auto;
  }
`;
(document.body || document.documentElement).appendChild(styleTag);

// Preferable to configure the container directly, rather than have the extra <style> remain at the top level of the DOM
window.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('body > .container');
    if (container) {
        container.style.margin = '0 0 0 auto';
        styleTag.remove();
    }
});
