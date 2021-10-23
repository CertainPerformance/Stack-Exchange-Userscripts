// ==UserScript==
// @name             Stack Ask Dates Everywhere
// @description      Puts ask dates next to questions in question lists
// @author           CertainPerformance
// @namespace        https://github.com/CertainPerformance/Stack-Exchange-Userscripts
// @version          1.0.3
// @include          /^https://(?:[^/]+\.)?(?:(?:stackoverflow|serverfault|superuser|stackexchange|askubuntu|stackapps)\.com|mathoverflow\.net)/(?:(?:questions|\?tab).*)?$/
// @grant            none
// ==/UserScript==

/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/addResultsToQuestionList.ts":
/*!*****************************************!*\
  !*** ./src/addResultsToQuestionList.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addResultsToQuestionList = void 0;
const haveSEUpdateRelativeDates_1 = __webpack_require__(/*! ./haveSEUpdateRelativeDates */ "./src/haveSEUpdateRelativeDates.ts");
const changeFullListItem_1 = __webpack_require__(/*! ./changeFullListItem */ "./src/changeFullListItem.ts");
const changeMiniListItem_1 = __webpack_require__(/*! ./changeMiniListItem */ "./src/changeMiniListItem.ts");
exports.addResultsToQuestionList = (startedsToFixByQuestionId, apiQuestionsByQuestionId, questionsContainerIsMiniList) => {
    for (const [questionId, started] of startedsToFixByQuestionId.entries()) {
        const apiQuestion = apiQuestionsByQuestionId[questionId];
        if (!apiQuestion) {
            // Shouldn't happen, unless the question gets deleted in the milliseconds between the websocket response and the userscript request
            continue;
        }
        if (questionsContainerIsMiniList) {
            changeMiniListItem_1.changeMiniListItem(started, apiQuestion);
        }
        else {
            changeFullListItem_1.changeFullListItem(started, apiQuestion);
        }
    }
    haveSEUpdateRelativeDates_1.haveSEUpdateRelativeDates();
};


/***/ }),

/***/ "./src/addThousandsSeparators.ts":
/*!***************************************!*\
  !*** ./src/addThousandsSeparators.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addThousandsSeparators = void 0;
exports.addThousandsSeparators = (num) => String(num).replace(/(?!^)(?=(?:\d{3})+$)/g, ',');


/***/ }),

/***/ "./src/changeFullListItem.ts":
/*!***********************************!*\
  !*** ./src/changeFullListItem.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.changeFullListItem = void 0;
const addThousandsSeparators_1 = __webpack_require__(/*! ./addThousandsSeparators */ "./src/addThousandsSeparators.ts");
const getShortRep_1 = __webpack_require__(/*! ./getShortRep */ "./src/getShortRep.ts");
const prettyAbsoluteDate_1 = __webpack_require__(/*! ./prettyAbsoluteDate */ "./src/prettyAbsoluteDate.ts");
const makeRegisteredUserGravatar = (owner) => `
    <a href="/users/${owner.user_id}">
        <div class="gravatar-wrapper-32">
            <img src="${owner.profile_image}" alt="" width="32" height="32" class="bar-sm">
        </div>
    </a>
`;
const makeRegisteredUserDetails = (owner) => `
    <a href="/users/${owner.user_id}" class="mr2">${owner.display_name}</a>
    ${owner.user_type === 'moderator' ? '<span class="flex--item s-badge ml2 s-badge__moderator s-badge__xs mtn4" title="Moderator">Mod</span>' : ''}
    <div class="-flair">
        <span class="reputation-score" title="reputation score ${addThousandsSeparators_1.addThousandsSeparators(owner.reputation)}" dir="ltr">${getShortRep_1.getShortRep(owner.reputation)}</span>
    </div>
`;
exports.changeFullListItem = (started, apiQuestion) => {
    started.insertAdjacentHTML('beforebegin', '<div style="width: 100%;"></div>');
    started.setAttribute('style', 'margin-left: 0px !important');
    started.insertAdjacentHTML('afterend', makeStartedHTMLForFullList(apiQuestion));
};
const makeStartedHTMLForFullList = ({ owner, creation_date, question_id }) => {
    // Create a string like "2019-12-24 01:25:57Z"
    const dateTitle = new Date(creation_date * 1000).toISOString().replace('T', ' ').replace(/\.\d\d\dZ/g, 'Z');
    return `
        <div class="flex--item ml-auto fl-shrink0 started mt0">
            <div class="user-info user-hover">
                <div class="user-action-time">
                    <a href="/questions/${question_id}" class="started-link">asked
                        <span
                            title="${dateTitle}"
                            class="relativetime"
                        >${prettyAbsoluteDate_1.prettyAbsoluteDate(dateTitle) /* Newer dates will be immediately replaced by updateRelativeDates */}</span>
                    </a>
                </div>
                <div class="user-gravatar32">
                    ${owner.user_id ? makeRegisteredUserGravatar(owner) : '<span class="anonymous-gravatar"></span>'}
                </div>
                <div class="user-details">
                    ${owner.user_id ? makeRegisteredUserDetails(owner) : owner.display_name}
                </div>
            </div>
        </div>
    `;
};


/***/ }),

/***/ "./src/changeMiniListItem.ts":
/*!***********************************!*\
  !*** ./src/changeMiniListItem.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.changeMiniListItem = void 0;
const addThousandsSeparators_1 = __webpack_require__(/*! ./addThousandsSeparators */ "./src/addThousandsSeparators.ts");
const getShortRep_1 = __webpack_require__(/*! ./getShortRep */ "./src/getShortRep.ts");
const prettyAbsoluteDate_1 = __webpack_require__(/*! ./prettyAbsoluteDate */ "./src/prettyAbsoluteDate.ts");
const makeRegisteredUserHTML = (owner) => `
    <a href="/users/${owner.user_id}">${owner.display_name /* Yes, these are already HTML-escaped */}</a>${owner.user_type === 'moderator' ? '<span class="flex--item s-badge ml2 s-badge__moderator s-badge__xs mtn2" title="Moderator">Mod</span>' : ''}
    <span class="reputation-score" title="reputation score ${addThousandsSeparators_1.addThousandsSeparators(owner.reputation)}" dir="ltr">${getShortRep_1.getShortRep(owner.reputation)}</span>
`;
const makeStartedHTMLForMiniList = ({ owner, creation_date, question_id }) => {
    // Create a string like "2019-12-24 01:25:57Z"
    const dateTitle = new Date(creation_date * 1000).toISOString().replace('T', ' ').replace(/\.\d\d\dZ/g, 'Z');
    return `
        <a href="/questions/${question_id}" class="started-link">
            asked
            <span
                title="${dateTitle}"
                class="relativetime"
            >${prettyAbsoluteDate_1.prettyAbsoluteDate(dateTitle) /* Newer dates will be immediately replaced by updateRelativeDates */}</span>
        </a>
        ${owner.user_id ? makeRegisteredUserHTML(owner) : ''}
    `;
};
exports.changeMiniListItem = (started, apiQuestion) => {
    started.style.display = 'flex';
    started.style.flexDirection = 'column';
    started.style.alignItems = 'flex-end';
    started.parentElement.style.alignItems = 'flex-start'; // Keep tags from vertically expanding
    const existingChildrenContainer = document.createElement('div');
    for (const child of [...started.childNodes]) {
        existingChildrenContainer.appendChild(child);
    }
    started.appendChild(existingChildrenContainer);
    const newChildrenContainer = started.appendChild(document.createElement('div'));
    newChildrenContainer.innerHTML = makeStartedHTMLForMiniList(apiQuestion);
};


/***/ }),

/***/ "./src/getApi.ts":
/*!***********************!*\
  !*** ./src/getApi.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getApi = void 0;
/* Filter is constructed from:
 * wrapper -> { items }
 * question -> { creation_date, owner }
 * shallow_user -> { display_name, profile_image, reputation, user_id, user_type }
 *
 * Would prefer to also check if user is employee to add icon,
 * but that's not present in shallow_user and would require a separate API call - won't bother
 */
const filter = '!iCA6(zQJbylNesjF799NMC';
const thisSite = window.location.hostname
    .replace(/\.\w+$/, '') // Remove the TLD (.com, .net, ...)
    .replace(/\.stackexchange$/, ''); // The API does not need the ".stackexchange" suffix
const paramsArr = [
    ['key', 'XnYMba9ARHQZOA4OnV8bdw(('],
    ['filter', filter],
    ['site', thisSite],
    ['pagesize', '50'],
];
const searchParams = new URLSearchParams(paramsArr);
const paramsString = `?${searchParams.toString()}`;
exports.getApi = async (questionIdsToFetch) => {
    if (questionIdsToFetch.length === 0) {
        return { items: [] };
    }
    const url = `https://api.stackexchange.com/2.2/questions/${questionIdsToFetch.join(';')}${paramsString}`;
    const response = await fetch(url);
    const responseObj = await response.json();
    return responseObj;
};


/***/ }),

/***/ "./src/getQuestionData.ts":
/*!********************************!*\
  !*** ./src/getQuestionData.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getQuestionData = void 0;
const getApi_1 = __webpack_require__(/*! ./getApi */ "./src/getApi.ts");
exports.getQuestionData = async (questionIdsToRetrieve) => {
    if (!localStorage.cpUserscriptAskDatesEverywhereQuestionData) {
        localStorage.cpUserscriptAskDatesEverywhereQuestionData = '{}';
    }
    const apiQuestionsByQuestionId = JSON.parse(localStorage.cpUserscriptAskDatesEverywhereQuestionData);
    const accessed = Date.now();
    for (const questionId of questionIdsToRetrieve) {
        if (apiQuestionsByQuestionId[questionId]) {
            apiQuestionsByQuestionId[questionId].accessed = accessed;
        }
    }
    const uncachedQuestionids = questionIdsToRetrieve.filter(questionId => !apiQuestionsByQuestionId[questionId]);
    const apiResponse = await getApi_1.getApi(uncachedQuestionids);
    for (const apiQuestion of apiResponse.items) {
        apiQuestionsByQuestionId[apiQuestion.question_id] = Object.assign(Object.assign({}, apiQuestion), { accessed });
    }
    for (const [questionId, apiQuestion] of Object.entries(apiQuestionsByQuestionId)) {
        // Keep previously retrieved question info around for 1 week
        // (Don't want localStorage to get too big, nor should the saved user rep numbers get too out of date)
        if (accessed - apiQuestion.accessed > 1000 * 60 * 60 * 24 * 7) {
            delete apiQuestionsByQuestionId[questionId];
        }
    }
    localStorage.cpUserscriptAskDatesEverywhereQuestionData = JSON.stringify(apiQuestionsByQuestionId);
    return apiQuestionsByQuestionId;
};


/***/ }),

/***/ "./src/getShortRep.ts":
/*!****************************!*\
  !*** ./src/getShortRep.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getShortRep = void 0;
const addThousandsSeparators_1 = __webpack_require__(/*! ./addThousandsSeparators */ "./src/addThousandsSeparators.ts");
/**
 * Turn reputation number into a short, pretty string. Eg:
 * 900 -> 900
 * 1111 -> 1,111
 * 9999 -> 9,999
 * 10_000 -> 10k
 * 10_100 -> 10.1k
 * 99_900 -> 99.9k
 * 100_100 -> 100k
 * 234_567 -> 235k
 * 1_000_000 -> 1000k
 */
exports.getShortRep = (reputation) => {
    if (reputation < 1000) {
        return String(reputation);
    }
    if (reputation < 10000) {
        return addThousandsSeparators_1.addThousandsSeparators(reputation);
    }
    if (reputation < 100000) {
        const hundreds = Math.round(reputation / 100);
        return hundreds % 10 === 0
            ? `${hundreds / 10}k`
            : String(hundreds).replace(/.$/, '.$&') + 'k';
    }
    const thousands = Math.round(reputation / 1000);
    return `${thousands}k`;
};


/***/ }),

/***/ "./src/haveSEUpdateRelativeDates.ts":
/*!******************************************!*\
  !*** ./src/haveSEUpdateRelativeDates.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.haveSEUpdateRelativeDates = void 0;
exports.haveSEUpdateRelativeDates = () => {
    // updateRelativeDates is defined in full.en.js, which is loaded dynamically by stub.en.js - probably won't exist immediately on pageload
    if (window.StackExchange.realtime) {
        window.StackExchange.realtime.updateRelativeDates();
    }
    else {
        const full = document.head.querySelector('script[src*="/Js/full."]');
        if (full) {
            // Should always exist under normal circumstances
            full.addEventListener('load', () => {
                window.StackExchange.realtime.updateRelativeDates();
            });
        }
    }
};


/***/ }),

/***/ "./src/observeQuestionsContainer.ts":
/*!******************************************!*\
  !*** ./src/observeQuestionsContainer.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.observeQuestionsContainer = void 0;
const showToast_1 = __webpack_require__(/*! ../../common/showToast */ "../common/showToast.ts");
const addResultsToQuestionList_1 = __webpack_require__(/*! ./addResultsToQuestionList */ "./src/addResultsToQuestionList.ts");
const getQuestionData_1 = __webpack_require__(/*! ./getQuestionData */ "./src/getQuestionData.ts");
const getStartedQuestionAnchor = (started) => started.querySelector('a[href^="/questions/"]');
exports.observeQuestionsContainer = (questionsContainer) => {
    const handledParents = new Set();
    const fix = () => {
        const startedsToFix = [];
        for (const started of questionsContainer.querySelectorAll('.started')) {
            const summary = started.parentElement;
            if (handledParents.has(summary)) {
                continue;
            }
            handledParents.add(summary);
            // There may not be an anchor if browsing new questions
            const startedQuestionAnchor = getStartedQuestionAnchor(started);
            if (startedQuestionAnchor && !startedQuestionAnchor.textContent.includes('asked')) {
                startedsToFix.push(started);
            }
        }
        if (!startedsToFix.length) {
            return;
        }
        const startedsToFixByQuestionId = new Map();
        for (const started of startedsToFix) {
            const questionId = Number(getStartedQuestionAnchor(started).href.match(/\d+/)[0]);
            startedsToFixByQuestionId.set(questionId, started);
        }
        getQuestionData_1.getQuestionData([...startedsToFixByQuestionId.keys()])
            .then((questionData) => {
            addResultsToQuestionList_1.addResultsToQuestionList(startedsToFixByQuestionId, questionData, questionsContainer.matches('#question-mini-list'));
        })
            .catch((error) => {
            // tslint:disable-next-line: no-console
            console.error(error);
            showToast_1.showToastError('Stack Ask Dates Everywhere: An error occurred, see console for details');
        });
    };
    new MutationObserver(fix).observe(questionsContainer, { childList: true });
    fix();
};


/***/ }),

/***/ "./src/prettyAbsoluteDate.ts":
/*!***********************************!*\
  !*** ./src/prettyAbsoluteDate.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.prettyAbsoluteDate = void 0;
const shortMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
/**
 * Transform an almost-ISO date string, eg
 * 2017-12-24 01:25:57Z
 * into
 * Dec 24 '17 at 1:25
 * If the current year is the same as the one in the date, the returned string will not contain the year portion
 * eg `Jan 1 at 15:30`
 */
exports.prettyAbsoluteDate = (dateTitle) => {
    const [year, month, day, hours, minutes] = dateTitle.match(/\d+/g);
    const thisYear = String(new Date().getUTCFullYear());
    return `${shortMonthNames[Number(month) - 1]} ${Number(day)} ${year === thisYear ? '' : `'${String(year).slice(2)} `}at ${hours}:${minutes.padStart(2, '0')}`;
};


/***/ }),

/***/ "../common/declareGlobalStackExchange.ts":
/*!***********************************************!*\
  !*** ../common/declareGlobalStackExchange.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "../common/showToast.ts":
/*!******************************!*\
  !*** ../common/showToast.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.showToastInfo = exports.showToastError = void 0;
__webpack_require__(/*! ./declareGlobalStackExchange */ "../common/declareGlobalStackExchange.ts");
// Most scripts have `// @grant none`, and will see the native window.StackExchange
// Those which have a different @grant will need to go through unsafeWindow.StackExchange
const { helpers } = (window.StackExchange || unsafeWindow.StackExchange);
exports.showToastError = (message) => {
    helpers.showToast(message, { transient: false, type: 'danger' });
};
exports.showToastInfo = (message, transientTimeout = helpers.suggestedTransientTimeout(message, true)) => {
    helpers.showToast(message, { transientTimeout, transient: true, type: 'info' });
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! ../../common/declareGlobalStackExchange */ "../common/declareGlobalStackExchange.ts");
const observeQuestionsContainer_1 = __webpack_require__(/*! ./observeQuestionsContainer */ "./src/observeQuestionsContainer.ts");
const questions = document.querySelector('#questions');
const miniList = document.querySelector('#question-mini-list');
const questionsContainer = questions || miniList;
if (questionsContainer) {
    observeQuestionsContainer_1.observeQuestionsContainer(questionsContainer);
}

})();

/******/ })()
;