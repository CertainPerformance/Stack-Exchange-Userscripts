// ==UserScript==
// @name             Stack Review Reopen Revised Tab
// @author           CertainPerformance
// @description      In Reopen Votes, automatically go to the "Revised" tab
// @version          1.0
// @include          /^https://stackoverflow.com/review/reopen/\d+/
// @grant            none
// ==/UserScript==
/* global $ */

$(document).on('ajaxComplete', (event, jqXHR, { url }) => {
  if ((url.startsWith('/review/next-task/') || url.startsWith('/review/task-reviewed/')) && jqXHR.responseJSON.reviewTaskId) {
    const revisedTabAnchor = document.querySelector('a.original-closed-post');
    if (revisedTabAnchor) {
      revisedTabAnchor.click();
    }
  }
});
