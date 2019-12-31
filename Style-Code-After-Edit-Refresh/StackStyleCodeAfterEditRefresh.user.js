// ==UserScript==
// @name             Stack Style Code After Edit Refresh
// @description      Shows Stack Snippet buttons and does syntax highlighting when refreshing an edited post
// @author           CertainPerformance
// @namespace        https://github.com/CertainPerformance/Stack-Exchange-Userscripts
// @version          1.0.1
// @include          /^https://(?:[^/]+\.)?(?:(?:stackoverflow|serverfault|superuser|stackexchange|askubuntu|stackapps)\.com|mathoverflow\.net)/
// @grant            none
// ==/UserScript==

'use strict';

const patchStyleCode = (origStyleCode) => {
    let styleCodeCalledRecently = false;
    window.styleCode = () => {
        styleCodeCalledRecently = true;
        origStyleCode();
        window.setTimeout(() => {
            styleCodeCalledRecently = false;
        }, 100);
    };

    const callStyleCodeIfUncalled = () => {
        if (!styleCodeCalledRecently) {
            origStyleCode();
        }
    };
    window.$(document).on(
        'ajaxComplete',
        (event, jqXHR, ajaxOptions) => {
            if (ajaxOptions.url.startsWith('/posts/ajax-load-realtime/')) {
                // Ajax response received. SE's JS fades out the old post over 150 ms (see replaceIndividualPostContents),
                // then replaces it with the new post body (`$newBodyCell`)
                // If styleCode hasn't been called by then, call it ourselves:
                window.setTimeout(callStyleCodeIfUncalled, 200, origStyleCode);
            }
        },
    );
};

if (window.styleCode) {
    patchStyleCode(window.styleCode);
} else {
    // Wait for SE's JS to assign to window.styleCode
    // When it does, call patchStyleCode
    Object.defineProperty(
        window,
        'styleCode',
        {
            configurable: true,
            set(newVal) {
                delete window.styleCode; // Remove this setter
                patchStyleCode(newVal);
            },
        },
    );
}
