// ==UserScript==
// @name             Stack Snippet Lag Fixer
// @description      Makes post previews with stack snippets re-render after a debounced delay, rather than immediately after every keypress
// @description      https://meta.stackoverflow.com/q/373443
// @description      https://meta.stackoverflow.com/q/346458
// @author           CertainPerformance
// @namespace        https://github.com/CertainPerformance/Stack-Exchange-Userscripts
// @version          1.0.2
// @include          /^https://(?:(?:(?:codereview|gamedev|codegolf|meta)\.(?:meta\.)?stackexchange\.com)|(\w+\.)?(?:meta\.)?stackoverflow\.com)/(?:questions/|posts/\d+/edit|review/\w(?!.*/stats|.*/history))/
// @grant            none
// ==/UserScript==

'use strict';

// Milliseconds to wait after typing before a re-render:
const msDelay = 700;

const queueRender = (() => {
    // To avoid re-creating render functions every time an event is triggered,
    // use a persistent Map of elements to their render functions:
    const renderFnsMap = new WeakMap();
    let timeout;

    const getRenderFn = (elm) => {
        if (renderFnsMap.has(elm)) {
            return renderFnsMap.get(elm);
        }
        const render = () => {
            elm.dispatchEvent(new Event('input'));
            window.clearTimeout(timeout);
            document.removeEventListener('mousemove', render);
        };
        renderFnsMap.set(elm, render);
        return render;
    };

    // queueRender function: Call render after msDelay or after a mousemove event,
    // whichever comes first:
    return (elm) => {
        const render = getRenderFn(elm);
        window.clearTimeout(timeout);
        timeout = window.setTimeout(render, msDelay);
        document.addEventListener('mousemove', render);
    };
})();

const hasSnippet = textarea => textarea.value.includes('<!-- begin snippet');

const handler = (event) => {
    // .wmd-input: question and answer textboxes, for both posting and editing
    // isTrusted check required so that the dispatched event above isn't caught
    const { target, isTrusted } = event;
    if (target.matches('.wmd-input') && isTrusted && hasSnippet(target)) {
        event.stopPropagation();
        queueRender(target);
    }
};

// All of these events trigger the re-render by default:
const eventNames = ['keypress', 'keydown', 'input'];
eventNames.forEach((eventName) => {
    // Must intercept the event in the capturing phase, before the event reaches the textarea:
    document.addEventListener(eventName, handler, true);
});
