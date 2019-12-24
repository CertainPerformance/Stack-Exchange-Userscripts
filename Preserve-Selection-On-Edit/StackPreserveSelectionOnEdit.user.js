// ==UserScript==
// @name             Stack Preserve Selection On Edit
// @description      Keeps edited posts from being replaced if you just selected text inside
// @author           CertainPerformance
// @namespace        https://github.com/CertainPerformance/Stack-Exchange-Userscripts
// @version          1.0.0
// @include          /^https://(?:[^/]+\.)?(?:(?:stackoverflow|serverfault|superuser|stackexchange|askubuntu|stackapps)\.com|mathoverflow\.net)/questions/\d/
// @grant            none
// ==/UserScript==

window.addEventListener(
  'click',
  (e) => {
    const { target } = e;
    const postRoot = target.closest('.question, .answer');
    if (postRoot && postRoot.querySelector('.new-post-activity') && window.getSelection().toString() && !target.closest('.new-post-activity')) {
      e.stopPropagation();
    }
  },
  true
);