// ==UserScript==
// @name             Stack Preview Antifocus
// @description      Prevents post textarea from stealing focus when clicking on preview
// @author           CertainPerformance
// @namespace        https://github.com/CertainPerformance/Stack-Exchange-Userscripts
// @version          1.0.0
// @include          /^https://(?:[^/]+\.)?(?:(?:stackoverflow|serverfault|superuser|stackexchange|askubuntu|stackapps)\.com|mathoverflow\.net)/(?:questions/(?:\d|ask)|posts/\d+/edit)/
// @grant            none
// ==/UserScript==

'use strict';

/* This userscript stops the default behavior added by the page script here:
 * https://dev.stackoverflow.com/content//Js/wmd.en.js
 * search for
 * $(this).siblings().find('textarea').focus();
 *
 * SE's listener looks to be added to `.wmd-preview`s that exist on pageload - dynamically created ones aren't affected
 * So, userscript runs on and calls stopImmediatePropagation on clicks of previews on:
 *     Question page (answer preview)
 *     Edit page
 *     Ask page
 */

document.querySelectorAll('[id^="post-form"] .wmd-preview').forEach((preview) => {
  preview.addEventListener('click', (e) => {
    // "Edit the above snippet" listener needs to see event so that snippet editor interface can pop up
    if (!e.target.matches('.edit-snippet')) {
      e.stopImmediatePropagation()
    }
  });
});
