// ==UserScript==
// @name             Stack Instant Syntax Highlighting
// @description      When writing a post, syntax highlights code in the preview immediately, rather than after a few seconds
// @author           CertainPerformance
// @namespace        https://github.com/CertainPerformance/Stack-Exchange-Userscripts
// @version          1.0.0
// @include          /^https://(?:[^/]+\.)?(?:(?:stackoverflow|serverfault|superuser|stackexchange|askubuntu|stackapps)\.com|mathoverflow\.net)/(?:questions/(?:\d|ask)|posts/\d+/edit|review)/
// @grant            none
// ==/UserScript==

'use strict';

/* This is the code Stack Exchange runs on editor creation:
 *     jWmd = $("#wmd-input" + postfix)
 *     jWmd.typeWatch({ highlight: false, wait: 5000, captureLength: 5, callback: styleCode });
 */

const watched = new WeakSet();
window.addEventListener('focusin', ({ target }) => {
  if (!target.matches('[id^="wmd-input"]') || watched.has(target)) {
    return;
  }
  watched.add(target);
  const jWmd = window.$(target);
  jWmd.typeWatch({ highlight: false, wait: 200, captureLength: 5, callback: window.styleCode });
});
