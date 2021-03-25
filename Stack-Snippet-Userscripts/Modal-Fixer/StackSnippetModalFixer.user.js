// ==UserScript==
// @name             Stack Snippet Modal Fixer
// @description      Prevents snippet double-clicking from breaking the snippet interface
// @description      https://meta.stackoverflow.com/q/372944
// @author           CertainPerformance
// @namespace        https://github.com/CertainPerformance/Stack-Exchange-Userscripts
// @version          1.0.0
// @include          /^https://(?:(?:(?:codereview|gamedev|codegolf|meta)\.(?:meta\.)?stackexchange\.com)|(\w+\.)?(?:meta\.)?stackoverflow\.com)/(?:questions/|posts/\d+/edit|review/\w(?!.*/stats|.*/history))/
// @grant            none
// ==/UserScript==

'use strict';

document.body.appendChild(document.createElement('style')).textContent = `
.snippet-modal {
  pointer-events: auto !important;
}
`;
