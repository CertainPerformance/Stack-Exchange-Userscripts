// ==UserScript==
// @name             Stack Compact Line Height
// @description      Reduces the space between lines to what it used to be
// @author           CertainPerformance
// @namespace        https://github.com/CertainPerformance/Stack-Exchange-Userscripts
// @version          1.0.0
// @include          /^https://(?:[^/]+\.)?(?:(?:stackoverflow|serverfault|superuser|stackexchange|askubuntu|stackapps)\.com|mathoverflow\.net)//
// @grant            none
// ==/UserScript==

'use strict';

document.body.appendChild(document.createElement('style')).textContent = `
.s-prose {
    line-height: 1.3;
}
`;
