// ==UserScript==
// @name             Stack Review Reopen Revised Tab
// @description      In Reopen Votes, automatically go to the "Revised" tab
// @author           CertainPerformance
// @namespace        https://github.com/CertainPerformance/Stack-Exchange-Userscripts
// @version          1.0.0
// @include          /^https://stackoverflow.com/review/reopen/\d+/
// @grant            none
// ==/UserScript==
/* global $ */

'use strict';

$(document).on('ajaxComplete', (event, jqXHR, { url }) => {
  if ((url.startsWith('/review/next-task/') || url.startsWith('/review/task-reviewed/')) && jqXHR.responseJSON.reviewTaskId) {
    const revisedTabAnchor = document.querySelector('a.original-closed-post');
    if (revisedTabAnchor) {
      revisedTabAnchor.click();
    }
  }
});
