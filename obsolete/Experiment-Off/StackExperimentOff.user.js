// ==UserScript==
// @name             Stack Experiment Off
// @description      Turns off the voting experiment - shows true vote totals on pageload and after voting
// @description      https://meta.stackoverflow.com/questions/390178/new-popup-message-when-voting-on-a-question
// @author           CertainPerformance
// @namespace        https://github.com/CertainPerformance/Stack-Exchange-Userscripts
// @version          1.1.1
// @include          /^https://stackoverflow\.com/questions/(?:\d+|tagged|search)/
// @run-at           document-start
// @grant            none
// ==/UserScript==

// IMPORTANT: This script must run before any script on the page does.
// If using Tampermonkey, enable instant script injection via:
// Settings -> Experimental -> Inject Mode -> Instant

const fixQuestionPage = () => {
  const nonNullObj = param => typeof param === 'object' && param !== null;
  new MutationObserver((mutations, observer) => {
    // Wait for window.StackExchange.init to be defined, which is done in stub.en.js near the top of the <head>
    if (!window.StackExchange || !window.StackExchange.init) {
      return;
    }
    observer.disconnect();
    const origInit = window.StackExchange.init;
    window.StackExchange.init = function(...args) {
      if (nonNullObj(args[0]) && nonNullObj(args[0].site)) {
        args[0].site.negativeVoteScoreFloor = -10000;
      }
      return origInit.apply(this, args);
    };
    // origInit is not just a plain function, it also has properties assigned to it
    Object.assign(window.StackExchange.init, origInit);
  })
    .observe(document.documentElement, { childList: true, subtree: true });

  window.addEventListener('DOMContentLoaded', () => {
    // Display true vote counts:
    [...document.querySelectorAll('.js-vote-count')]
      .forEach((voteCountDiv) => {
        if (voteCountDiv.dataset.value) {
          voteCountDiv.textContent = voteCountDiv.dataset.value;
        }
      });
    // The "Thanks for the vote" message will come from the server - monkeypatch the modal that displays it to keep it from coming up:
    const { helpers } = window.StackExchange;
    const origShowToast = helpers.showToast;
    helpers.showToast = function(...args) {
      if (typeof args[0] === 'string' && args[0].includes('Since this post’s score')) {
        return;
      }
      return origShowToast.apply(this, args);
    }
  });
};


const fixQuestionListPage = () => {
  const initScript = [...document.querySelectorAll('script')]
    .find(script => script.textContent.trim().startsWith('StackExchange.init({'));
  if (!initScript) {
    throw new Error('No script with StackExchange.init found');
  }
  const negativeVoteScoreFloorMatch = initScript.textContent.trim().match(/"negativeVoteScoreFloor":([^,])/);
  if (!negativeVoteScoreFloorMatch) {
    // Maybe the experiment has ended:
    console.warn('No negativeVoteScoreFloor found');
    return;
  }
  const negativeVoteScoreFloorStr = negativeVoteScoreFloorMatch[1];
  // negativeVoteScoreFloorStr will be either "0", "-1", or "null"
  if (negativeVoteScoreFloorStr === 'null') {
    // User is part of the control group - scores are not hidden
    return;
  }
  const negativeVoteScoreFloor = Number(negativeVoteScoreFloorStr);
  const voteCountStrongsByQuestionId = {};
  for (const questionSummary of document.querySelectorAll('.question-summary')) {
    const questionId = questionSummary.id.match(/\d+/)[0];
    const voteCountStrong = questionSummary.querySelector('.vote-count-post > strong');
    const voteCount = Number(voteCountStrong.textContent.trim());
    if (voteCount > negativeVoteScoreFloor) {
      // Vote count is higher than the floor, no need to fetch info:
      continue;
    }
    voteCountStrongsByQuestionId[questionId] = voteCountStrong;
    voteCountStrong.textContent = '?';
  }
  const questionIdsStr = Object.keys(voteCountStrongsByQuestionId).join(';');
  console.log(Object.keys(voteCountStrongsByQuestionId).length);
  if (questionIdsStr.length === 0) {
    // No questions exist on this page
    return;
  }
  const paramsArr = [
    ['pagesize', '50'],
    ['key', 'sFEllbEySR32ZrZ1HOacHQ(('],
    ['site', 'stackoverflow'],
    ['filter', '!)8aD2yy2.nPGnjx'], // From https://api.stackexchange.com/docs/questions-by-ids: .wrapper -> items, .question -> { question_id, score }
  ];
  const searchParams = new URLSearchParams(paramsArr);
  const paramsString = `?${searchParams.toString()}`;
  const url = `https://api.stackexchange.com/2.2/questions/${questionIdsStr}${paramsString}`;
  fetch(url)
    .then(res => res.json())
    .then(({ items }) => {
      items.forEach(({ question_id, score }) => {
        voteCountStrongsByQuestionId[question_id].textContent = score;
      });
    });
};
if (/\/questions\/\d+/.test(window.location.href)) {
  fixQuestionPage();
} else {
  window.addEventListener('DOMContentLoaded', fixQuestionListPage);
}
