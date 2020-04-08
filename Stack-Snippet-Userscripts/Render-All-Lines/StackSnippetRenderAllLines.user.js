// ==UserScript==
// @name             Stack Snippet Render All Lines
// @description      Renders all code lines, so that code anywhere in the snippet can be searched for with Control-F
// @author           CertainPerformance
// @namespace        https://github.com/CertainPerformance/Stack-Exchange-Userscripts
// @version          1.0.0
// @include          /^https://(?:(?:(?:codereview|gamedev|codegolf|meta)\.(?:meta\.)?stackexchange\.com)|(\w+\.)?(?:meta\.)?stackoverflow\.com)/(?:questions/|posts/\d+/edit|review/\w(?!.*/stats|.*/history))/
// @grant            none
// ==/UserScript==

'use strict';

const configureCodemirrorDivs = (codeMirrorDivs) => {
    for (const codeMirrorDiv of codeMirrorDivs) {
        codeMirrorDiv.CodeMirror.doc.getEditor().setOption('viewportMargin', Infinity);
    }
};
const bodyObserverCallback = () => {
    const snippetModal = document.querySelector('.snippet-modal');
    if (!snippetModal) {
        return;
    }
    // Snippet modal was added, wait for it to be populated:
    const snippetObserverCallback = () => {
        const codeMirrorDivs = snippetModal.querySelectorAll('.CodeMirror');
        if (codeMirrorDivs.length === 0) {
            return;
        }
        snippetModalObserver.disconnect();
        configureCodemirrorDivs(codeMirrorDivs);
    };
    const snippetModalObserver = new MutationObserver(snippetObserverCallback);
    snippetModalObserver.observe(snippetModal, { childList: true });
};
const bodyObserver = new MutationObserver(bodyObserverCallback);
bodyObserver.observe(document.body, { childList: true });
