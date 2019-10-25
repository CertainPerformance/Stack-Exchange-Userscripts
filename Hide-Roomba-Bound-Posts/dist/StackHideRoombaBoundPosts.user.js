// ==UserScript==
// @name             Stack Hide Roomba Bound Posts
// @description      In Moderator Tools Delete Votes, creates an option to hide posts that will be roombad without intervention
// @author           CertainPerformance
// @namespace        https://github.com/CertainPerformance/Stack-Exchange-Userscripts
// @version          1.0.1
// @include          /^https://(?:[^/]+\.)?(?:(?:stackoverflow|serverfault|superuser|stackexchange|askubuntu|stackapps)\.com|mathoverflow\.net)/tools/
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./build/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./build/checkTable.js":
/*!*****************************!*\
  !*** ./build/checkTable.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const getApi_1 = __webpack_require__(/*! ./getApi */ "./build/getApi.js");
const processApiResponse_1 = __webpack_require__(/*! ./processApiResponse */ "./build/processApiResponse.js");
const settingsStore = __webpack_require__(/*! ./settingsStore */ "./build/settingsStore.js");
const showToastError_1 = __webpack_require__(/*! ./showToastError */ "./build/showToastError.js");
const checkedTables = new Set();
exports.checkTable = (table) => {
    if (!settingsStore.get().enabled || checkedTables.has(table)) {
        return;
    }
    checkedTables.add(table);
    const trs = [...table.querySelectorAll('tr')];
    const trsByQuestionId = trs.reduce((a, tr) => {
        const questionId = Number(tr.querySelector('a').href.match(/\d+/)[0]);
        if (!a[questionId]) {
            a[questionId] = [];
        }
        a[questionId].push(tr);
        return a;
    }, {});
    const questionIdsStr = Object.keys(trsByQuestionId).join(';');
    table.style.backgroundColor = '#fffee3';
    getApi_1.getApi(questionIdsStr)
        .then((apiResponse) => {
        table.removeAttribute('style');
        processApiResponse_1.processApiResponse(apiResponse, trsByQuestionId, trs);
    })
        .catch((error) => {
        table.removeAttribute('style');
        console.error(error);
        showToastError_1.showToastError('Stack Hide Roomba Bound Posts: An error occurred, see console for details');
    });
};


/***/ }),

/***/ "./build/createSettingsInterface.js":
/*!******************************************!*\
  !*** ./build/createSettingsInterface.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const settingsStore = __webpack_require__(/*! ./settingsStore */ "./build/settingsStore.js");
const setSettingsDivAttributes = (settings, settingsDiv) => {
    if (settings.enabled) {
        settingsDiv.setAttribute('data-enabled', '');
    }
    else {
        settingsDiv.removeAttribute('data-enabled');
    }
    if (settings.showPostsWithReopenVotes) {
        settingsDiv.removeAttribute('data-hide-posts-with-reopen-votes');
    }
    else {
        settingsDiv.setAttribute('data-hide-posts-with-reopen-votes', '');
    }
};
exports.createSettingsInterface = (checkOpenTables) => {
    const settingsDiv = document.createElement('div');
    settingsDiv.setAttribute('data-cpuserscript-hide-roomba-bound-posts-settings', '');
    // on settings change: consider fade-in animation
    settingsDiv.innerHTML = `
        <span>Hide Roomba Bound Posts:</span>
        <label>Enabled<input type="checkbox"></label>
        <label title="If checked, closed questions with reopen votes which would otherwise be eligible for RemoveAbandonedClosed will remain visible">
            Show posts with reopen votes<input type="checkbox">
        </label>
    `;
    const [enabledCheckbox, showPostsWithReopenVotesCheckbox] = settingsDiv.querySelectorAll('input');
    const initialSettings = settingsStore.get();
    setSettingsDivAttributes(initialSettings, settingsDiv);
    enabledCheckbox.checked = initialSettings.enabled;
    showPostsWithReopenVotesCheckbox.checked = initialSettings.showPostsWithReopenVotes;
    settingsDiv.addEventListener('change', () => {
        const [enabled, showPostsWithReopenVotes] = [enabledCheckbox, showPostsWithReopenVotesCheckbox].map(checkbox => checkbox.checked);
        const newSettings = { enabled, showPostsWithReopenVotes };
        settingsStore.set(newSettings);
        setSettingsDivAttributes(newSettings, settingsDiv);
        checkOpenTables();
    });
    const containerForAllTables = document.querySelector('.subheader + div');
    const deleteVotesHeading = containerForAllTables.querySelector('h2');
    deleteVotesHeading.insertAdjacentElement('beforebegin', settingsDiv);
};


/***/ }),

/***/ "./build/getApi.js":
/*!*************************!*\
  !*** ./build/getApi.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const questionFilter = '!6hZ(LC39RZp_fXm)k.WmxI2EbQC-cYI0bobCM88qaT*W7W';
/* https://api.stackexchange.com/docs/questions-by-ids
 * questionFilter is generated from:
 *
 * {
 *     answer: {
 *         score
 *     }
 *     wrapper: {
 *         error_id
 *         items
 *     }
 *     question: {
 *         accepted_answer_id
 *         answers
 *         closed_reason
 *         comment_count
 *         creation_date
 *         locked_date
 *         owner
 *         question_id
 *         reopen_vote_count
 *         score
 *         view_count
 *     }
 *     shallow_user: {
 *         user_type
 *     }
 * }
 */
const thisSite = window.location.hostname
    .replace(/\.\w+$/, '') // Remove the TLD (.com, .net, ...)
    .replace(/\.stackexchange$/, ''); // The API does not need the ".stackexchange" suffix
const paramsObj = [
    ['filter', questionFilter],
    ['key', 'U4DMV*8nvpm3EOpvf69Rxw(('],
    ['pagesize', '50'],
    ['site', thisSite],
];
const params = new URLSearchParams(paramsObj);
exports.getApi = (questionIdsStr) => {
    return fetch(`https://api.stackexchange.com/2.2/questions/${questionIdsStr}?${params}`)
        .then(res => res.json())
        .then(apiQuestionsResponse => apiQuestionsResponse);
};


/***/ }),

/***/ "./build/index.js":
/*!************************!*\
  !*** ./build/index.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const insertStyle_1 = __webpack_require__(/*! ./insertStyle */ "./build/insertStyle.js");
const waitForTablesToExist_1 = __webpack_require__(/*! ./waitForTablesToExist */ "./build/waitForTablesToExist.js");
const youarehere = document.querySelector('.youarehere');
if (youarehere && youarehere.dataset.value === 'delete') {
    insertStyle_1.insertStyle();
    waitForTablesToExist_1.waitForTablesToExist();
}


/***/ }),

/***/ "./build/insertStyle.js":
/*!******************************!*\
  !*** ./build/insertStyle.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
// tslint:disable-next-line: no-implicit-dependencies
const styleText_css_1 = __webpack_require__(/*! raw-loader!./styleText.css */ "./node_modules/raw-loader/dist/cjs.js!./build/styleText.css");
exports.insertStyle = () => {
    const styleTag = document.body.appendChild(document.createElement('style'));
    styleTag.textContent = styleText_css_1.default;
};


/***/ }),

/***/ "./build/makeCheckOpenTables.js":
/*!**************************************!*\
  !*** ./build/makeCheckOpenTables.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCheckOpenTables = (deleteTables, checkTable) => () => {
    deleteTables.forEach((table) => {
        if (!table.classList.contains('collapsed')) {
            checkTable(table);
        }
    });
};


/***/ }),

/***/ "./build/processApiResponse.js":
/*!*************************************!*\
  !*** ./build/processApiResponse.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const showToastError_1 = __webpack_require__(/*! ./showToastError */ "./build/showToastError.js");
const willQuestionRoomba_1 = __webpack_require__(/*! ./willQuestionRoomba */ "./build/willQuestionRoomba.js");
exports.processApiResponse = ({ error_id, items }, trsByQuestionId, trs) => {
    if (error_id) {
        showToastError_1.showToastError(`Stack Hide Roomba Bound Posts Error: Stack Exchange API response code ${error_id}`);
        return;
    }
    const trsToBeProcessed = new Set(trs);
    items.forEach((questionObj) => {
        const willRoomba = willQuestionRoomba_1.willQuestionRoomba(questionObj);
        trsByQuestionId[questionObj.question_id].forEach((tr) => {
            if (willRoomba === 'willRoombaIfReopenAgesAway') {
                tr.setAttribute('data-cpuserscript-roomba-bound-but-reopen-votes', '');
            }
            else if (willRoomba) {
                tr.setAttribute('data-cpuserscript-roomba-bound', '');
            }
            else {
                tr.setAttribute('data-cpuserscript-will-not-roomba', '');
            }
            trsToBeProcessed.delete(tr);
        });
    });
    // Remaining TRs which were not included in API response must have been deleted in between table population and userscript enabling - hide them permanently
    trsToBeProcessed.forEach((tr) => {
        tr.setAttribute('data-cpuserscript-already-deleted', '');
        tr.style.display = 'none';
    });
};


/***/ }),

/***/ "./build/settingsStore.js":
/*!********************************!*\
  !*** ./build/settingsStore.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
let settings;
if (!localStorage.hideRoombaBoundPostsSettings) {
    localStorage.hideRoombaBoundPostsSettings = JSON.stringify({
        enabled: true,
        showPostsWithReopenVotes: true,
    });
}
// In the unlikely event that the object in memory conflicts with the object in localStorage,
// the object in memory takes priority
exports.get = () => {
    return settings || JSON.parse(localStorage.hideRoombaBoundPostsSettings);
};
exports.set = (newSettings) => {
    settings = newSettings;
    localStorage.hideRoombaBoundPostsSettings = JSON.stringify(newSettings);
};


/***/ }),

/***/ "./build/showToastError.js":
/*!*********************************!*\
  !*** ./build/showToastError.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.showToastError = (message) => {
    window.StackExchange.helpers.showToast(message, { transient: false, type: 'danger' });
};


/***/ }),

/***/ "./build/waitForTablesToExist.js":
/*!***************************************!*\
  !*** ./build/waitForTablesToExist.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const watchForClicksOnTables_1 = __webpack_require__(/*! ./watchForClicksOnTables */ "./build/watchForClicksOnTables.js");
exports.waitForTablesToExist = () => {
    // Wait for both delete tables to be created from the multiple ajax request done by the page
    const containerForAllTables = document.querySelector('.subheader + div');
    if (!containerForAllTables) {
        // Not logged in, or not enough reputation:
        return;
    }
    new MutationObserver((_, observer) => {
        const deleteTables = ['topDelete', 'recentDelete']
            .map(dataMode => document.querySelector(`div[data-mode="${dataMode}"] > table`));
        if (deleteTables.some(table => !table)) {
            return;
        }
        observer.disconnect();
        watchForClicksOnTables_1.watchForClicksOnTables(deleteTables);
    })
        .observe(containerForAllTables, { childList: true, subtree: true });
};


/***/ }),

/***/ "./build/watchForClicksOnTables.js":
/*!*****************************************!*\
  !*** ./build/watchForClicksOnTables.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const checkTable_1 = __webpack_require__(/*! ./checkTable */ "./build/checkTable.js");
const createSettingsInterface_1 = __webpack_require__(/*! ./createSettingsInterface */ "./build/createSettingsInterface.js");
const makeCheckOpenTables_1 = __webpack_require__(/*! ./makeCheckOpenTables */ "./build/makeCheckOpenTables.js");
exports.watchForClicksOnTables = (deleteTables) => {
    const checkOpenTables = makeCheckOpenTables_1.makeCheckOpenTables(deleteTables, checkTable_1.checkTable);
    createSettingsInterface_1.createSettingsInterface(checkOpenTables);
    checkOpenTables();
    deleteTables.forEach((deleteTable) => {
        const h3 = deleteTable.closest('.island').querySelector('h3');
        h3.addEventListener('click', () => {
            checkTable_1.checkTable(deleteTable);
        });
    });
};


/***/ }),

/***/ "./build/willQuestionRoomba.js":
/*!*************************************!*\
  !*** ./build/willQuestionRoomba.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.willQuestionRoomba = (questionObj) => {
    const { answers = [], accepted_answer_id, score: questionScore, locked_date, view_count, comment_count, creation_date, owner, closed_reason, reopen_vote_count, } = questionObj;
    const questionAgeInDays = (Date.now() - creation_date) / (1000 * 60 * 60 * 24);
    const isMetaSite = window.location.host.includes('meta.');
    const maxScoreAnswer = Math.max(...answers.map(({ score }) => score));
    // Roomba rules: https://stackoverflow.com/help/roomba
    /* RemoveDeadQuestions: If the question is more than 30 days old, and ...
     *   has −1 or lower score
     *   has no answers
     *   is not locked
     */
    if (questionScore < 0 && answers.length === 0 && !locked_date) {
        return true;
    }
    /* RemoveAbandonedQuestions: If the question is more than 365 days old, and ...
     *   has a score of 0 or less, or a score of 1 and a deleted owner
     *   has no answers
     *   is not locked
     *   has view count <= the age of the question in days times 1.5
     *   has 1 or 0 comments
     *   isn't on a meta site
     */
    if ((questionScore <= 0 || (questionScore === 1 && owner.user_type === 'does_not_exist')) &&
        answers.length === 0 &&
        !locked_date &&
        view_count <= (questionAgeInDays * 1.5) &&
        comment_count <= 1 &&
        !isMetaSite) {
        return true;
    }
    /* RemoveAbandonedClosed: If the question was closed more than 9 days ago, and ...
         not closed as a duplicate
         has a score of 0 or less
         is not locked
         has no answers with a score > 0
         has no accepted answer
         has no pending reopen votes
         has not been edited in the past 9 days
    */
    if (closed_reason !== 'duplicate' &&
        questionScore <= 0 &&
        !locked_date &&
        maxScoreAnswer <= 0 &&
        !accepted_answer_id) {
        if (reopen_vote_count === 0) {
            return true;
        }
        return 'willRoombaIfReopenAgesAway';
    }
    // "Has not been edited" condition is ignored, because 9 days will eventually be reached
    return false;
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
/* harmony default export */ __webpack_exports__["default"] = ("[data-cpuserscript-hide-roomba-bound-posts-settings] {\n  margin: 0.5em auto;\n  height: 3em;\n  display: flex;\n  align-items: center; }\n  [data-cpuserscript-hide-roomba-bound-posts-settings] > * {\n    display: flex;\n    align-items: center;\n    justify-content: center; }\n  [data-cpuserscript-hide-roomba-bound-posts-settings] > label {\n    height: 2em;\n    cursor: pointer;\n    user-select: none; }\n    [data-cpuserscript-hide-roomba-bound-posts-settings] > label > * {\n      cursor: pointer; }\n    [data-cpuserscript-hide-roomba-bound-posts-settings] > label:nth-child(2) {\n      margin-left: 70px;\n      margin-right: 40px; }\n  [data-cpuserscript-hide-roomba-bound-posts-settings] input {\n    margin: 0 0 0 10px !important; }\n\n[data-cpuserscript-hide-roomba-bound-posts-settings][data-enabled] ~ .island [data-cpuserscript-roomba-bound],\n[data-cpuserscript-hide-roomba-bound-posts-settings][data-enabled][data-hide-posts-with-reopen-votes] ~ .island [data-cpuserscript-roomba-bound-but-reopen-votes] {\n  display: none; }\n");

/***/ })

/******/ });