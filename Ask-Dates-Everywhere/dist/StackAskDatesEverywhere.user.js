// ==UserScript==
// @name             Stack Ask Dates Everywhere
// @description      Puts ask dates next to questions in question lists
// @author           CertainPerformance
// @namespace        https://github.com/CertainPerformance/Stack-Exchange-Userscripts
// @version          1.0.1
// @include          /^https://(?:[^/]+\.)?(?:(?:stackoverflow|serverfault|superuser|stackexchange|askubuntu|stackapps)\.com|mathoverflow\.net(?:/(?:questions|tab).*)?$/
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

/***/ "./src/addResultsToQuestionList.ts":
/*!*****************************************!*\
  !*** ./src/addResultsToQuestionList.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const haveSEUpdateRelativeDates_1 = __webpack_require__(/*! ./haveSEUpdateRelativeDates */ "./src/haveSEUpdateRelativeDates.ts");
const makeStartedHTMLForFullList_1 = __webpack_require__(/*! ./makeStartedHTMLForFullList */ "./src/makeStartedHTMLForFullList.ts");
const makeStartedHTMLForMiniList_1 = __webpack_require__(/*! ./makeStartedHTMLForMiniList */ "./src/makeStartedHTMLForMiniList.ts");
exports.addResultsToQuestionList = (startedsToFixByQuestionId, apiQuestionsByQuestionId, questionsContainerIsMiniList) => {
    for (const [questionId, started] of startedsToFixByQuestionId.entries()) {
        const apiQuestion = apiQuestionsByQuestionId[questionId];
        if (!apiQuestion) {
            // Shouldn't happen, unless the question gets deleted in the milliseconds between the websocket response and the userscript request
            continue;
        }
        if (questionsContainerIsMiniList) {
            started.insertAdjacentHTML('afterend', makeStartedHTMLForMiniList_1.makeStartedHTMLForMiniList(apiQuestion));
        }
        else {
            started.insertAdjacentHTML('beforebegin', makeStartedHTMLForFullList_1.makeStartedHTMLForFullList(apiQuestion));
        }
    }
    haveSEUpdateRelativeDates_1.haveSEUpdateRelativeDates();
};


/***/ }),

/***/ "./src/addThousandsSeparators.ts":
/*!***************************************!*\
  !*** ./src/addThousandsSeparators.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.addThousandsSeparators = (num) => String(num).replace(/(?!^)(?=(?:\d{3})+$)/g, ',');


/***/ }),

/***/ "./src/getApi.ts":
/*!***********************!*\
  !*** ./src/getApi.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/* Filter is constructed from:
 * wrapper -> { items }
 * question -> { creation_date, owner }
 * shallow_user -> { display_name, profile_image, reputation, user_id, user_type }
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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const addThousandsSeparators_1 = __webpack_require__(/*! ./addThousandsSeparators */ "./src/addThousandsSeparators.ts");
/**
 * Turn reputation number into a short, pretty string. Eg:
 * 900 -> 900
 * 1111 -> 1,111
 * 9999 -> 9,999
 * 10000 -> 10k
 * 11111 -> 11k
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
    const thousands = Math.round(reputation / 1000);
    return `${thousands}k`;
};


/***/ }),

/***/ "./src/haveSEUpdateRelativeDates.ts":
/*!******************************************!*\
  !*** ./src/haveSEUpdateRelativeDates.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! ../../common/declareGlobalStackExchange */ "../common/declareGlobalStackExchange.ts");
const observeQuestionsContainer_1 = __webpack_require__(/*! ./observeQuestionsContainer */ "./src/observeQuestionsContainer.ts");
const questions = document.querySelector('#questions');
const miniList = document.querySelector('#question-mini-list');
const questionsContainer = questions || miniList;
if (questionsContainer) {
    observeQuestionsContainer_1.observeQuestionsContainer(questionsContainer);
}


/***/ }),

/***/ "./src/makeStartedHTMLForFullList.ts":
/*!*******************************************!*\
  !*** ./src/makeStartedHTMLForFullList.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const addThousandsSeparators_1 = __webpack_require__(/*! ./addThousandsSeparators */ "./src/addThousandsSeparators.ts");
const getShortRep_1 = __webpack_require__(/*! ./getShortRep */ "./src/getShortRep.ts");
const prettyAbsoluteDate_1 = __webpack_require__(/*! ./prettyAbsoluteDate */ "./src/prettyAbsoluteDate.ts");
exports.makeStartedHTMLForFullList = ({ owner, creation_date, question_id }) => {
    const { reputation } = owner;
    const dateTitle = new Date(creation_date * 1000).toISOString().replace('T', ' ').replace(/\.\d\d\dZ/g, 'Z');
    return `
        <div style="float: right; width: 400px; clear: right;"></div>
        <div class="started fr">
            <div class="user-info user-hover">
                <div class="user-action-time">
                    <a href="/questions/${question_id}" class="started-link">asked
                        <span
                            title="${ /* 2019-12-24 01:25:57Z */dateTitle}"
                            class="relativetime"
                        >${prettyAbsoluteDate_1.prettyAbsoluteDate(dateTitle) /* Newer dates will be immediately replaced by updateRelativeDates */}</span>
                    </a>
                </div>
                <div class="user-gravatar32">
                    <a href="/users/${owner.user_id}">
                        <div class="gravatar-wrapper-32"><img src="${owner.profile_image}" alt=""
                                width="32" height="32" class="bar-sm"></div>
                    </a>
                </div>
                <div class="user-details">
                    <a href="/users/${owner.user_id}">${owner.display_name}</a>${owner.user_type === 'moderator' ? '<span class="mod-flair" title="moderator">♦</span>' : ''}
                    <div class="-flair">
                        <span class="reputation-score" title="reputation score ${addThousandsSeparators_1.addThousandsSeparators(reputation)}" dir="ltr">${getShortRep_1.getShortRep(reputation)}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
};


/***/ }),

/***/ "./src/makeStartedHTMLForMiniList.ts":
/*!*******************************************!*\
  !*** ./src/makeStartedHTMLForMiniList.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const addThousandsSeparators_1 = __webpack_require__(/*! ./addThousandsSeparators */ "./src/addThousandsSeparators.ts");
const getShortRep_1 = __webpack_require__(/*! ./getShortRep */ "./src/getShortRep.ts");
const prettyAbsoluteDate_1 = __webpack_require__(/*! ./prettyAbsoluteDate */ "./src/prettyAbsoluteDate.ts");
exports.makeStartedHTMLForMiniList = ({ owner, creation_date, question_id }) => {
    const { reputation } = owner;
    const dateTitle = new Date(creation_date * 1000).toISOString().replace('T', ' ').replace(/\.\d\d\dZ/g, 'Z');
    return `
        <div class="started" style="clear: right">
            <a href="/questions/${question_id}" class="started-link">
                asked
                <span
                    title="${ /* 2019-12-24 01:25:57Z */dateTitle}"
                    class="relativetime"
                >${prettyAbsoluteDate_1.prettyAbsoluteDate(dateTitle) /* Newer dates will be immediately replaced by updateRelativeDates */}</span>
            </a>
            <a href="/users/${owner.user_id}">${owner.display_name /* Yes, these are already HTML-escaped */}</a>${owner.user_type === 'moderator' ? '<span class="mod-flair" title="moderator">♦</span>' : ''}
            <span class="reputation-score" title="reputation score ${addThousandsSeparators_1.addThousandsSeparators(reputation)}" dir="ltr">${getShortRep_1.getShortRep(reputation)}</span>
        </div>
    `;
};


/***/ }),

/***/ "./src/observeQuestionsContainer.ts":
/*!******************************************!*\
  !*** ./src/observeQuestionsContainer.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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


/***/ })

/******/ });