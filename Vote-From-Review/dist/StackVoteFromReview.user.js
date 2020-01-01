// ==UserScript==
// @name             Stack Vote From Review
// @description      Allows voting on items being reviewed from review queues
// @author           CertainPerformance
// @namespace        https://github.com/CertainPerformance/Stack-Exchange-Userscripts
// @version          1.0.1
// @include          /^https://(?:[^/]+\.)?(?:(?:stackoverflow|serverfault|superuser|stackexchange|askubuntu|stackapps)\.com|mathoverflow\.net)/review/(?!first-posts|late-answers)[^/]+(?:$|/\d)/
// @include          /^https://stackexchange.com/oauth-vote-from-review/
// @grant            none
// ==/UserScript==

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../common/declareGlobalStackExchange.ts":
/*!***********************************************!*\
  !*** ../common/declareGlobalStackExchange.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "../common/showToast.ts":
/*!******************************!*\
  !*** ../common/showToast.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! ./declareGlobalStackExchange */ "../common/declareGlobalStackExchange.ts");
exports.showToastError = (message) => {
    window.StackExchange.helpers.showToast(message, { transient: false, type: 'danger' });
};
exports.showToastInfo = (message) => {
    const transientTimeout = window.StackExchange.helpers.suggestedTransientTimeout(message, true);
    window.StackExchange.helpers.showToast(message, { transientTimeout, transient: true, type: 'info' });
};


/***/ }),

/***/ "./src/handleNewTask/getApi.ts":
/*!*************************************!*\
  !*** ./src/handleNewTask/getApi.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const getParamsString = () => {
    /* This is done in a function rather than set on the top level
     * to make sure that that the *latest* cpUserscriptVoteFromReviewAccessToken is retrieved from localStorage
     * just in case it was just refreshed when index.ts ran
     */
    const apiAccessToken = localStorage.cpUserscriptVoteFromReviewAccessToken;
    if (!apiAccessToken) {
        // Should not happen, except possibly on very slow connections the first time the script is ever run
        // while the browser is in the process of redirecting
        throw new Error('apiAccessToken not retrieved yet');
    }
    const thisSite = window.location.hostname
        .replace(/\.\w+$/, '') // Remove the TLD (.com, .net, ...)
        .replace(/\.stackexchange$/, ''); // The API does not need the ".stackexchange" suffix
    const paramsArr = [
        ['key', 'uzdnJ)JTbcUNb9NtC*WUQg(('],
        ['site', thisSite],
        ['filter', '!w-*Ytm8Gt4I)mVi4p2'],
        ['access_token', apiAccessToken],
    ];
    const searchParams = new URLSearchParams(paramsArr);
    const paramsString = `?${searchParams.toString()}`;
    return paramsString;
};
exports.getApi = (postId) => {
    const url = `https://api.stackexchange.com/2.2/posts/${postId}${getParamsString()}`;
    return fetch(url)
        .then(res => res.json());
};


/***/ }),

/***/ "./src/handleNewTask/getPostId.ts":
/*!****************************************!*\
  !*** ./src/handleNewTask/getPostId.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostId = () => {
    const { href, title } = document.querySelector('[title="view answer"], [title="view question"]');
    const postId = Number(href.match(title === 'view answer'
        ? /\d+$/ // eg https://stackoverflow.com/questions/14220321/how-do-i-return-the-response-from-an-asynchronous-call/14220323#14220323
        //                                                                                                                 ^^^^^^^^
        : /\d+/)[0]);
    return postId;
};


/***/ }),

/***/ "./src/handleNewTask/getVoteResponse.ts":
/*!**********************************************!*\
  !*** ./src/handleNewTask/getVoteResponse.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const getPostId_1 = __webpack_require__(/*! ./getPostId */ "./src/handleNewTask/getPostId.ts");
exports.getVoteResponse = (voteParam) => {
    const formData = new FormData();
    const fkey = window.StackExchange.options.user.fkey;
    formData.append('fkey', fkey);
    const initOptions = {
        body: formData,
        credentials: 'same-origin',
        method: 'POST',
    };
    const url = `${window.location.origin}/posts/${getPostId_1.getPostId()}/vote/${voteParam}`;
    return fetch(url, initOptions)
        .then(res => res.json())
        .then(resultUntyped => resultUntyped);
};


/***/ }),

/***/ "./src/handleNewTask/handleError.ts":
/*!******************************************!*\
  !*** ./src/handleNewTask/handleError.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const showToast_1 = __webpack_require__(/*! ../../../common/showToast */ "../common/showToast.ts");
exports.handleError = (error) => {
    // tslint:disable-next-line: no-console
    console.error(error);
    showToast_1.showToastError('Stack Vote From Review: An error occurred, see console for details');
};


/***/ }),

/***/ "./src/handleNewTask/highlightVoteButtonIfVotedHere.ts":
/*!*************************************************************!*\
  !*** ./src/handleNewTask/highlightVoteButtonIfVotedHere.ts ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const showToast_1 = __webpack_require__(/*! ../../../common/showToast */ "../common/showToast.ts");
const getApi_1 = __webpack_require__(/*! ./getApi */ "./src/handleNewTask/getApi.ts");
const getPostId_1 = __webpack_require__(/*! ./getPostId */ "./src/handleNewTask/getPostId.ts");
const handleError_1 = __webpack_require__(/*! ./handleError */ "./src/handleNewTask/handleError.ts");
const requestAccessToken_1 = __webpack_require__(/*! ./requestAccessToken */ "./src/handleNewTask/requestAccessToken.ts");
exports.highlightVoteButtonIfVotedHere = (votingContainer, accessTokenWasJustSaved) => {
    const postId = getPostId_1.getPostId();
    getApi_1.getApi(postId)
        .then((apiResponseUntyped) => {
        const { error_id, items } = apiResponseUntyped;
        if (error_id) {
            if (error_id === 403) {
                // Need to refresh access token:
                if (accessTokenWasJustSaved) {
                    // In case there's an issue with the SE API or in this userscript, make sure not to enter an endless redirecting loop
                    // This may also occur if user stays on a /review page for more than 24 hours, but that's rare and not worth bothering with
                    // tslint:disable-next-line: no-console
                    console.error('Stack Vote From Review: Access token was just saved, but API gave an error ID of 403');
                }
                else {
                    requestAccessToken_1.requestAccessToken();
                }
            }
            else {
                showToast_1.showToastError(`Stack Vote From Review Error: Stack Exchange API response code ${error_id}`);
            }
            return;
        }
        if (!items[0]) {
            // API did not return the post. Probably an audit
            return;
        }
        const { upvoted, downvoted } = items[0];
        if (upvoted || downvoted) {
            votingContainer.children[upvoted ? 0 : 2].classList.add('fc-theme-primary');
        }
    })
        .catch(handleError_1.handleError);
};


/***/ }),

/***/ "./src/handleNewTask/index.ts":
/*!************************************!*\
  !*** ./src/handleNewTask/index.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const highlightVoteButtonIfVotedHere_1 = __webpack_require__(/*! ./highlightVoteButtonIfVotedHere */ "./src/handleNewTask/highlightVoteButtonIfVotedHere.ts");
const listenForUpDownVotes_1 = __webpack_require__(/*! ./listenForUpDownVotes */ "./src/handleNewTask/listenForUpDownVotes.ts");
const listenForVoteCountClick_1 = __webpack_require__(/*! ./listenForVoteCountClick */ "./src/handleNewTask/listenForVoteCountClick.ts");
exports.handleNewTask = (accessTokenWasJustSaved) => {
    const voteCountDiv = document.querySelector('.js-vote-count');
    if (!voteCountDiv) {
        // No new tasks
        return;
    }
    if (document.querySelector('.js-vote-up-btn')) {
        // Vote buttons (including highlight indicating whether user has voted here) already exist
        // This can occur with certain completed review tasks, like in Triage
        return;
    }
    const voteCount = voteCountDiv.textContent;
    const votingContainer = document.createElement('div');
    votingContainer.className = 'js-voting-container grid fd-column ai-stretch gs4 fc-black-200';
    votingContainer.innerHTML = `
        <button class="js-vote-up-btn grid--cell s-btn s-btn__unset c-pointer" title="This question shows research effort; it is useful and clear" aria-pressed="false" aria-label="up vote" data-selected-classes="fc-theme-primary"><svg aria-hidden="true" class="svg-icon m0 iconArrowUpLg" width="36" height="36" viewBox="0 0 36 36"><path d="M2 26h32L18 10 2 26z"></path></svg></button>
        <div class="js-vote-count grid--cell fc-black-500 fs-title grid fd-column ai-center c-pointer" itemprop="upvoteCount" tabindex="0">${voteCount}</div>
        <button class="js-vote-down-btn grid--cell s-btn s-btn__unset c-pointer" title="This question does not show any research effort; it is unclear or not useful" aria-pressed="false" aria-label="down vote" data-selected-classes="fc-theme-primary"><svg aria-hidden="true" class="svg-icon m0 iconArrowDownLg" width="36" height="36" viewBox="0 0 36 36"><path d="M2 10h32L18 26 2 10z"></path></svg></button>
    `;
    votingContainer.style.paddingRight = '15px';
    const voteCellDiv = document.querySelector('.votecell');
    voteCellDiv.parentElement.replaceChild(votingContainer, voteCellDiv);
    listenForUpDownVotes_1.listenForUpDownVotes(votingContainer);
    listenForVoteCountClick_1.listenForVoteCountClick(votingContainer.children[1]);
    highlightVoteButtonIfVotedHere_1.highlightVoteButtonIfVotedHere(votingContainer, accessTokenWasJustSaved);
};


/***/ }),

/***/ "./src/handleNewTask/listenForUpDownVotes.ts":
/*!***************************************************!*\
  !*** ./src/handleNewTask/listenForUpDownVotes.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const showToast_1 = __webpack_require__(/*! ../../../common/showToast */ "../common/showToast.ts");
const getVoteResponse_1 = __webpack_require__(/*! ./getVoteResponse */ "./src/handleNewTask/getVoteResponse.ts");
const handleError_1 = __webpack_require__(/*! ./handleError */ "./src/handleNewTask/handleError.ts");
// Now, always displaying .message, if it exists. Check that it works. (vote limit, locked posts)
// "already voted on this post more than 5 min ago"
// Also check that the right toast color comes up - blue when near vote limit, red when at vote limit
exports.listenForUpDownVotes = (votingContainer) => {
    const [upButton, centerNetSumDiv, downButton] = votingContainer.children;
    const voteHandler = ({ currentTarget }) => {
        const currentlyVotedButton = votingContainer.querySelector('.fc-theme-primary');
        if (currentlyVotedButton) {
            currentlyVotedButton.classList.remove('fc-theme-primary');
        }
        const voteParam = currentlyVotedButton
            ? '0' // Retract your vote
            : currentTarget === upButton
                ? '2' // upvotes request /vote/2
                : '3'; // downvotes request /vote/3;
        getVoteResponse_1.getVoteResponse(voteParam)
            .then((result) => {
            if (result.Message) {
                if (result.Success) {
                    showToast_1.showToastInfo(result.Message);
                }
                else {
                    showToast_1.showToastError(result.Message);
                }
            }
            if (result.Success) {
                // result.LastVoteTypeId will be 2 if you just voted up, 3 if you just voted down, 0 or undefined otherwise
                if (result.LastVoteTypeId) {
                    (result.LastVoteTypeId === 2 ? upButton : downButton).classList.add('fc-theme-primary');
                }
                centerNetSumDiv.textContent = String(result.NewScore);
            }
            else if (currentlyVotedButton) {
                currentlyVotedButton.classList.add('fc-theme-primary');
            }
        })
            .catch(handleError_1.handleError);
    };
    upButton.addEventListener('click', voteHandler);
    downButton.addEventListener('click', voteHandler);
};


/***/ }),

/***/ "./src/handleNewTask/listenForVoteCountClick.ts":
/*!******************************************************!*\
  !*** ./src/handleNewTask/listenForVoteCountClick.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const showToast_1 = __webpack_require__(/*! ../../../common/showToast */ "../common/showToast.ts");
const getPostId_1 = __webpack_require__(/*! ./getPostId */ "./src/handleNewTask/getPostId.ts");
const handleError_1 = __webpack_require__(/*! ./handleError */ "./src/handleNewTask/handleError.ts");
const canFetchVoteDetails = (() => {
    if (window.location.href.startsWith('https://stackexchange.com/oauth-vote-from-review')) {
        return false;
    }
    const repText = document.querySelector('.-rep').textContent;
    const rep = Number(repText.match(/[\d,]+$/)[0].replace(/,/g, ''));
    return rep >= 1000;
})();
const getVoteCounts = async (centerNetSumDiv) => {
    const url = `${window.location.origin}/posts/${getPostId_1.getPostId()}/vote-counts?_=${Date.now()}`;
    const response = await fetch(url, { credentials: 'same-origin' });
    const responseText = await response.text();
    if (responseText === 'You may only fetch vote counts once every second') {
        showToast_1.showToastInfo(responseText);
        return;
    }
    try {
        const { up, down } = JSON.parse(responseText);
        centerNetSumDiv.innerHTML = `
            <div style="color:green">${up}</div>
            <div class="vote-count-separator"></div>
            <div style="color:maroon">${down}</div>
        `;
    }
    catch (e) {
        // responseText may not be JSON if there's an error
        showToast_1.showToastError(responseText);
    }
};
exports.listenForVoteCountClick = (centerNetSumDiv) => {
    if (!canFetchVoteDetails) {
        return;
    }
    centerNetSumDiv.title = 'View upvote and downvote totals';
    centerNetSumDiv.addEventListener('click', () => {
        getVoteCounts(centerNetSumDiv).catch(handleError_1.handleError);
    });
};


/***/ }),

/***/ "./src/handleNewTask/requestAccessToken.ts":
/*!*************************************************!*\
  !*** ./src/handleNewTask/requestAccessToken.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* Need the user to authenticate the API client so that an access_token can be stored in localStorage on the current domain
 *
 * Authorization process:
 * (0) Starting from https://stackoverflow.com/review/reopen/1234:
 * (1) Window href changes to https://stackoverflow.com/oauth/dialog, including a state parameter which indicates the domain to redirect back to on success
 * (2) User approves API permissions
 * (3) SE redirects to something like:
 *         https://stackexchange.com/oauth-vote-from-review#access_token=someAccessToken&expires=86400&state=https%3a%2f%2fstackoverflow.com%2freview%2freopen%2f1234
 *         (See below for redirect_uri explanation)
 * (4) Userscript running on https://stackexchange.com/oauth-vote-from-review reads the query string in the hash and redirects to:
 *         https://stackoverflow.com/review/reopen/1234?#access_token=someAccessToken
 * (5) Userscript running on https://stackoverflow.com/review/reopen/1234 reads the query string and saves the access_token into localStorage
 *
 * This could also be done with GM_setValue / GM.setValue, but they have different interfaces and are only supported in certain environments
 * Would prefer to use GM_setValue everywhere, but that would make the script incompatible with Greasemonkey 4.0 users
 *
 * Explanation of redirect_uri ('https://stackexchange.com/oauth-vote-from-review'):
 * It's a fake URL which 404s. There is not any useful content there, but API authorization requires any success redirect to be to a *single* domain
 * Eg, if the vote-from-review client settings permitted redirects to stackoverflow.com, redirects to any other SE domain would not be permitted
 * So, the https://stackexchange.com/oauth-vote-from-review page is @include-d in the metadata block
 * to exist a single stepping-stone URL for cross-domain communication
 *
 * Not using the more official stackexchange.com/oauth/login_success url to avoid possible collisions with other scripts
 *
 * This could be done without using the API at all by fetching the URL of the post and parsing the inline <script>,
 * but that's quite wasteful compared to the API, especially for those who review a lot
 */
Object.defineProperty(exports, "__esModule", { value: true });
const paramsArr = [
    ['client_id', '16456'],
    ['scope', 'private_info'],
    ['redirect_uri', 'https://stackexchange.com/oauth-vote-from-review'],
    ['state', window.location.href],
];
const searchParams = new URLSearchParams(paramsArr);
const paramsString = `?${searchParams.toString()}`;
const url = `https://stackoverflow.com/oauth/dialog${paramsString}`;
exports.requestAccessToken = () => {
    if (!window.location.search) {
        window.location.href = url;
    }
};


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! ../../common/declareGlobalStackExchange */ "../common/declareGlobalStackExchange.ts");
const handleNewTask_1 = __webpack_require__(/*! ./handleNewTask */ "./src/handleNewTask/index.ts");
const requestAccessToken_1 = __webpack_require__(/*! ./handleNewTask/requestAccessToken */ "./src/handleNewTask/requestAccessToken.ts");
const redirectOauthResultOnStackexchange_1 = __webpack_require__(/*! ./redirectOauthResultOnStackexchange */ "./src/redirectOauthResultOnStackexchange.ts");
const saveOauthResultOnOrigin_1 = __webpack_require__(/*! ./saveOauthResultOnOrigin */ "./src/saveOauthResultOnOrigin.ts");
// See handleNewTask/requestAccessToken for a description of this
if (window.location.href.startsWith('https://stackexchange.com/oauth-vote-from-review')) {
    redirectOauthResultOnStackexchange_1.redirectOauthResultOnStackexchange();
}
else {
    const { search } = window.location;
    const accessTokenWasJustSaved = saveOauthResultOnOrigin_1.saveOauthResultOnOrigin(search);
    if (!localStorage.cpUserscriptVoteFromReviewAccessToken && !accessTokenWasJustSaved) {
        /* This if-block should only occur the first time the script is run, ever
         * The access token only stays active for 24 hours (there is no duration option other than 24 hours, or completely permanent)
         * After it expires, the API will return an error, and the user will have to re-authenticate
         * (handled in highlightVoteButtonIfVotedHere)
         */
        requestAccessToken_1.requestAccessToken();
    }
    else {
        const reviewContent = document.querySelector('.review-content');
        if (reviewContent) {
            new MutationObserver(() => {
                handleNewTask_1.handleNewTask(accessTokenWasJustSaved);
            })
                .observe(reviewContent, { childList: true });
        }
    }
}


/***/ }),

/***/ "./src/redirectOauthResultOnStackexchange.ts":
/*!***************************************************!*\
  !*** ./src/redirectOauthResultOnStackexchange.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.redirectOauthResultOnStackexchange = () => {
    const params = new URLSearchParams(window.location.hash);
    const accessToken = params.get('#access_token');
    const originURL = params.get('state');
    if (!accessToken || !originURL) {
        // Unlikely to occur unless user manually navigates to the non-existent page https://stackexchange.com/oauth-vote-from-review
        // tslint:disable-next-line: no-console
        console.error('Stack Vote From Review: Required parameters missing from URL hash');
        return;
    }
    const newUrl = `${originURL}?access_token_vote_from_review=${accessToken}`;
    window.location.href = newUrl;
};


/***/ }),

/***/ "./src/saveOauthResultOnOrigin.ts":
/*!****************************************!*\
  !*** ./src/saveOauthResultOnOrigin.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.saveOauthResultOnOrigin = (search) => {
    const params = new URLSearchParams(search);
    const accessToken = params.get('access_token_vote_from_review');
    if (!accessToken) {
        // This may occur if there's a search string that doesn't include access_token_vote_from_review
        // Not sure if it could ever happen during normal operation
        return false;
    }
    localStorage.cpUserscriptVoteFromReviewAccessToken = accessToken;
    // Remove the token from the address bar:
    const { origin, pathname } = window.location;
    history.replaceState({}, '', origin + pathname);
    return true;
};


/***/ })

/******/ });