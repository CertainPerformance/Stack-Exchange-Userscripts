// ==UserScript==
// @name             Stack Share to Shortlink
// @description      Replaces "Share" link with a shortlink not linked to your account
// @author           CertainPerformance
// @namespace        https://github.com/CertainPerformance/Stack-Exchange-Userscripts
// @version          1.0.1
// @include          /^https://(?:[^/]+\.)?(?:(?:stackoverflow|serverfault|superuser|stackexchange|askubuntu|stackapps)\.com|mathoverflow\.net)/questions/\d/
// @grant            none
// ==/UserScript==

'use strict';

for (const a of document.querySelectorAll('.js-share-link')) {
    const href = a.href.match(/\D+\d+/)[0];
    a.outerHTML = `<a href="${href}" title="short permalink to this question">Shortlink</a>`;
}
