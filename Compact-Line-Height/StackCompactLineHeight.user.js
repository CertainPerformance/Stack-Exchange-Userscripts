// ==UserScript==
// @name             Stack Compact Line Height
// @description      Reduces the space between lines back to what it used to be
// @author           CertainPerformance
// @namespace        https://github.com/CertainPerformance/Stack-Exchange-Userscripts
// @version          1.2.0
// @include          /^https://(?:[^/]+\.)?(?:(?:stackoverflow|serverfault|superuser|stackexchange|askubuntu|stackapps)\.com|mathoverflow\.net)//
// @run-at           document-start
// @grant            none
// ==/UserScript==

// SEMI-IMPORTANT: If you wish to avoid flickering on pageload, this script must run before the page content loads
// If using Tampermonkey, you may need to enable instant script injection via:
// Settings -> Experimental -> Inject Mode -> Instant

'use strict';

// Feel free to adjust the numbers below as desired

(document.head || document.documentElement).appendChild(document.createElement('style')).textContent = `
/* Spacing for normal text: */
.s-prose {
    /* 1.3 was the old line-height, 1.5 is the new line-height */
    line-height: 1.3 !important;
}

/* Spacing for code blocks: */
.s-prose pre:not(.s-code-block) {
    /* 1.3 was the old line-height, 1.30769231; is the new line-height */
    line-height: 1.3 !important;
}

/* Spacing between paragraphs: */
.s-prose p {
    /* 15px (equal to 1em) was the old margin-bottom, 1.4em (equal to 21px); is the new margin-bottom */
    margin-bottom: 15px !important;
}
`;
