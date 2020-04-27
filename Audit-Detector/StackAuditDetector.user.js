// ==UserScript==
// @name             Stack Audit Detector
// @description      Detects audits in review queues
// @author           CertainPerformance
// @namespace        https://github.com/CertainPerformance/Stack-Exchange-Userscripts
// @version          1.0.5
// @include          /^https://(?:[^/]+\.)?(?:(?:stackoverflow|serverfault|superuser|stackexchange|askubuntu|stackapps)\.com|mathoverflow\.net)/review/\w(?!.*/stats|.*/history)/
// @run-at           document-start
// @grant            none
// ==/UserScript==

// The @run-at document-start will ensure that the userscript runs in time, before SE has a chance to respond with a new task
// Without it, given certain setups, the first task loaded into the page will infrequently not be detected by the below code
// Experimental Inject Mode: Instant isn't required

'use strict';

const main = () => {
    window.$(document).on('ajaxComplete', (event, jqXHR, { url }) => {
        if ((url.startsWith('/review/next-task') || url.startsWith('/review/task-reviewed/')) && jqXHR.responseJSON.reviewTaskId) {
            const reviewBar = document.querySelector('.js-review-bar');
            reviewBar.style.backgroundColor = jqXHR.responseJSON.isAudit
                ? 'var(--red-200)' // CSS variables differ depending on whether in light or dark mode
                : 'var(--blue-200)'; // Using these ensures reasonable contrast regardless
        }
    });
};
if (window.$) {
    main();
} else {
    Object.defineProperty(window, '$', {
        configurable: true,
        set(newVal) {
            // Remove this setter:
            delete window.$;
            window.$ = newVal;
            main();
        },
    });
}
