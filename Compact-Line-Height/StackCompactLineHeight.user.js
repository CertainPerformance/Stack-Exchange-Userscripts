// ==UserScript==
// @name             Stack Compact Line Height
// @description      Reduces the space between lines back to what it used to be
// @author           CertainPerformance
// @namespace        https://github.com/CertainPerformance/Stack-Exchange-Userscripts
// @version          1.3.0
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
/* Spacing between lines, normal text: */
.s-prose {
    /* 1.3 was the old line-height, 1.5 is the new line-height */
    line-height: 1.3 !important;
}

/* Spacing between lines, code blocks: */
.s-prose pre:not(.s-code-block) {
    /* 1.3 was the old line-height, 1.30769231; is the new line-height */
    line-height: 1.3 !important;
}

/* Spacing between separate elements: */
.s-prose p, .s-prose ol, .s-prose ul, .s-prose blockquote, .s-prose hr {
    margin-bottom: 15px !important;
}

.s-prose pre {
    margin-bottom: 13px !important;
}

.s-prose ol li, .s-prose ul li {
    margin-bottom: 7.5px !important;
}

.s-prose ol li:last-child, .s-prose ul li:last-child {
    margin-bottom: 0 !important;
}

.s-prose h1 { margin-bottom: 21px !important; }
.s-prose h2 { margin-bottom: 19px !important; }
.s-prose h3 { margin-bottom: 17px !important; }
.s-prose h4 { margin-bottom: 15px !important; }

.s-prose blockquote *:last-child {
    margin-bottom: 0 !important;
}
`;
