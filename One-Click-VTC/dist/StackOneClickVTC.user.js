// ==UserScript==
// @name             Stack One Click VTC
// @description      Allows voting to close with a single click
// @author           CertainPerformance
// @namespace        https://github.com/CertainPerformance/Stack-Exchange-Userscripts
// @version          1.2.2
// @include          /^https://(?:[^/]+\.)?(?:(?:stackoverflow|serverfault|superuser|stackexchange|askubuntu|stackapps)\.com|mathoverflow\.net)/questions/\d+/
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
/* harmony default export */ __webpack_exports__["default"] = ("[data-cpuserscript-one-click-vtc] {\n  position: absolute;\n  margin-top: 24px;\n  left: -250px;\n  width: 240px; }\n  [data-cpuserscript-one-click-vtc] [data-close-reason-id] {\n    margin-bottom: 10px;\n    padding: 5px; }\n    [data-cpuserscript-one-click-vtc] [data-close-reason-id]:hover {\n      background-color: yellow; }\n      body.theme-dark [data-cpuserscript-one-click-vtc] [data-close-reason-id]:hover {\n        background-color: chocolate; }\n  [data-cpuserscript-one-click-vtc] div:hover + [data-close-reason-id] {\n    background-color: lime; }\n    body.theme-dark [data-cpuserscript-one-click-vtc] div:hover + [data-close-reason-id] {\n      background-color: green; }\n  [data-cpuserscript-one-click-vtc] > :nth-child(4) {\n    padding: 5px; }\n  [data-cpuserscript-one-click-vtc] > :nth-child(2),\n  [data-cpuserscript-one-click-vtc] > :nth-child(3),\n  [data-cpuserscript-one-click-vtc] > :nth-child(5) > *:not(input),\n  [data-cpuserscript-one-click-vtc] > :nth-child(5) ~ *:not(:last-child) {\n    cursor: pointer; }\n  [data-cpuserscript-one-click-vtc] > :nth-child(5) {\n    margin-left: 20px; }\n  [data-cpuserscript-one-click-vtc] > div:not(:last-child) > div:nth-child(odd) {\n    border: 1px solid var(--black);\n    float: right;\n    visibility: hidden;\n    width: calc(0.75em + 15px);\n    height: calc(0.75em + 15px);\n    text-align: center;\n    vertical-align: middle;\n    line-height: calc(0.75em + 15px); }\n  [data-cpuserscript-one-click-vtc] > div:nth-child(even):not(:last-child) {\n    border: 1px solid var(--black);\n    float: right;\n    visibility: hidden;\n    width: calc(1em + 15px);\n    height: calc(1em + 15px);\n    text-align: center;\n    vertical-align: middle;\n    line-height: calc(1em + 15px); }\n  [data-cpuserscript-one-click-vtc] > div:last-child {\n    visibility: hidden;\n    text-align: center; }\n    [data-cpuserscript-one-click-vtc] > div:last-child > div {\n      display: flex;\n      justify-content: space-around; }\n      [data-cpuserscript-one-click-vtc] > div:last-child > div > div {\n        padding: 0 5px;\n        border: 1px solid var(--black);\n        cursor: pointer;\n        user-select: none; }\n        [data-cpuserscript-one-click-vtc] > div:last-child > div > div[data-selected-option] {\n          background-color: var(--blue-700);\n          color: var(--white); }\n        [data-cpuserscript-one-click-vtc] > div:last-child > div > div:hover:not([data-selected-option]) {\n          background-color: yellow; }\n          body.theme-dark [data-cpuserscript-one-click-vtc] > div:last-child > div > div:hover:not([data-selected-option]) {\n            background-color: chocolate; }\n    [data-cpuserscript-one-click-vtc] > div:last-child > h5 {\n      margin: 10px; }\n\n.question .js-vote-down-btn[data-cpuserscript-one-click-vtc-imminent-downvote] {\n  background-color: yellow; }\n  body.theme-dark .question .js-vote-down-btn[data-cpuserscript-one-click-vtc-imminent-downvote] {\n    background-color: chocolate; }\n");

/***/ }),

/***/ "./src/canCreateInterface.ts":
/*!***********************************!*\
  !*** ./src/canCreateInterface.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.canCreateInterface = void 0;
const settings_1 = __webpack_require__(/*! ./settings */ "./src/settings.ts");
exports.canCreateInterface = () => {
    const myProfile = document.querySelector('.my-profile');
    if (!myProfile) {
        // Not logged in, or site is down, don't do anything
        return;
    }
    const myProfileLink = myProfile.getAttribute('href');
    const { rep } = window.StackExchange.options.user;
    if (rep < 15) {
        // tslint:disable-next-line: no-console
        console.error(`Stack One Click VTC: Need 15 rep to flag and 3000 to close, but you only have ${rep}`);
        return;
    }
    // Do not display the VTC interface if you've posted a non-deleted answer:
    const stillVisiblePersonalAnswerAuthorAnchor = document.querySelector(`.answer:not(.deleted-answer) .user-details[itemprop="author"] a[href^="${myProfileLink}"]`);
    if (stillVisiblePersonalAnswerAuthorAnchor) {
        return;
    }
    // Do not display the VTC interface if you posted the question:
    if (document.querySelector(`.owner a[href^="${myProfileLink}"]`)) {
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
    const flagQuestionLink = document.querySelector('.flag-post-link ');
    if (!flagQuestionLink) {
        // Probably only occurs with locked posts
        // or with deleted posts user does not have the privilege to see
        // or 404 pages
        return;
    }
    if (document.querySelector('#question.deleted-answer')) {
        // Question is deleted. Yes, deleted questions have the deleted-answer class
        return;
    }
    const questionTitle = document.querySelector('.question-hyperlink').textContent;
    if (questionTitle.endsWith(' [closed]') || questionTitle.endsWith(' [duplicate]')) {
        return;
    }
    const closeQuestionLink = document.querySelector('.close-question-link');
    if (closeQuestionLink && closeQuestionLink.title.includes('You voted')) {
        return;
    }
    const questionId = Number(window.location.href.match(/\d+/)[0]);
    if (rep < 3000 && localStorage.cpUserscriptOneClickVTCSettings && settings_1.getSettings().raisedCloseFlags.includes(questionId)) {
        return;
    }
    return true;
};


/***/ }),

/***/ "./src/defaultSiteSpecificShortReasons.ts":
/*!************************************************!*\
  !*** ./src/defaultSiteSpecificShortReasons.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Properties below are site names, accessible by accessing StackExchange.options.site.name
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultSiteSpecificShortReasons = void 0;
exports.defaultSiteSpecificShortReasons = {
    'Stack Overflow': [
        'General computing',
        'Server / networking',
        'Off-site resource request',
        'No MCVE',
        'Caused by typo',
    ],
    'Meta Stack Overflow': [
        'Not about SO/SE',
        "Doesn't seek discussion",
        'Not reproducible',
    ],
    'Meta Stack Exchange': [
        'Not about SE',
        "Doesn't seek discussion",
        'Not reproducible',
        'Only applicable to subsite',
    ],
    'Code Review Stack Exchange': [
        'Authorship/embedded code',
        'Code not working',
        'Missing review context',
    ],
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
exports.haveVotedOnQuestion = void 0;
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
const watchForInterfaceHover_1 = __webpack_require__(/*! ./watchForInterfaceHover */ "./src/watchForInterfaceHover.ts");
const watchForSiteSpecificEdits_1 = __webpack_require__(/*! ./watchForSiteSpecificEdits */ "./src/watchForSiteSpecificEdits.ts");
const showOkButtonWhenHovered_1 = __webpack_require__(/*! ./showOkButtonWhenHovered */ "./src/showOkButtonWhenHovered.ts");
const tryVoteClose_1 = __webpack_require__(/*! ./tryVoteClose */ "./src/tryVoteClose/index.ts");
const makeVTCContainerHTML_1 = __webpack_require__(/*! ./makeVTCContainerHTML */ "./src/makeVTCContainerHTML.ts");
const populateCloseReasons_1 = __webpack_require__(/*! ./populateCloseReasons */ "./src/populateCloseReasons.ts");
const watchForReset_1 = __webpack_require__(/*! ./watchForReset */ "./src/watchForReset.ts");
const createInterface = () => {
    const vtcContainer = document.querySelector('.container').insertAdjacentElement('afterbegin', document.createElement('div'));
    vtcContainer.innerHTML = makeVTCContainerHTML_1.makeVTCContainerHTML();
    showOkButtonWhenHovered_1.showOkButtonWhenHovered(vtcContainer);
    vtcContainer.setAttribute('data-cpuserscript-one-click-vtc', '');
    vtcContainer.addEventListener('click', tryVoteClose_1.tryVoteCloseWhenSEReady);
    watchForInterfaceHover_1.watchForInterfaceHover(vtcContainer);
    watchForSiteSpecificEdits_1.watchForSiteSpecificEdits(vtcContainer);
    watchForReset_1.watchForReset(vtcContainer);
    insertStyle_1.insertStyle();
};
if (canCreateInterface_1.canCreateInterface()) {
    if (!localStorage.cpUserscriptOneClickVTCSettings) {
        populateCloseReasons_1.populateCloseReasons(createInterface);
    }
    else {
        createInterface();
    }
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

/***/ "./src/makeVTCContainerHTML.ts":
/*!*************************************!*\
  !*** ./src/makeVTCContainerHTML.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.makeVTCContainerHTML = void 0;
const settings_1 = __webpack_require__(/*! ./settings */ "./src/settings.ts");
exports.makeVTCContainerHTML = () => `
<h2>Vote to close as</h2>
<div>OK</div><h3 data-close-reason-id="Duplicate">Duplicate</h3>
<h3>Site-Specific</h3>
<div>${settings_1.getSettings()
    .siteSpecificCloseReasons
    .map(({ siteSpecificCloseReasonId: id, reasonText, longReasonText }) => `<div>OK</div>
            <div
                data-close-reason-id="SiteSpecific"
                data-site-specific-close-reason-id="${id}"
                title="${longReasonText.replace(/"/g, '&quot;')}"
            >${reasonText}</div>`)
    .join('')}
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
    <h5>Right-click a Site-Specific reason to edit displayed text</h5>
    <button title="Click this if moderators change a site's close reasons">Reset close reasons</button>
</div>
`;


/***/ }),

/***/ "./src/populateCloseReasons.ts":
/*!*************************************!*\
  !*** ./src/populateCloseReasons.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.populateCloseReasons = void 0;
const showToast_1 = __webpack_require__(/*! ../../common/showToast */ "../common/showToast.ts");
const settings_1 = __webpack_require__(/*! ./settings */ "./src/settings.ts");
const defaultSiteSpecificShortReasons_1 = __webpack_require__(/*! ./defaultSiteSpecificShortReasons */ "./src/defaultSiteSpecificShortReasons.ts");
/**
 * Make a network request to get the site-specific interface to close the question,
 * save the results in localStorage
 */
exports.populateCloseReasons = (createInterface) => {
    const questionId = window.location.href.match(/\d+/)[0];
    // The below will probably only log once after the userscript is installed
    // tslint:disable-next-line: no-console
    console.log('Stack One Click VTC: Fetching site-specific close reasons...');
    // The site-specific interface is included in the main /close interface response
    fetch(`${window.location.origin}/flags/questions/${questionId}/close/popup`)
        .then(res => res.text())
        .then((popupText) => {
        handlePopup(popupText, createInterface);
    })
        .catch((error) => {
        // tslint:disable-next-line: no-console
        console.error(error);
        showToast_1.showToastError('Stack One Click VTC: An error occurred while fetching site-specific close reasons, see console for details');
    });
};
const handlePopup = (popupText, createInterface) => {
    const doc = new DOMParser().parseFromString(popupText, 'text/html');
    const siteSpecificRadios = doc.querySelectorAll('input[name="siteSpecificCloseReasonId"]');
    if (!siteSpecificRadios.length) {
        // Might occur if site is down
        showToast_1.showToastError('Stack One Click VTC: No site-specific radio buttons found, try going to a different question');
        return;
    }
    const thisSiteShortReasons = defaultSiteSpecificShortReasons_1.defaultSiteSpecificShortReasons[window.StackExchange.options.site.name] || [];
    const siteSpecificCloseReasons = [];
    siteSpecificRadios.forEach((radio, i) => {
        const origLabelText = radio
            .parentElement
            .nextElementSibling
            .querySelector('label')
            .textContent;
        // If there's both a main label and an extended description, join them by `. `:
        const longReasonText = origLabelText
            .split('\n')
            .map(str => str.trim())
            .filter(Boolean)
            .join('. ');
        if (longReasonText.includes('add a comment') ||
            longReasonText.includes('another site') ||
            longReasonText.includes('Blatantly')) {
            return;
        }
        const siteSpecificCloseReasonId = Number(radio.value);
        // The VTC container text needs to be **short**. Take no more than 30 characters, stopping right before a space.
        // User can adjust wording themselves later.
        const reasonText = thisSiteShortReasons[i] || longReasonText.match(/.{1,29}\S(?= |$)/)[0];
        siteSpecificCloseReasons.push({ siteSpecificCloseReasonId, longReasonText, reasonText });
    });
    settings_1.saveNewSettings(siteSpecificCloseReasons);
    createInterface();
};


/***/ }),

/***/ "./src/settings.ts":
/*!*************************!*\
  !*** ./src/settings.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.saveSettings = exports.saveNewSettings = exports.getSettings = void 0;
exports.getSettings = () => JSON.parse(localStorage.cpUserscriptOneClickVTCSettings);
exports.saveNewSettings = (siteSpecificCloseReasons) => {
    localStorage.cpUserscriptOneClickVTCSettings = JSON.stringify({
        siteSpecificCloseReasons,
        downvoteCondition: 'Non-dupes only',
        raisedCloseFlags: [],
    });
};
exports.saveSettings = (partialNewSettings) => {
    // Overwrite some properties of the existing settings:
    const oldSettings = exports.getSettings();
    const newSettings = Object.assign({}, oldSettings, partialNewSettings);
    localStorage.cpUserscriptOneClickVTCSettings = JSON.stringify(newSettings);
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
exports.showOkButtonWhenHovered = void 0;
const haveVotedOnQuestion_1 = __webpack_require__(/*! ./haveVotedOnQuestion */ "./src/haveVotedOnQuestion.ts");
const settings_1 = __webpack_require__(/*! ./settings */ "./src/settings.ts");
const tryShowButton = (textContainer, okButton) => {
    // If user never auto-votes when voting to close, showing the button only adds confusing and useless noise
    const { downvoteCondition } = settings_1.getSettings();
    if (downvoteCondition === 'Never' || (downvoteCondition === 'Non-dupes only' && textContainer.dataset.closeReasonId === 'Duplicate')) {
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
exports.tryVoteCloseWhenSEReady = void 0;
const haveVotedOnQuestion_1 = __webpack_require__(/*! ../haveVotedOnQuestion */ "./src/haveVotedOnQuestion.ts");
const openDuplicateModal_1 = __webpack_require__(/*! ./openDuplicateModal */ "./src/tryVoteClose/openDuplicateModal.ts");
const submitCloseVote_1 = __webpack_require__(/*! ./submitCloseVote */ "./src/tryVoteClose/submitCloseVote.ts");
const settings_1 = __webpack_require__(/*! ../settings */ "./src/settings.ts");
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
    const { downvoteCondition } = settings_1.getSettings();
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
exports.makeHandleCloseVoteResponse = void 0;
const showToast_1 = __webpack_require__(/*! ../../../common/showToast */ "../common/showToast.ts");
const settings_1 = __webpack_require__(/*! ../settings */ "./src/settings.ts");
exports.makeHandleCloseVoteResponse = (questionId, setCanSendRequestToTrue) => (result) => {
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
    const downvoteButton = document.querySelector('.question .js-vote-down-btn');
    // In very rare cases, this element will still have the attribute
    // (perhaps if they clicked to close, then moved mouse out and back in before response is received)
    downvoteButton.removeAttribute('data-cpuserscript-one-click-vtc-imminent-downvote');
    const oneClickVTCContainer = document.querySelector('[data-cpuserscript-one-click-vtc]');
    oneClickVTCContainer.remove();
    updateCloseVoteCount(result);
    if (window.StackExchange.options.user.rep < 3000) {
        /* User flagged to close, but did not vote to close
         * If someone has the VTC privilege, it's easy to determine, on pageload, if they've already VTC'd
         * by examining the .close-question-link title
         * Doesn't look like there's anything similar for flags without actually opening the close dialog,
         * so save close flags in Local Storage instead
         */
        const { raisedCloseFlags } = settings_1.getSettings();
        raisedCloseFlags.push(questionId);
        // Only need to keep recent-ish raisedCloseFlags in Local Storage:
        if (raisedCloseFlags.length > 100) {
            settings_1.saveSettings({ raisedCloseFlags: raisedCloseFlags.slice(-100) });
        }
        settings_1.saveSettings({ raisedCloseFlags });
    }
};
const updateCloseVoteCount = (result) => {
    const { updateCloseLinkCount } = window.StackExchange.vote_closingAndFlagging;
    const haveSEUpdateCloseLinkCount = () => {
        updateCloseLinkCount(result, window.$('.close-question-link'));
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
exports.openDuplicateModal = void 0;
exports.openDuplicateModal = () => {
    document.querySelector('.close-question-link').click();
    const handler = (_event, _jqXHR, ajaxOptions) => {
        if (!ajaxOptions.url || !/\/flags\/questions\/\d+\/close\/popup/.test(ajaxOptions.url)) {
            return;
        }
        const duplicateRadio = document.querySelector('#closeReasonId-Duplicate');
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
exports.submitCloseVote = exports.getCanSendRequest = void 0;
const makeHandleCloseVoteResponse_1 = __webpack_require__(/*! ./makeHandleCloseVoteResponse */ "./src/tryVoteClose/makeHandleCloseVoteResponse.ts");
const showToast_1 = __webpack_require__(/*! ../../../common/showToast */ "../common/showToast.ts");
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
    const questionId = Number(window.location.href.match(/\d+/)[0]);
    const url = `${window.location.origin}/flags/questions/${questionId}/close/add`;
    canSendRequest = false;
    fetch(url, initOptions)
        .then(res => res.json())
        .then(makeHandleCloseVoteResponse_1.makeHandleCloseVoteResponse(questionId, setCanSendRequestToTrue))
        .catch((error) => {
        canSendRequest = true;
        // tslint:disable-next-line: no-console
        console.error(error);
        showToast_1.showToastError('Stack One Click VTC: An error occurred while trying to vote, see console for details');
    });
};


/***/ }),

/***/ "./src/watchForInterfaceHover.ts":
/*!***************************************!*\
  !*** ./src/watchForInterfaceHover.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.watchForInterfaceHover = void 0;
const settings_1 = __webpack_require__(/*! ./settings */ "./src/settings.ts");
const showOptionContainer = (optionContainer) => {
    if (optionContainer.style.visibility === 'visible') {
        return;
    }
    optionContainer.style.visibility = 'visible';
    const buttons = [...optionContainer.children[1].children];
    const { downvoteCondition } = settings_1.getSettings();
    const currentButton = buttons.find(button => button.textContent === downvoteCondition);
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
        settings_1.saveSettings({ downvoteCondition: target.textContent });
    });
};
exports.watchForInterfaceHover = (vtcContainer) => {
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

/***/ "./src/watchForReset.ts":
/*!******************************!*\
  !*** ./src/watchForReset.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.watchForReset = void 0;
const showToast_1 = __webpack_require__(/*! ../../common/showToast */ "../common/showToast.ts");
exports.watchForReset = (vtcContainer) => {
    const button = vtcContainer.querySelector('button');
    button.addEventListener('click', () => {
        delete localStorage.cpUserscriptOneClickVTCSettings;
        vtcContainer.remove();
        showToast_1.showToastError('Cleared, refresh the page');
    });
};


/***/ }),

/***/ "./src/watchForSiteSpecificEdits.ts":
/*!******************************************!*\
  !*** ./src/watchForSiteSpecificEdits.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.watchForSiteSpecificEdits = void 0;
const settings_1 = __webpack_require__(/*! ./settings */ "./src/settings.ts");
/**
 * When user right-clicks on a Site Specific reason, replace it with an input.
 * When enter is pressed, save the new text for that reason in Local Storage
 */
exports.watchForSiteSpecificEdits = (vtcContainer) => {
    vtcContainer.addEventListener('contextmenu', (rightClickEvent) => {
        const originalDiv = rightClickEvent.target;
        if (!originalDiv.matches('h3 + div > [data-close-reason-id]')) {
            return;
        }
        rightClickEvent.preventDefault();
        const input = document.createElement('input');
        const originalText = originalDiv.textContent;
        input.value = originalText;
        input.maxLength = 35;
        input.title = originalDiv.title;
        // Hide the OK button while editing:
        originalDiv.dispatchEvent(new Event('mouseleave'));
        originalDiv.replaceWith(input);
        input.focus();
        input.addEventListener('keyup', (keyupEvent) => {
            if (keyupEvent.key !== 'Enter') {
                return;
            }
            originalDiv.textContent = input.value;
            input.replaceWith(originalDiv);
            const { siteSpecificCloseReasons } = settings_1.getSettings();
            const closeObj = siteSpecificCloseReasons.find(({ reasonText }) => reasonText === originalText);
            if (closeObj) {
                // This should exist 99.9% of the time
                closeObj.reasonText = input.value;
                settings_1.saveSettings({ siteSpecificCloseReasons });
            }
        });
    });
};


/***/ })

/******/ });