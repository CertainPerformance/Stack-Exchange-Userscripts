// ==UserScript==
// @name             Stack One Click VTC
// @description      Allows voting to close with a single click
// @author           CertainPerformance
// @namespace        https://github.com/CertainPerformance/Stack-Exchange-Userscripts
// @version          1.1.13
// @include          /^https://stackoverflow\.com/questions/\d+/
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

/***/ "./node_modules/raw-loader/dist/cjs.js!./build/styleText.css":
/*!*******************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./build/styleText.css ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("[data-cpuserscript-one-click-vtc] {\n  position: absolute;\n  margin-top: 24px;\n  left: -250px;\n  width: 240px; }\n  [data-cpuserscript-one-click-vtc] [data-close-reason-id] {\n    margin-bottom: 10px;\n    padding: 5px; }\n    [data-cpuserscript-one-click-vtc] [data-close-reason-id]:hover {\n      background-color: yellow; }\n      body.theme-dark [data-cpuserscript-one-click-vtc] [data-close-reason-id]:hover {\n        background-color: chocolate; }\n  [data-cpuserscript-one-click-vtc] div:hover + [data-close-reason-id] {\n    background-color: lime; }\n    body.theme-dark [data-cpuserscript-one-click-vtc] div:hover + [data-close-reason-id] {\n      background-color: green; }\n  [data-cpuserscript-one-click-vtc] > :nth-child(4) {\n    padding: 5px; }\n  [data-cpuserscript-one-click-vtc] > :nth-child(2),\n  [data-cpuserscript-one-click-vtc] > :nth-child(3),\n  [data-cpuserscript-one-click-vtc] > :nth-child(5) > *,\n  [data-cpuserscript-one-click-vtc] > :nth-child(5) ~ *:not(:last-child) {\n    cursor: pointer; }\n  [data-cpuserscript-one-click-vtc] > :nth-child(5) {\n    margin-left: 20px; }\n  [data-cpuserscript-one-click-vtc] > div:not(:last-child) > div:nth-child(odd) {\n    border: 1px solid var(--black);\n    float: right;\n    visibility: hidden;\n    width: calc(0.75em + 15px);\n    height: calc(0.75em + 15px);\n    text-align: center;\n    vertical-align: middle;\n    line-height: calc(0.75em + 15px); }\n  [data-cpuserscript-one-click-vtc] > div:nth-child(even):not(:last-child) {\n    border: 1px solid var(--black);\n    float: right;\n    visibility: hidden;\n    width: calc(1em + 15px);\n    height: calc(1em + 15px);\n    text-align: center;\n    vertical-align: middle;\n    line-height: calc(1em + 15px); }\n  [data-cpuserscript-one-click-vtc] > div:last-child {\n    visibility: hidden;\n    text-align: center; }\n    [data-cpuserscript-one-click-vtc] > div:last-child > div {\n      display: flex;\n      justify-content: space-around; }\n      [data-cpuserscript-one-click-vtc] > div:last-child > div > div {\n        padding: 0 5px;\n        border: 1px solid var(--black);\n        cursor: pointer;\n        user-select: none; }\n        [data-cpuserscript-one-click-vtc] > div:last-child > div > div[data-selected-option] {\n          background-color: var(--blue-700);\n          color: var(--white); }\n        [data-cpuserscript-one-click-vtc] > div:last-child > div > div:hover:not([data-selected-option]) {\n          background-color: yellow; }\n          body.theme-dark [data-cpuserscript-one-click-vtc] > div:last-child > div > div:hover:not([data-selected-option]) {\n            background-color: chocolate; }\n\n.question .js-vote-down-btn[data-cpuserscript-one-click-vtc-imminent-downvote] {\n  background-color: yellow; }\n  body.theme-dark .question .js-vote-down-btn[data-cpuserscript-one-click-vtc-imminent-downvote] {\n    background-color: chocolate; }\n");

/***/ }),

/***/ "./src/canCreateInterface.ts":
/*!***********************************!*\
  !*** ./src/canCreateInterface.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.canCreateInterface = () => {
    const myProfile = document.querySelector('.my-profile');
    if (!myProfile) {
        // Not logged in, don't do anything
        return;
    }
    const myProfileLink = myProfile.href;
    const { rep } = window.StackExchange.options.user;
    if (rep < 3000) {
        // tslint:disable-next-line: no-console
        console.error(`Stack One Click VTC: Need 3000 rep to VTC, but you only have ${rep}`);
        return;
    }
    // Do not display the VTC interface if you've posted a non-deleted answer:
    const stillVisibleAnswerAuthorAnchors = [...document.querySelectorAll('.answer:not(.deleted-answer) .user-details[itemprop="author"] a[href^="/users/"]')];
    if (stillVisibleAnswerAuthorAnchors.some(a => a.href === myProfileLink)) {
        return;
    }
    // Interface will be ~250px wide
    // So, only create interface if there's at least 250px between container and viewport edge:
    const emptySpaceToLeftOfContent = document.querySelector('.container').getBoundingClientRect().left;
    if (emptySpaceToLeftOfContent < 250) {
        // tslint:disable-next-line: no-console
        console.warn(`Not enough space to put Stack One Click VTC interface to left of main content: 250px required, ${Math.floor(emptySpaceToLeftOfContent)}px found`);
        if (document.querySelector('#left-sidebar').offsetParent !== null) {
            // tslint:disable-next-line: no-console
            console.warn('Consider disabling the left sidebar at https://stackoverflow.com/users/preferences/');
        }
        // tslint:disable-next-line: no-console
        console.warn('To acquire more space, consider installing Stack Right Content: https://github.com/CertainPerformance/Stack-Exchange-Userscripts/tree/master/Right-Content');
        return;
    }
    const closeQuestionLink = document.querySelector('.close-question-link');
    if (!closeQuestionLink) {
        // Probably only occurs with locked posts
        // or with deleted posts user does not have the privilege to see
        // or 404 pages
        return;
    }
    if (document.querySelector('#question.deleted-answer')) {
        // Question is deleted. Yes, deleted questions have the deleted-answer class
        return;
    }
    if (closeQuestionLink.textContent === 'reopen' || closeQuestionLink.title.includes('You voted')) {
        return;
    }
    return true;
};


/***/ }),

/***/ "./src/haveVotedOnQuestion.ts":
/*!************************************!*\
  !*** ./src/haveVotedOnQuestion.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.haveVotedOnQuestion = () => Boolean(document.querySelector('.question .fc-theme-primary'));


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
const canCreateInterface_1 = __webpack_require__(/*! ./canCreateInterface */ "./src/canCreateInterface.ts");
const insertStyle_1 = __webpack_require__(/*! ./insertStyle */ "./src/insertStyle.ts");
const listenForAutoVoteChanges_1 = __webpack_require__(/*! ./listenForAutoVoteChanges */ "./src/listenForAutoVoteChanges.ts");
const showOkButtonWhenHovered_1 = __webpack_require__(/*! ./showOkButtonWhenHovered */ "./src/showOkButtonWhenHovered.ts");
const tryVoteClose_1 = __webpack_require__(/*! ./tryVoteClose */ "./src/tryVoteClose/index.ts");
const vtcContainerHTML_1 = __webpack_require__(/*! ./vtcContainerHTML */ "./src/vtcContainerHTML.ts");
if (canCreateInterface_1.canCreateInterface()) {
    const vtcContainer = document.querySelector('.container').insertAdjacentElement('afterbegin', document.createElement('div'));
    vtcContainer.innerHTML = vtcContainerHTML_1.vtcContainerHTML;
    showOkButtonWhenHovered_1.showOkButtonWhenHovered(vtcContainer);
    vtcContainer.setAttribute('data-cpuserscript-one-click-vtc', '');
    vtcContainer.addEventListener('click', tryVoteClose_1.tryVoteCloseWhenSEReady);
    listenForAutoVoteChanges_1.listenForAutoVoteChanges(vtcContainer);
    insertStyle_1.insertStyle();
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
// @ts-ignore
// tslint:disable-next-line: no-implicit-dependencies
const styleText_css_1 = __webpack_require__(/*! raw-loader!../build/styleText.css */ "./node_modules/raw-loader/dist/cjs.js!./build/styleText.css");
exports.insertStyle = () => {
    const styleTag = document.body.appendChild(document.createElement('style'));
    styleTag.textContent = styleText_css_1.default;
};


/***/ }),

/***/ "./src/listenForAutoVoteChanges.ts":
/*!*****************************************!*\
  !*** ./src/listenForAutoVoteChanges.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
if (!localStorage.cpUserscriptOneClickVTCDownvoteWhenVotingToClose) {
    localStorage.cpUserscriptOneClickVTCDownvoteWhenVotingToClose = 'Non-dupes only';
}
const showOptionContainer = (optionContainer) => {
    optionContainer.style.visibility = 'visible';
    const buttons = [...optionContainer.children[1].children];
    const currentButton = buttons.find(button => button.textContent === localStorage.cpUserscriptOneClickVTCDownvoteWhenVotingToClose);
    currentButton.setAttribute('data-selected-option', '');
    optionContainer.addEventListener('click', (e) => {
        const target = e.target;
        if (!target.matches('h4 + div > div')) {
            return;
        }
        for (const button of buttons) {
            button.removeAttribute('data-selected-option');
        }
        target.setAttribute('data-selected-option', '');
        localStorage.cpUserscriptOneClickVTCDownvoteWhenVotingToClose = target.textContent;
    });
};
exports.listenForAutoVoteChanges = (vtcContainer) => {
    const optionContainer = vtcContainer.lastElementChild;
    // Reveal the optionContainer after mouse has hovered over the vtcContainer for 5 seconds
    let timeout;
    vtcContainer.addEventListener('mouseenter', () => {
        timeout = window.setTimeout(showOptionContainer, 5000, optionContainer);
    });
    vtcContainer.addEventListener('mouseleave', () => {
        window.clearTimeout(timeout);
    });
};


/***/ }),

/***/ "./src/showOkButtonWhenHovered.ts":
/*!****************************************!*\
  !*** ./src/showOkButtonWhenHovered.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const haveVotedOnQuestion_1 = __webpack_require__(/*! ./haveVotedOnQuestion */ "./src/haveVotedOnQuestion.ts");
const tryShowButton = (textContainer, okButton) => {
    // If user never auto-votes when voting to close, showing the button only adds confusing and useless noise
    const setting = localStorage.cpUserscriptOneClickVTCDownvoteWhenVotingToClose;
    if (setting === 'Never' || (setting === 'Non-dupes only' && textContainer.dataset.closeReasonId === 'Duplicate')) {
        return false;
    }
    okButton.style.visibility = 'visible';
    return true;
};
exports.showOkButtonWhenHovered = (vtcContainer) => {
    const downvoteButton = document.querySelector('.question .js-vote-down-btn');
    const showImminentDownvote = () => {
        if (!haveVotedOnQuestion_1.haveVotedOnQuestion()) {
            downvoteButton.setAttribute('data-cpuserscript-one-click-vtc-imminent-downvote', '');
        }
    };
    const noImminentDownvote = () => {
        downvoteButton.removeAttribute('data-cpuserscript-one-click-vtc-imminent-downvote');
    };
    for (const textContainer of (vtcContainer.querySelectorAll('[data-close-reason-id]'))) {
        const okButton = textContainer.previousElementSibling;
        okButton.addEventListener('mouseenter', () => {
            tryShowButton(textContainer, okButton);
            noImminentDownvote();
        });
        okButton.addEventListener('mouseleave', (e) => {
            if (e.relatedTarget !== textContainer) {
                okButton.removeAttribute('style');
            }
        });
        textContainer.addEventListener('mouseenter', () => {
            if (tryShowButton(textContainer, okButton)) {
                showImminentDownvote();
            }
        });
        textContainer.addEventListener('mouseleave', (e) => {
            if (e.relatedTarget !== okButton) {
                okButton.removeAttribute('style');
                noImminentDownvote();
            }
        });
    }
};


/***/ }),

/***/ "./src/tryVoteClose/index.ts":
/*!***********************************!*\
  !*** ./src/tryVoteClose/index.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const haveVotedOnQuestion_1 = __webpack_require__(/*! ../haveVotedOnQuestion */ "./src/haveVotedOnQuestion.ts");
const openDuplicateModal_1 = __webpack_require__(/*! ./openDuplicateModal */ "./src/tryVoteClose/openDuplicateModal.ts");
const submitCloseVote_1 = __webpack_require__(/*! ./submitCloseVote */ "./src/tryVoteClose/submitCloseVote.ts");
// Wait until SE has attached listeners and applied personal vote classes to vote buttons
exports.tryVoteCloseWhenSEReady = (event) => {
    window.StackExchange.ready(() => {
        tryVoteClose(event);
    });
};
const tryVoteClose = (event) => {
    if (!submitCloseVote_1.getCanSendRequest()) {
        return;
    }
    const target = event.target;
    const closeTextElement = target.matches('[data-close-reason-id]') ? target : target.nextElementSibling;
    if (!closeTextElement || !closeTextElement.matches('[data-close-reason-id]')) {
        // All of the elements that are intended to be clickable have this:
        return;
    }
    const okButtonWasClicked = target !== closeTextElement;
    const { closeReasonId, siteSpecificCloseReasonId } = closeTextElement.dataset;
    const voteIsDuplicate = closeReasonId === 'Duplicate';
    // localStorage will definitely be populated by this point; it's done on the top level of listenForAutoVoteChanges
    const downvoteCondition = localStorage.cpUserscriptOneClickVTCDownvoteWhenVotingToClose;
    const downvoteButton = document.querySelector('.question .js-vote-down-btn');
    if (!okButtonWasClicked &&
        !haveVotedOnQuestion_1.haveVotedOnQuestion() &&
        (downvoteCondition === 'Always' || (downvoteCondition === 'Non-dupes only' && !voteIsDuplicate))) {
        downvoteButton.click();
    }
    downvoteButton.removeAttribute('data-cpuserscript-one-click-vtc-imminent-downvote');
    if (voteIsDuplicate) {
        openDuplicateModal_1.openDuplicateModal();
        return;
    }
    submitCloseVote_1.submitCloseVote(closeReasonId, siteSpecificCloseReasonId);
};


/***/ }),

/***/ "./src/tryVoteClose/makeHandleCloseVoteResponse.ts":
/*!*********************************************************!*\
  !*** ./src/tryVoteClose/makeHandleCloseVoteResponse.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const showToast_1 = __webpack_require__(/*! ../../../common/showToast */ "../common/showToast.ts");
exports.makeHandleCloseVoteResponse = (setCanSendRequestToTrue) => (result) => {
    if (result.ResultChangedState) {
        // Question successfully closed
        window.location.href = window.location.href;
        return;
    }
    if (!result.Success) {
        setCanSendRequestToTrue();
        showToast_1.showToastError(result.Message);
        return;
    }
    const oneClickVTCContainer = document.querySelector('[data-cpuserscript-one-click-vtc]');
    oneClickVTCContainer.remove();
    updateCloseVoteCount(result);
};
const updateCloseVoteCount = (result) => {
    const { updateCloseLinkCount } = window.StackExchange.vote_closingAndFlagging;
    const haveSEUpdateCloseLinkCount = () => {
        updateCloseLinkCount(result, $('.close-question-link'));
    };
    haveSEUpdateCloseLinkCount();
    // If the question had an edit notice, and the downvote button was .click()ed, the postcell will be refreshed,
    // likely overwriting the newly updated updated close vote count (eg "close (2)").
    // Watch to see if the post gets replaced in the near future, and if it does, update the link count:
    const postcell = document.querySelector('.question .postcell');
    const outerObserver = new MutationObserver((mutations, observer) => {
        for (const { removedNodes } of mutations) {
            if ([...removedNodes].includes(postcell)) {
                // This will run in a microtask after replacement is finished
                haveSEUpdateCloseLinkCount();
                observer.disconnect();
                return;
            }
        }
    });
    outerObserver.observe(postcell.parentElement, { childList: true });
    window.setTimeout(() => {
        outerObserver.disconnect();
    }, 1000);
};


/***/ }),

/***/ "./src/tryVoteClose/openDuplicateModal.ts":
/*!************************************************!*\
  !*** ./src/tryVoteClose/openDuplicateModal.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.openDuplicateModal = () => {
    document.querySelector('.close-question-link').click();
    const handler = (_event, _jqXHR, ajaxOptions) => {
        if (!ajaxOptions.url || !/\/flags\/questions\/\d+\/close\/popup/.test(ajaxOptions.url)) {
            return;
        }
        // First ID selector below is new due to UI changes ~4/13/20: https://meta.stackoverflow.com/q/396592
        // If it doesn't get reverted and makes it out of the testing phase, second selector can be removed
        const duplicateRadio = document.querySelector('#closeReasonId-Duplicate, input[type="radio"][name="close-reason"][value="Duplicate"]');
        if (duplicateRadio) {
            // If there's an error, or user has already voted to close, duplicateRadio will not exist
            // That's fine - keep the newly opened modal or error box open, so user can see what the problem was
            duplicateRadio.click();
            window.$(document).off('ajaxComplete', handler);
        }
    };
    window.$(document).on('ajaxComplete', handler);
};


/***/ }),

/***/ "./src/tryVoteClose/submitCloseVote.ts":
/*!*********************************************!*\
  !*** ./src/tryVoteClose/submitCloseVote.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const makeHandleCloseVoteResponse_1 = __webpack_require__(/*! ./makeHandleCloseVoteResponse */ "./src/tryVoteClose/makeHandleCloseVoteResponse.ts");
let canSendRequest = true;
exports.getCanSendRequest = () => canSendRequest;
const setCanSendRequestToTrue = () => {
    canSendRequest = true;
};
exports.submitCloseVote = (closeReasonId, siteSpecificCloseReasonId) => {
    const formData = new FormData();
    formData.append('fkey', window.StackExchange.options.user.fkey);
    formData.append('closeReasonId', closeReasonId);
    if (siteSpecificCloseReasonId) {
        formData.append('siteSpecificCloseReasonId', siteSpecificCloseReasonId);
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
        .then(makeHandleCloseVoteResponse_1.makeHandleCloseVoteResponse(setCanSendRequestToTrue))
        .catch((error) => {
        canSendRequest = true;
        // tslint:disable-next-line: no-console
        console.error(error);
        const msg = 'Stack One Click VTC: An error occurred, see console for details';
        window.StackExchange.helpers.showToast(msg, { transient: false, type: 'danger' });
    });
};


/***/ }),

/***/ "./src/vtcContainerHTML.ts":
/*!*********************************!*\
  !*** ./src/vtcContainerHTML.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.vtcContainerHTML = `
<h2>Vote to close as</h2>
<div>OK</div><h3 data-close-reason-id="Duplicate">Duplicate</h3>
<h3>Site-Specific</h3>
<div>
    <div>OK</div><div data-close-reason-id="SiteSpecific" data-site-specific-close-reason-id="4">General computing</div>
    <div>OK</div><div data-close-reason-id="SiteSpecific" data-site-specific-close-reason-id="7">Server / networking</div>
    <div>OK</div><div data-close-reason-id="SiteSpecific" data-site-specific-close-reason-id="16">Off-site resource request</div>
    <div>OK</div><div data-close-reason-id="SiteSpecific" data-site-specific-close-reason-id="13">No MCVE</div>
    <div>OK</div><div data-close-reason-id="SiteSpecific" data-site-specific-close-reason-id="11">Caused by typo</div>
</div>
<div>OK</div><h3 data-close-reason-id="NeedsDetailsOrClarity">Unclear</h3>
<div>OK</div><h3 data-close-reason-id="NeedMoreFocus">Too Broad</h3>
<div>OK</div><h3 data-close-reason-id="OpinionBased">Opinion-Based</h3>
<div>
    <h4>Downvote when voting to close:</h4>
    <div>
        <div>Always</div>
        <div>Non-dupes only</div>
        <div>Never</div>
    </div>
</div>
`;


/***/ })

/******/ });