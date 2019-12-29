// ==UserScript==
// @name             Stack Preserve Selection On Edit
// @description      Keeps edited posts from being replaced if you just selected text inside
// @author           CertainPerformance
// @namespace        https://github.com/CertainPerformance/Stack-Exchange-Userscripts
// @version          1.0.1
// @include          /^https://(?:[^/]+\.)?(?:(?:stackoverflow|serverfault|superuser|stackexchange|askubuntu|stackapps)\.com|mathoverflow\.net)/questions/\d/
// @grant            none
// ==/UserScript==

window.addEventListener(
    'click',
    (e) => {
        const { target } = e;
        const postRoot = target.closest('.question, .answer');
        if (
            postRoot &&
            postRoot.querySelector('.new-post-activity') &&
            window.getSelection().toString() &&
            // Only interfere with clicks inside the main post body - don't interfere with clicks on the comment pane, nor with clicks on the notification bar
            target.closest('.answercell, .postcell') &&
            // Don't interfere with clicks on the post menu ("edit", "close", ...)
            !target.closest('.post-menu') &&
            // In the inline editor, SE's click handler will only be attached to the notification bar / comments section; nothing to interfere with
            !postRoot.querySelector('.inline-editor')
        ) {
            e.stopPropagation();
        }
    },
    true
);
