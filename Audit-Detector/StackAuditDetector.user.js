// ==UserScript==
// @name             Stack Audit Detector
// @description      Detects audits in review queues
// @author           CertainPerformance
// @namespace        https://github.com/CertainPerformance/Stack-Exchange-Userscripts
// @version          1.0.3
// @include          /^https://(?:[^/]+\.)?(?:(?:stackoverflow|serverfault|superuser|stackexchange|askubuntu|stackapps)\.com|mathoverflow\.net)/review/\w(?!.*/stats|.*/history)/
// @grant            none
// ==/UserScript==

'use strict';

window.$(document).on('ajaxComplete', (event, jqXHR, { url }) => {
    if ((url.startsWith('/review/next-task') || url.startsWith('/review/task-reviewed/')) && jqXHR.responseJSON.reviewTaskId) {
        const reviewBar = document.querySelector('.js-review-bar');
        reviewBar.style.backgroundColor = jqXHR.responseJSON.isAudit
            ? 'red'
            : 'yellow';
    }
});
