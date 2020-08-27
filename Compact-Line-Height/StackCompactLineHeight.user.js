// ==UserScript==
// @name             Stack Compact Line Height
// @description      Reduces the space between lines back to what it used to be
// @author           CertainPerformance
// @namespace        https://github.com/CertainPerformance/Stack-Exchange-Userscripts
// @version          1.0.1
// @include          /^https://(?:[^/]+\.)?(?:(?:stackoverflow|serverfault|superuser|stackexchange|askubuntu|stackapps)\.com|mathoverflow\.net)//
// @run-at           document-start
// @grant            none
// ==/UserScript==

// SEMI-IMPORTANT: If you wish to avoid flickering on pageload, this script must run before the page content loads
// If using Tampermonkey, you may need to enable instant script injection via:
// Settings -> Experimental -> Inject Mode -> Instant

'use strict';

(document.head || document.documentElement).appendChild(document.createElement('style')).textContent = `
.s-prose {
    /* Feel free to adjust the number below as desired */
    /* 1.3 was the old line-height, 1.6 is the new line-height */
    line-height: 1.3 !important;
}
`;
