// ==UserScript==
// @name             Stack One Click VTC
// @description      Allows voting to close with a single click
// @author           CertainPerformance
// @namespace        https://github.com/CertainPerformance/Stack-Exchange-Userscripts
// @version          1.0.1
// @include          /^https://stackoverflow\.com/questions/\d+/
// @grant            none
// ==/UserScript==

'use strict';

// Userscript is intended for those with reasonably wide screens
// Unless you actually use it, consider disabling the left sidebar - it takes up space the userscript interface may need to use

// Set the below to true or false
// If set to true, note that voting will *only* occur if you haven't already voted (+ or -) on the post
const downvoteWhenVotingToClose = true;



const index = () => {
    if (!canCreateInterface()) {
        return;
    }
    const vtcContainer = document.querySelector('.container').insertAdjacentElement('afterbegin', document.createElement('div'));
    vtcContainer.innerHTML = html;
    vtcContainer.setAttribute('data-cpuserscript-one-click-vtc', '');
    document.body.appendChild(document.createElement('style')).textContent = cssText;
    vtcContainer.addEventListener('click', tryVoteClose);
};

const canCreateInterface = () => {
    const myProfile = document.querySelector('.my-profile');
    if (!myProfile) {
        // Not logged in, don't do anything
        return;
    }
    const myProfileLink = myProfile.href;
    const { rep } = window.StackExchange.options.user;
    if (rep < 3000) {
        console.error(`Stack One Click VTC: Need 3000 rep to VTC, but you only have ${rep}`);
        return;
    }
    // Do not display the VTC interface if you've posted a non-deleted answer:
    const stillVisibleAnswerAuthorAnchors = [...document.querySelectorAll('.answer:not(.deleted-answer) .user-details[itemprop="author"] a[href^="/users/"]')];
    if (stillVisibleAnswerAuthorAnchors.some(a => a.href === myProfileLink)) {
        return;
    }
    const viewportWidth = document.documentElement.clientWidth;
    // Interface will be ~250px wide, and will be placed 250px to the right of the .container
    // So, only create interface if there's at least 250px between (centered) container and viewport edge:
    const containerWidth = document.querySelector('.container').offsetWidth;
    if (containerWidth + 500 > viewportWidth) {
        console.warn('Not enough space to put Stack One Click VTC interface to left of main content');
        if (document.querySelector('#left-sidebar')) {
            console.warn('Consider disabling the left sidebar at https://stackoverflow.com/users/preferences/');
        }
        return;
    }
    const closeQuestionLink = document.querySelector('.close-question-link');
    if (!closeQuestionLink) {
        // Probably only occurs with locked posts
        // or with deleted posts user does not have the privilege to see
        // or 404 pages
        return;
    }
    if (closeQuestionLink.textContent === 'reopen' || closeQuestionLink.title.includes('You voted')) {
        return;
    }
    return true;
};

let canSendRequest = true;
const tryVoteClose = ({ target }) => {
    if (!canSendRequest) {
        return;
    }
    const { closeReasonId, closeAsOffTopicReasonId } = target.dataset;
    if (!closeReasonId) {
        // All of the elements that are intended to be clickable have this:
        return;
    }
    // Only vote if you haven't already voted on the question:
    if (downvoteWhenVotingToClose && !document.querySelector('.question .fc-theme-primary')) {
        document.querySelector('.question .js-vote-down-btn').click();
    }

    const formData = new FormData();
    formData.append('fkey', window.StackExchange.options.user.fkey);
    formData.append('closeReasonId', closeReasonId);
    if (closeAsOffTopicReasonId) {
        formData.append('closeAsOffTopicReasonId', closeAsOffTopicReasonId);
    }
    const initOptions = {
        body: formData,
        credentials: 'same-origin',
        method: 'POST',
    };
    const questionId = window.location.href.match(/\d+/)[0];
    const url = `${window.location.origin}/flags/questions/${questionId}/close/add`;
    canSendRequest = false;
    fetch(url, initOptions)
        .then(res => res.json())
        .then((result) => {
            if (result.ResultChangedState) {
                // Question successfully closed
                window.location.href = window.location.href;
                return;
            }
            if (!result.Success) {
                window.StackExchange.helpers.showToast(result.Message, { transient: false, type: 'danger' });
                canSendRequest = true;
                return;
            }
            target.closest('[data-cpuserscript-one-click-vtc]').remove();
            const closeQuestionLink = document.querySelector('.close-question-link');
            closeQuestionLink.title = result.Tooltip;
            const totalCloseVotes = result.Count;
            closeQuestionLink.textContent = `close (${totalCloseVotes})`;

            // The below imitates close_updateCloseLinkCount in https://dev.stackoverflow.com/content//Js/full.en.js
            const shortMessage = (result.Message || '').length < 150;
            const options = {
                transient: shortMessage,
                css: {
                    'max-width': '600px',
                    'line-height': shortMessage ? 'inherit' : '25px'
                }
            };
            window.$(closeQuestionLink).parent().showInfoMessage(result.Message, options);
        })
        .catch((error) => {
            canSendRequest = true;
            const msg = 'Stack One Click VTC: An error occurred, see console for details';
            window.StackExchange.helpers.showToast(msg, { transient: false, type: 'danger' });
        });
};

const html = `
<h2>Vote to close as</h2>
<h3>Off-topic</h3>
<div>
    <div data-close-reason-id="OffTopic" data-close-as-off-topic-reason-id="4">General computing</div>
    <div data-close-reason-id="OffTopic" data-close-as-off-topic-reason-id="7">Server or networking administration</div>
    <div data-close-reason-id="OffTopic" data-close-as-off-topic-reason-id="16">Off-site resource request</div>
    <div data-close-reason-id="OffTopic" data-close-as-off-topic-reason-id="13">No MCVE</div>
    <div data-close-reason-id="OffTopic" data-close-as-off-topic-reason-id="11">Caused by typo</div>
</div>
<h3 data-close-reason-id="Unclear">Unclear</h3>
<h3 data-close-reason-id="TooBroad">Too Broad</h3>
<h3 data-close-reason-id="OpinionBased">Opinion-Based</h3>
`;
const cssText = `
[data-cpuserscript-one-click-vtc] {
    position: absolute;
    margin-top: 24px;
    left: -250px;
}
[data-cpuserscript-one-click-vtc] > div {
    margin-left: 20px;
}
[data-cpuserscript-one-click-vtc] > div > div:hover, [data-cpuserscript-one-click-vtc] > h3:nth-child(n + 4):hover {
    background-color: yellow;
}
[data-cpuserscript-one-click-vtc] > div > div, [data-cpuserscript-one-click-vtc] > h3:nth-child(n + 4) {
    margin-bottom: 10px;
    padding: 5px;
    cursor: pointer;
}
`;
index();
