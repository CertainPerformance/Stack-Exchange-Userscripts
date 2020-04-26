// ==UserScript==
// @name             Stack Highlight Comment Pings
// @description      Highlights comment replies that have @-pinged you
// @author           CertainPerformance
// @namespace        https://github.com/CertainPerformance/Stack-Exchange-Userscripts
// @version          1.0.1
// @include          /^https://(?:[^/]+\.)?(?:(?:stackoverflow|serverfault|superuser|stackexchange|askubuntu|stackapps)\.com|mathoverflow\.net)/questions/\d+/
// @grant            none
// ==/UserScript==

'use strict';

const main = () => {
    const usernameWithoutSpaces = window.decodeURI(myProfile.href.match(/[^/]+$/)[0]).replace(/-/g, '');
    /* Make a regular expression to match substrings starting with the username, which is not within an HTML attribute
     * Eg: from username `user123`
     * make a regex to match @user, or @user12
     * Usernames with odd characters like ʇ̲ or π are hard to make a simple pattern for
     * except on very recent browsers with unicode character class support
     * So, construct the pattern dynamically with a character set instead
     * Eg, from a username of fooʇ̲bar
     * create the pattern /@([fooʇ̲bar\w]+)(?!\w)(?![^<>]*>)/i
     * (?!\w) - ensure that we're (almost certainly) at the end of the username characters past the @
     * (?![^<>]*>) - ensure the match is not inside an HTML tag
     */
    const pattern = new RegExp(String.raw`@([${usernameWithoutSpaces}\w]+)(?!\w)(?![^<>]*>)`, 'i');

    const processedCommentSpans = new Set();
    const processCommentSpan = (commentSpan) => {
        if (processedCommentSpans.has(commentSpan)) {
            return;
        }
        processedCommentSpans.add(commentSpan);
        // eslint-disable-next-line no-param-reassign
        commentSpan.innerHTML = commentSpan.innerHTML.replace(
            pattern,
            (match, nameStart) => (
                /* Just because the pattern matches doesn't mean the mentioned user is the same
                 * eg, a user named "foo" should not have "@oof" highlighted
                 * So, use a startsWith check:
                 */
                usernameWithoutSpaces.startsWith(nameStart.toLowerCase())
                    ? `<span style="background-color:yellow">@${nameStart}</span>`
                    : match // change nothing
            ),
        );
    };
    const processAllCommentSpans = () => {
        document.querySelectorAll('li.comment .comment-copy').forEach(processCommentSpan);
    };

    /* Each post (question or answer) has a UL as a comment container
     * When changes are observed there with MutationObserver, process all comments on the page
     * Attach a MutationObserver to all ULs on pageload, and also on every ajaxComplete (when new answers, and thus new ULs, may have appeared)
     */
    const ulsBeingObserved = new Set();
    const attachObserverToUL = (ul) => {
        if (ulsBeingObserved.has(ul)) {
            return;
        }
        ulsBeingObserved.add(ul);
        new MutationObserver(processAllCommentSpans).observe(ul, { childList: true });
    };
    const attachObserverToAllULs = () => {
        document.querySelectorAll('ul.comments-list').forEach(attachObserverToUL);
    };
    attachObserverToAllULs();
    window.$(document).ajaxComplete(attachObserverToAllULs);
    processAllCommentSpans();
};

const myProfile = document.querySelector('.my-profile');
if (myProfile) {
    main();
}
