// ==UserScript==
// @name             Stack Voted Posts Stats
// @description      Shows the scores and status of posts you've voted on
// @author           CertainPerformance
// @namespace        https://github.com/CertainPerformance/Stack-Exchange-Userscripts
// @version          1.0.0
// @include          /^https://(?:[^/]+\.)?(?:(?:stackoverflow|serverfault|superuser|stackexchange|askubuntu|stackapps)\.com|mathoverflow\.net)/users/.*\?tab=votes/
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
exports.showToastInfo = exports.showToastError = void 0;
__webpack_require__(/*! ./declareGlobalStackExchange */ "../common/declareGlobalStackExchange.ts");
exports.showToastError = (message) => {
    window.StackExchange.helpers.showToast(message, { transient: false, type: 'danger' });
};
exports.showToastInfo = (message) => {
    const transientTimeout = window.StackExchange.helpers.suggestedTransientTimeout(message, true);
    window.StackExchange.helpers.showToast(message, { transientTimeout, transient: true, type: 'info' });
};


/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./build/styleText.css":
/*!*******************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./build/styleText.css ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".history-table th {\n  padding: 5px; }\n\n.history-table td:nth-child(2), .history-table th:nth-child(2) {\n  width: 220px; }\n\n.history-table td:last-child {\n  width: initial !important; }\n\n.history-table [data-cpuserscript-rowstats] {\n  float: right;\n  width: 150px;\n  padding-left: 15px; }\n  .history-table [data-cpuserscript-rowstats]th {\n    margin-bottom: 20px; }\n  .history-table [data-cpuserscript-rowstats],\n  .history-table [data-cpuserscript-rowstats] > * {\n    display: inline-block; }\n  .history-table [data-cpuserscript-rowstats] > :first-child,\n  .history-table [data-cpuserscript-rowstats] > :nth-child(2) {\n    height: 23px;\n    width: 36px;\n    border-width: 1px;\n    border-color: #b9b9b9;\n    text-align: center; }\n    .history-table [data-cpuserscript-rowstats] > :first-child[data-cpuserscript-parent-post],\n    .history-table [data-cpuserscript-rowstats] > :nth-child(2)[data-cpuserscript-parent-post] {\n      border-style: solid; }\n    .history-table [data-cpuserscript-rowstats] > :first-child:not([data-cpuserscript-parent-post]),\n    .history-table [data-cpuserscript-rowstats] > :nth-child(2):not([data-cpuserscript-parent-post]) {\n      opacity: 0.5;\n      border-style: dotted; }\n    .history-table [data-cpuserscript-rowstats] > :first-child[data-cpuserscript-accepted],\n    .history-table [data-cpuserscript-rowstats] > :nth-child(2)[data-cpuserscript-accepted] {\n      border-color: #5fba7d;\n      background: #5fba7d;\n      color: #fff; }\n  .history-table [data-cpuserscript-rowstats] > :nth-child(2) {\n    margin-left: 3px; }\n  .history-table [data-cpuserscript-rowstats] > :nth-child(3) {\n    margin-left: 3px;\n    font-size: smaller;\n    /* The following (in combination with the container widths given above) is used so that\r\n             * the \"Q\" \"A\" boxes in the <th> vertically line up with the same boxes in the <td>s,\r\n             * while ensuring the \"# of additional answers\" text can overflow the 2nd table cell without expanding it\r\n             * (which would result in a lot of useless empty space in the table)\r\n             */\n    position: absolute; }\n");

/***/ }),

/***/ "./src/addRowstats/getApi.ts":
/*!***********************************!*\
  !*** ./src/addRowstats/getApi.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getApi = void 0;
const questionFilter = '!*7PmBPEzvIHchpOMByA174F6_hcW';
/* https://api.stackexchange.com/docs/questions-by-ids
 * questionFilter is generated from:
 * {
 *     answer: {
 *         answer_id
 *         is_accepted
 *         score
 *     }
 *     .wrapper: {
 *         error_id
 *         items
 *     }
 *     question: {
 *         accepted_answer_id
 *         answers
 *         question_id
 *         score
 *     }
 */
const thisSite = window.location.hostname
    .replace(/\.\w+$/, '') // Remove the TLD (.com, .net, ...)
    .replace(/\.stackexchange$/, ''); // The API does not need the ".stackexchange" suffix
const paramsArr = [
    ['key', 'I6*G8zzGnUzYq*dbUXppjg(('],
    ['site', thisSite],
    ['filter', questionFilter],
];
const searchParams = new URLSearchParams(paramsArr);
const paramsString = `?${searchParams.toString()}`;
exports.getApi = async (questionIds) => {
    if (!questionIds.length) {
        return { items: [] };
    }
    const url = `https://api.stackexchange.com/2.2/questions/${questionIds.join(';')}${paramsString}`;
    const response = await fetch(url);
    const responseObj = await response.json();
    return responseObj;
};


/***/ }),

/***/ "./src/addRowstats/getBestAnswer.ts":
/*!******************************************!*\
  !*** ./src/addRowstats/getBestAnswer.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getBestAnswer = void 0;
exports.getBestAnswer = (answers) => {
    if (!answers.length) {
        return null;
    }
    const acceptedAnswer = answers.find(({ is_accepted }) => is_accepted);
    if (acceptedAnswer) {
        return acceptedAnswer;
    }
    const highestScoreAnswer = answers.reduce((a, answer) => (answer.score > a.score ? answer : a));
    return highestScoreAnswer;
};


/***/ }),

/***/ "./src/addRowstats/getPostInfo.ts":
/*!****************************************!*\
  !*** ./src/addRowstats/getPostInfo.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostInfo = void 0;
const showToast_1 = __webpack_require__(/*! ../../../common/showToast */ "../common/showToast.ts");
const getApi_1 = __webpack_require__(/*! ./getApi */ "./src/addRowstats/getApi.ts");
const getPostsState_1 = __webpack_require__(/*! ./getPostsState */ "./src/addRowstats/getPostsState.ts");
const insertTH_1 = __webpack_require__(/*! ./insertTH */ "./src/addRowstats/insertTH.ts");
const populateTRs_1 = __webpack_require__(/*! ./populateTRs */ "./src/addRowstats/populateTRs.ts");
exports.getPostInfo = async (questionIds) => {
    const { questionsByQuestionId, answersByAnswerId } = getPostsState_1.getPostsState();
    const questionIdsToFetch = questionIds.filter(questionId => !questionsByQuestionId.has(questionId));
    const { items, error_id } = await getApi_1.getApi(questionIdsToFetch);
    if (error_id) {
        showToast_1.showToastError(`Stack Voted Posts Stats Error: Stack Exchange API response code ${error_id}`);
        return;
    }
    items.forEach((question) => {
        questionsByQuestionId.set(question.question_id, question);
        if (question.answers) {
            question.answers.forEach((answer) => {
                answersByAnswerId.set(answer.answer_id, answer);
            });
        }
    });
    insertTH_1.insertTH();
    populateTRs_1.populateTRs();
};


/***/ }),

/***/ "./src/addRowstats/getPostsState.ts":
/*!******************************************!*\
  !*** ./src/addRowstats/getPostsState.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostsState = void 0;
const questionsByQuestionId = new Map();
const answersByAnswerId = new Map();
exports.getPostsState = () => ({ questionsByQuestionId, answersByAnswerId });


/***/ }),

/***/ "./src/addRowstats/index.ts":
/*!**********************************!*\
  !*** ./src/addRowstats/index.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.addRowstats = void 0;
const showToast_1 = __webpack_require__(/*! ../../../common/showToast */ "../common/showToast.ts");
const getPostInfo_1 = __webpack_require__(/*! ./getPostInfo */ "./src/addRowstats/getPostInfo.ts");
const postLinkToIds_1 = __webpack_require__(/*! ./postLinkToIds */ "./src/addRowstats/postLinkToIds.ts");
const dedupe = (arr) => [...new Set(arr)];
exports.addRowstats = () => {
    const tableExists = document.querySelector('.history-table');
    // Might not be a table, if the user hasn't cast any votes of this type:
    if (!tableExists) {
        return;
    }
    const anchors = [...document.querySelectorAll('.history-table a[href]')];
    const questionIds = dedupe(anchors.map(a => postLinkToIds_1.postLinkToIds(a.href).questionId));
    getPostInfo_1.getPostInfo(questionIds)
        .catch((error) => {
        // tslint:disable-next-line: no-console
        console.error(error);
        showToast_1.showToastError('Stack Voted Posts Stats: An error occurred, see console for details');
    });
};


/***/ }),

/***/ "./src/addRowstats/insertTH.ts":
/*!*************************************!*\
  !*** ./src/addRowstats/insertTH.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.insertTH = void 0;
exports.insertTH = () => {
    const table = document.querySelector('.history-table');
    const thead = table.insertBefore(document.createElement('thead'), table.children[0]);
    thead.innerHTML = `
        <tr>
            <th></th>
            <th>
                <span></span>
                <span data-cpuserscript-rowstats>
                    <span data-cpuserscript-parent-post>Q</span>
                    <span data-cpuserscript-parent-post>A</span>
                    <span># of additional answers</span>
                </span>
            </th>
        </tr>`;
};


/***/ }),

/***/ "./src/addRowstats/populateTRs.ts":
/*!****************************************!*\
  !*** ./src/addRowstats/populateTRs.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.populateTRs = void 0;
const getBestAnswer_1 = __webpack_require__(/*! ./getBestAnswer */ "./src/addRowstats/getBestAnswer.ts");
const getPostsState_1 = __webpack_require__(/*! ./getPostsState */ "./src/addRowstats/getPostsState.ts");
const postLinkToIds_1 = __webpack_require__(/*! ./postLinkToIds */ "./src/addRowstats/postLinkToIds.ts");
exports.populateTRs = () => {
    const { questionsByQuestionId, answersByAnswerId } = getPostsState_1.getPostsState();
    document.querySelectorAll('.history-table tbody tr[data-postid]').forEach((tr) => {
        const { questionId, answerId } = postLinkToIds_1.postLinkToIds(tr.querySelector('a[href]').href);
        const question = questionsByQuestionId.get(questionId);
        const rowstatsContainer = tr.children[1].appendChild(document.createElement('span'));
        rowstatsContainer.setAttribute('data-cpuserscript-rowstats', '');
        if (!question) {
            // Question may be deleted
            return;
        }
        const moreCount = question.answers ? question.answers.length - 1 : null;
        const answerToShow = answerId
            ? answersByAnswerId.get(answerId)
            : question.answers
                ? getBestAnswer_1.getBestAnswer(question.answers)
                : null;
        const answerHTML = answerToShow
            ? `
                <span${answerToShow.is_accepted ? ' data-cpuserscript-accepted' : ''}>${answerToShow.score}</span>
                <span>${moreCount ? `+ ${moreCount} more` : ''}</span>
              `
            : '';
        rowstatsContainer.innerHTML = `
            <span${question.accepted_answer_id ? ' data-cpuserscript-accepted' : ''}>${question.score}</span>
            ${answerHTML}
        `;
        const parentPost = rowstatsContainer.children[answerId ? 1 : 0];
        // If vote was on answer, the answer may have been deleted:
        if (parentPost) {
            parentPost.setAttribute('data-cpuserscript-parent-post', '');
        }
    });
};


/***/ }),

/***/ "./src/addRowstats/postLinkToIds.ts":
/*!******************************************!*\
  !*** ./src/addRowstats/postLinkToIds.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.postLinkToIds = void 0;
exports.postLinkToIds = (postLink) => {
    /* postLink will be in a format like:
     * https://stackoverflow.com/questions/1732348/regex-match-open-tags-except-xhtml-self-contained-tags
     *                                     questionId
     * or
     * https://stackoverflow.com/questions/1732348/regex-match-open-tags-except-xhtml-self-contained-tags/1732454#1732454
     *                                     questionId                                                     answerId
     */
    const match = postLink.match(/\/questions\/(\d+)\/[^\/]+(?:\/(\d+))?/);
    const [, questionId, answerId] = match;
    return { questionId: Number(questionId), answerId: answerId ? Number(answerId) : undefined };
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
const insertStyle_1 = __webpack_require__(/*! ./insertStyle */ "./src/insertStyle.ts");
const watchForTabChanges_1 = __webpack_require__(/*! ./watchForTabChanges */ "./src/watchForTabChanges.ts");
// Element may not exist if on a profile other than the one that's logged in
const mainbarFull = document.querySelector('#mainbar-full');
if (mainbarFull) {
    window.StackExchange.ready(() => {
        /* Need to wait for SE's JS to call StackExchange.user.expandPostBody
         * which inserts the expander-arrow-small-hide elements into the TRs
         * see https://dev.stackoverflow.com/content//Js/user.en.js
         */
        insertStyle_1.insertStyle();
        watchForTabChanges_1.watchForTabChanges(mainbarFull);
    });
}


/***/ }),

/***/ "./src/insertStyle.ts":
/*!****************************!*\
  !*** ./src/insertStyle.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.insertStyle = void 0;
// @ts-ignore
// tslint:disable-next-line: no-implicit-dependencies
const styleText_css_1 = __webpack_require__(/*! raw-loader!../build/styleText.css */ "./node_modules/raw-loader/dist/cjs.js!./build/styleText.css");
exports.insertStyle = () => {
    const styleTag = document.body.appendChild(document.createElement('style'));
    styleTag.textContent = styleText_css_1.default;
};


/***/ }),

/***/ "./src/watchForTabChanges.ts":
/*!***********************************!*\
  !*** ./src/watchForTabChanges.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.watchForTabChanges = void 0;
const addRowstats_1 = __webpack_require__(/*! ./addRowstats */ "./src/addRowstats/index.ts");
exports.watchForTabChanges = (mainbarFull) => {
    addRowstats_1.addRowstats();
    new MutationObserver(() => {
        const insertedElementsExist = mainbarFull.querySelector('[data-cpuserscript-rowstats]');
        if (!insertedElementsExist) {
            addRowstats_1.addRowstats();
        }
    })
        .observe(mainbarFull, { childList: true });
};


/***/ })

/******/ });