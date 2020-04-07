// ==UserScript==
// @name             Stack Snippet Visible Cursor
// @description      Makes the CodeMirror text cursor always visible even when the browser is zoomed out
// @author           CertainPerformance
// @namespace        https://github.com/CertainPerformance/Stack-Exchange-Userscripts
// @version          1.0.0
// @include          /^https://(?:(?:(?:codereview|gamedev|codegolf|meta)\.)(?:[^/]+\.)?stackexchange\.com|(?:[^/]+\.)?stackoverflow\.com)/(?:questions/(?:\d|ask/)|posts/\d+/edit|review/\w(?!.*/stats|.*/history))/
// @grant            none
// ==/UserScript==

'use strict';

document.body.appendChild(document.createElement('style')).textContent = `
.CodeMirror-cursor {
    border-left: thin solid #0C0D0E;
}
`;
