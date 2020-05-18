// ==UserScript==
// @name             Stack Speak New Questions
// @description      Speaks new question titles aloud as they come in
// @author           CertainPerformance
// @namespace        https://github.com/CertainPerformance/Stack-Exchange-Userscripts
// @version          1.0.2
// @include          /^https://(?:[^/]+\.)?(?:(?:stackoverflow|serverfault|superuser|stackexchange|askubuntu|stackapps)\.com|mathoverflow\.net)/questions(?:/\d+|$|\?tab=Newest$|/tagged/.*sort=newest)/
// @include          /^https://example\.com/fakepage$/
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

/***/ "./src/handleFakePage.ts":
/*!*******************************!*\
  !*** ./src/handleFakePage.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Runs on example.com inside an iframe in a Newest tab to allow for communication between different SE domains
 */
exports.handleFakePage = () => {
    // See setupCrossDomainCommunication for detailed description
    if (window.top === window) {
        return;
    }
    const channel = new BroadcastChannel('cpUserscriptSpeakNewQuestionsCrossDomain');
    channel.addEventListener('message', ({ data }) => {
        if (!String(data).startsWith('cpUserscriptSpeakNewQuestionsCrossDomain: ')) {
            return;
        }
        window.top.postMessage(data, '*');
    });
    window.addEventListener('message', (messageEvent) => {
        const data = String(messageEvent.data);
        if (!data.startsWith('cpUserscriptSpeakNewQuestionsCrossDomain: ')) {
            return;
        }
        channel.postMessage(data);
    });
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
const questionListPage_1 = __webpack_require__(/*! ./questionListPage */ "./src/questionListPage/index.ts");
const questionPage_1 = __webpack_require__(/*! ./questionPage */ "./src/questionPage/index.ts");
const handleFakePage_1 = __webpack_require__(/*! ./handleFakePage */ "./src/handleFakePage.ts");
if (window.location.href === 'https://example.com/fakepage') {
    handleFakePage_1.handleFakePage();
}
else if (/\/questions\/\d+/.test(window.location.href)) {
    questionPage_1.handleQuestionPage();
}
else {
    questionListPage_1.handleQuestionListPage();
}


/***/ }),

/***/ "./src/pendingQuestionColor.ts":
/*!*************************************!*\
  !*** ./src/pendingQuestionColor.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.pendingQuestionColor = (() => {
    if (window.location.href === 'https://example.com/fakepage') {
        // Export won't be used
        return '';
    }
    return document.body.matches('.theme-dark')
        ? '#404000'
        : 'yellow';
})();


/***/ }),

/***/ "./src/questionListPage/addBorderWhenClicked.ts":
/*!******************************************************!*\
  !*** ./src/questionListPage/addBorderWhenClicked.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Give visual indication of having visited a question
exports.addBorderWhenClicked = (questionDiv) => {
    questionDiv.querySelector('.question-hyperlink').addEventListener('click', () => {
        questionDiv.style.borderRight = '4px solid blue';
    });
};


/***/ }),

/***/ "./src/questionListPage/checkNewQuestions.ts":
/*!***************************************************!*\
  !*** ./src/questionListPage/checkNewQuestions.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const queueUtterance_1 = __webpack_require__(/*! ./queueUtterance */ "./src/questionListPage/queueUtterance.ts");
const state_1 = __webpack_require__(/*! ./state */ "./src/questionListPage/state.ts");
const targetBlankAllAnchors_1 = __webpack_require__(/*! ./targetBlankAllAnchors */ "./src/questionListPage/targetBlankAllAnchors.ts");
const addBorderWhenClicked_1 = __webpack_require__(/*! ./addBorderWhenClicked */ "./src/questionListPage/addBorderWhenClicked.ts");
const temporarilyPreventClicks_1 = __webpack_require__(/*! ./temporarilyPreventClicks */ "./src/questionListPage/temporarilyPreventClicks.ts");
const pendingQuestionColor_1 = __webpack_require__(/*! ../pendingQuestionColor */ "./src/pendingQuestionColor.ts");
const seenQuestionsIds = new Set([...document.querySelectorAll('#questions > div.question-summary')].map(({ id }) => id));
const watchedTags = ((_a = document.querySelector('#search input')) === null || _a === void 0 ? void 0 : _a.value.match(/[^\[\]]+(?=\])/g)) || [];
const questionTagCountsLeftById = {};
const siteName = window.location.href === 'https://example.com/fakepage' ? '' : window.StackExchange.options.site.name;
const siteNameSpokenText = siteName === 'Stack Overflow' ? '' : `${siteName}, `;
exports.checkNewQuestions = () => {
    temporarilyPreventClicks_1.temporarilyPreventClicks();
    [...document.querySelectorAll('#questions > div.question-summary')]
        .filter(questionDiv => !seenQuestionsIds.has(questionDiv.id))
        .forEach((questionDiv) => {
        targetBlankAllAnchors_1.targetBlankAllAnchors(questionDiv);
        const { focusing } = state_1.getState();
        // New question divs that have not been spoken yet will be highlighted yellow
        // But these divs may get removed and replaced with copies before being passed to queueUtterance (see below)
        // For style consistency while the divs are appearing, highlight them immediately
        if (!focusing) {
            questionDiv.style.backgroundColor = pendingQuestionColor_1.pendingQuestionColor;
        }
        /* StackExchange will send the client new info about an active question *for every question, and for every tag in that question* that you're watching
         * Eg if you're watching 5 tags, and a question is posted with 3 of them, the websocket will send you info 3 times
         * (there may be a moderate fraction of a second delay between each)
         * and each time, if the existing question div is already in the document, it will be completely removed and replaced
         * See: https://dev.stackoverflow.com/content//Js/full.en.js
         * search for: $('#question-summary-' + activeq.id).remove();
         * Rather than fiddling with the element (and with the styles added by the userscript, and with the linked audio) every time it gets replaced
         * just wait for the question to appear in the questions list for the nth time, where n is the number of watched tags that question has
         * Only on that nth time does the code below result in the questionDiv actually getting changed, watched, and linked to the utterance that gets queued
         */
        const questionId = questionDiv.id;
        if (!questionTagCountsLeftById.hasOwnProperty(questionId)) {
            const watchedTagCountForThisQuestion = Array.from(questionDiv.querySelectorAll('.tags > a'), a => a.textContent)
                .reduce((a, tag) => a + Number(watchedTags.includes(tag)), 0);
            questionTagCountsLeftById[questionId] = watchedTagCountForThisQuestion;
        }
        questionTagCountsLeftById[questionId] -= 1;
        // User may not be watching any tags - may be just on /questions?tab=Newest page
        // in which case there's nothing to count, and only one socket message per question, so queue the question immediately
        if (watchedTags.length && questionTagCountsLeftById[questionId] !== 0) {
            return;
        }
        seenQuestionsIds.add(questionId);
        addBorderWhenClicked_1.addBorderWhenClicked(questionDiv);
        if (focusing) {
            return;
        }
        const questionText = questionDiv.querySelector('.question-hyperlink').textContent;
        const questionTags = [...questionDiv.querySelectorAll('.tags > a')]
            .map(tagA => tagA.textContent.replace(/\./g, ' dot '));
        const textToSpeak = `Question, ${siteNameSpokenText} ${questionText} ---- ${questionTags.join(', ')}`;
        queueUtterance_1.queueUtterance(textToSpeak, questionId);
    });
};


/***/ }),

/***/ "./src/questionListPage/clearInterfaceOnDuplicatePageload.ts":
/*!*******************************************************************!*\
  !*** ./src/questionListPage/clearInterfaceOnDuplicatePageload.ts ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.clearInterfaceOnDuplicatePageload = (channel, speakInterface) => {
    // Tell question pages that a new list page is active
    channel.postMessage('New Newest page');
    channel.addEventListener('message', ({ data }) => {
        if (data === 'New Newest page') {
            // This is a Newest list page, but another Newest page has been opened
            // This page is now obsolete
            speakInterface.textContent = 'Use more recent newest tab';
            channel.close();
        }
    });
};


/***/ }),

/***/ "./src/questionListPage/hideNewPostActivity.ts":
/*!*****************************************************!*\
  !*** ./src/questionListPage/hideNewPostActivity.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// The new post activity element will be clicked on automatically in watchNewQuestions.
// Its frequent appearance and disappearance will only cause disorienting vertical jiggle of the question list, so remove it.
Object.defineProperty(exports, "__esModule", { value: true });
exports.hideNewPostActivity = () => {
    document.querySelector('#questions').appendChild(document.createElement('style')).textContent = `
        .js-new-post-activity {
            display: none;
        }
    `;
};


/***/ }),

/***/ "./src/questionListPage/index.ts":
/*!***************************************!*\
  !*** ./src/questionListPage/index.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const makeSpeakInterface_1 = __webpack_require__(/*! ./makeSpeakInterface */ "./src/questionListPage/makeSpeakInterface.ts");
const showSpeechSynthesisReadyness_1 = __webpack_require__(/*! ./showSpeechSynthesisReadyness */ "./src/questionListPage/showSpeechSynthesisReadyness.ts");
const speakOnNewMessage_1 = __webpack_require__(/*! ./speakOnNewMessage */ "./src/questionListPage/speakOnNewMessage.ts");
const targetBlankAllAnchors_1 = __webpack_require__(/*! ./targetBlankAllAnchors */ "./src/questionListPage/targetBlankAllAnchors.ts");
const watchNewQuestions_1 = __webpack_require__(/*! ./watchNewQuestions */ "./src/questionListPage/watchNewQuestions.ts");
const hideNewPostActivity_1 = __webpack_require__(/*! ./hideNewPostActivity */ "./src/questionListPage/hideNewPostActivity.ts");
const setupBroadcastChannelForFocusOnQuestionList_1 = __webpack_require__(/*! ./setupBroadcastChannelForFocusOnQuestionList */ "./src/questionListPage/setupBroadcastChannelForFocusOnQuestionList.ts");
const addBorderWhenClicked_1 = __webpack_require__(/*! ./addBorderWhenClicked */ "./src/questionListPage/addBorderWhenClicked.ts");
const clearInterfaceOnDuplicatePageload_1 = __webpack_require__(/*! ./clearInterfaceOnDuplicatePageload */ "./src/questionListPage/clearInterfaceOnDuplicatePageload.ts");
exports.handleQuestionListPage = () => {
    /* URL will be like one of
     * https://stackoverflow.com/questions/tagged/someTag?sort=newest
     * https://stackoverflow.com/questions?tab=Newest
     * https://stackoverflow.com/questions
     * If on /questions, need to check that we're on a Newest tab,
     * not on one of the others like Active or Unanswered
     */
    if (window.location.pathname === '/questions' && !document.querySelector('.is-selected[href="/questions?tab=Newest"]')) {
        return;
    }
    // This channel will allow Newest pages to communicate new questions to question pages
    // and for question pages to communicate to Newest pages when an utterance gets canceled
    // and for all pages to communicate with each other when their Focus button is clicked
    const channel = new BroadcastChannel('cpUserscriptSpeakNewQuestions');
    const speakInterface = makeSpeakInterface_1.makeSpeakInterface();
    clearInterfaceOnDuplicatePageload_1.clearInterfaceOnDuplicatePageload(channel, speakInterface);
    const focusButton = speakInterface.querySelector('button');
    if (focusButton) {
        setupBroadcastChannelForFocusOnQuestionList_1.setupBroadcastChannelForFocusOnQuestionList(channel, focusButton);
    }
    showSpeechSynthesisReadyness_1.showSpeechSynthesisReadyness();
    speakOnNewMessage_1.speakOnNewMessage();
    watchNewQuestions_1.watchNewQuestions(channel, speakInterface);
    targetBlankAllAnchors_1.targetBlankAllAnchors(document.body);
    for (const questionDiv of document.querySelectorAll('#questions > .question-summary')) {
        addBorderWhenClicked_1.addBorderWhenClicked(questionDiv);
    }
    hideNewPostActivity_1.hideNewPostActivity();
    // Rarely, speechSynthesis will get stuck on pageload due to prior speaking events, so cancel them
    speechSynthesis.cancel();
};


/***/ }),

/***/ "./src/questionListPage/makeSpeakInterface.ts":
/*!****************************************************!*\
  !*** ./src/questionListPage/makeSpeakInterface.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const queueUtterance_1 = __webpack_require__(/*! ./queueUtterance */ "./src/questionListPage/queueUtterance.ts");
const state_1 = __webpack_require__(/*! ./state */ "./src/questionListPage/state.ts");
const settings_1 = __webpack_require__(/*! ./settings */ "./src/questionListPage/settings.ts");
const makeVoicesSelect_1 = __webpack_require__(/*! ./makeVoicesSelect */ "./src/questionListPage/makeVoicesSelect.ts");
exports.makeSpeakInterface = () => {
    const questions = document.querySelector('#questions');
    const speakInterface = document.querySelector('#mainbar').insertBefore(document.createElement('div'), questions);
    speakInterface.style.cssText = 'text-align: center; background-color: var(--blue-200); font-size: large;';
    const { volume, rate } = settings_1.getSettings();
    state_1.assignState({ volume, rate });
    speakInterface.innerHTML = `
        <div>Listening for new questions...</div>
        <div style="display: flex; justify-content: center;">
            <span style="width: 65px; text-align: right; margin-right: 5px;">Volume:</span>
            <input type="range" min="0" max="1" step="0.1" value="${volume}" title="${volume}" data-setting-prop="volume" style="margin: 0;"></div>
        </div>
        <div style="display: flex; justify-content: center;">
            <span style="width: 65px; text-align: right; margin-right: 5px;">Rate:</span>
            <input type="range" min="0.25" max="4" step="0.05" value="${rate}" title="${rate}" data-setting-prop="rate" style="margin: 0;"></div>
        </div>
    `;
    makeVoicesSelect_1.makeVoicesSelect(speakInterface);
    speakInterface.addEventListener('change', (e) => {
        const target = e.target;
        if (target.matches('select')) {
            queueUtterance_1.queueUtterance('Example question title');
            return;
        }
        const input = target;
        const partialObj = { [input.dataset.settingProp]: Number(input.value) };
        settings_1.saveSettings(partialObj);
        state_1.assignState(partialObj);
        queueUtterance_1.queueUtterance('Example question title');
        input.title = input.value;
    });
    if (window.StackExchange.options.site.name !== 'Stack Overflow') {
        return speakInterface;
    }
    speakInterface.insertAdjacentHTML('beforeend', `
        <button>Start Focusing</button>
        <div></div>
    `);
    const questionFrequencyDiv = speakInterface.children[5];
    const elmToTimestamp = (elm) => new Date(elm.title).getTime();
    const updateQuestionFrequencyStats = () => {
        const now = new Date().getTime();
        const timeElms = [...document.querySelectorAll('#questions .relativetime')];
        const questionCountLastHour = timeElms.reduce((a, elm) => a + Number(now - elmToTimestamp(elm) < 3600000), 0);
        const sinceEarliestQuestion = now - elmToTimestamp(timeElms[timeElms.length - 1]);
        const divisor = sinceEarliestQuestion < 3600000 ? sinceEarliestQuestion / 60000 : 60;
        questionFrequencyDiv.textContent = `${(questionCountLastHour / divisor).toFixed(1)} questions per minute, ${questionCountLastHour} last ${Math.round(divisor)} minutes`;
    };
    updateQuestionFrequencyStats();
    window.setInterval(updateQuestionFrequencyStats, 60000);
    return speakInterface;
};


/***/ }),

/***/ "./src/questionListPage/makeVoicesSelect.ts":
/*!**************************************************!*\
  !*** ./src/questionListPage/makeVoicesSelect.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = __webpack_require__(/*! ./state */ "./src/questionListPage/state.ts");
const settings_1 = __webpack_require__(/*! ./settings */ "./src/questionListPage/settings.ts");
const populateSelect = (select) => {
    const voices = speechSynthesis.getVoices();
    for (const voice of voices) {
        const option = select.appendChild(document.createElement('option'));
        option.textContent = voice.name;
        option.value = voice.name;
        if (!voice.localService) {
            option.style.backgroundColor = '#ffcabf';
        }
    }
    if (select.children.length === 0) {
        // No voices were found. Probably, something is currently being spoken.
        // Try again once voices change
        speechSynthesis.addEventListener('voiceschanged', () => {
            populateSelect(select);
        }, { once: true });
        return;
    }
    select.addEventListener('change', () => {
        const voice = voices.find(({ name }) => name === select.value);
        state_1.assignState({ voice });
        settings_1.saveSettings({ voiceName: voice.name });
        // This change event will bubble and be seen by parent listener
        // resulting in a queueUtterance call
    });
    const pageloadVoiceName = settings_1.getSettings().voiceName;
    if (pageloadVoiceName) {
        select.value = pageloadVoiceName;
    }
    const pageloadVoice = voices.find(({ name }) => name === pageloadVoiceName);
    if (pageloadVoice) {
        state_1.assignState({ voice: pageloadVoice });
    }
};
exports.makeVoicesSelect = (speakInterface) => {
    const container = speakInterface.appendChild(document.createElement('div'));
    const select = container.appendChild(document.createElement('select'));
    populateSelect(select);
};


/***/ }),

/***/ "./src/questionListPage/queueUtterance.ts":
/*!************************************************!*\
  !*** ./src/questionListPage/queueUtterance.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const speakNext_1 = __webpack_require__(/*! ./speakNext */ "./src/questionListPage/speakNext.ts");
const state_1 = __webpack_require__(/*! ./state */ "./src/questionListPage/state.ts");
const pendingQuestionColor_1 = __webpack_require__(/*! ../pendingQuestionColor */ "./src/pendingQuestionColor.ts");
exports.queueUtterance = (textToSpeak, questionId) => {
    const { textToSpeakQueue } = state_1.getState();
    if (!questionId) {
        textToSpeakQueue.push({ textToSpeak });
        if (!speechSynthesis.speaking) {
            speakNext_1.speakNext();
        }
        return;
    }
    const questionElement = document.getElementById(questionId);
    const channel = state_1.getState().channel;
    if (questionElement && questionId) {
        // This will pretty much always already be highlighted, but just in case
        questionElement.style.backgroundColor = pendingQuestionColor_1.pendingQuestionColor;
        channel.postMessage({ newQuestion: true, questionOuterHTML: questionElement.outerHTML });
    }
    const mouseoverHandler = () => {
        channel.postMessage(`Done with ${questionId}`);
        const foundIndex = textToSpeakQueue.findIndex(item => 'questionElement' in item && item.questionElement === questionElement);
        questionElement.style.removeProperty('background-color');
        if (foundIndex !== -1) {
            // The utterance for this questionElement has not been spoken, so just removing it from the array is enough
            textToSpeakQueue.splice(foundIndex, 1);
            return;
        }
        // The utterance for this element is currently being spoken, and must be canceled
        speechSynthesis.cancel();
        if (textToSpeakQueue.length) {
            speakNext_1.speakNext();
        }
    };
    if (questionElement) {
        questionElement.addEventListener('mouseover', mouseoverHandler, { once: true });
    }
    textToSpeakQueue.push({ textToSpeak, questionElement, mouseoverHandler });
    if (!speechSynthesis.speaking) {
        speakNext_1.speakNext();
    }
};


/***/ }),

/***/ "./src/questionListPage/settings.ts":
/*!******************************************!*\
  !*** ./src/questionListPage/settings.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
let settings = localStorage.cpUserscriptSpeakNewQuestions
    ? JSON.parse(localStorage.cpUserscriptSpeakNewQuestions)
    : {
        rate: 2,
        voiceName: '',
        volume: 1,
    };
exports.getSettings = () => settings;
exports.saveSettings = (partialNewSettings) => {
    settings = Object.assign({}, settings, partialNewSettings);
    localStorage.cpUserscriptSpeakNewQuestions = JSON.stringify(settings);
};


/***/ }),

/***/ "./src/questionListPage/setupBroadcastChannelForFocusOnQuestionList.ts":
/*!*****************************************************************************!*\
  !*** ./src/questionListPage/setupBroadcastChannelForFocusOnQuestionList.ts ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = __webpack_require__(/*! ./state */ "./src/questionListPage/state.ts");
const setupFocusButtonInterval_1 = __webpack_require__(/*! ../setupFocusButtonInterval */ "./src/setupFocusButtonInterval.ts");
exports.setupBroadcastChannelForFocusOnQuestionList = (channel, focusButton) => {
    // Reset question page focus countdowns, and display the question page focus button if not visible yet
    channel.postMessage('Focus Until 0');
    const setStateFocusingFalse = () => {
        state_1.assignState({ focusing: false });
    };
    const { makeNewInterval, stopInterval, getStopFocusingAfter } = setupFocusButtonInterval_1.setupFocusButtonInterval(focusButton, setStateFocusingFalse);
    const handleMessage = (message) => {
        if (message.startsWith('Cancel')) {
            const id = message.match(/^Cancel (.+)/)[1];
            const questionElement = document.getElementById(id);
            if (questionElement) {
                questionElement.dispatchEvent(new Event('mouseover'));
            }
        }
        if (message === 'Status?' || message === 'Focus On') {
            if (message === 'Focus On') {
                makeNewInterval(Date.now() + 300000);
                state_1.assignState({ focusing: true, textToSpeakQueue: [] });
                speechSynthesis.cancel();
                for (const questionDiv of document.querySelectorAll('.question-summary')) {
                    questionDiv.style.removeProperty('background-color');
                }
            }
            channel.postMessage(`Focus Until ${getStopFocusingAfter()}`);
        }
        // Can be sent by any page
        if (message === 'Focus Off') {
            stopInterval();
            state_1.assignState({ focusing: false });
        }
    };
    channel.addEventListener('message', ({ data: message }) => {
        if (typeof message === 'string') {
            handleMessage(message);
        }
    });
    focusButton.addEventListener('click', () => {
        if (focusButton.textContent === 'Start Focusing') {
            handleMessage('Focus On');
        }
        else {
            handleMessage('Focus Off');
            channel.postMessage('Focus Off');
        }
    });
    return channel;
};


/***/ }),

/***/ "./src/questionListPage/setupCrossDomainCommunication.ts":
/*!***************************************************************!*\
  !*** ./src/questionListPage/setupCrossDomainCommunication.ts ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.setupCrossDomainCommunication = () => {
    /* This enables the userscript on different Newest tabs to communicate despite being on different domains
     * Each Newest tab will create an iframe to example.com
     * To communicate, the Newest tab will post a message to the iframe
     * The userscript running on example.com in the iframe will see the message
     * and relay it over a BroadcastChannel
     * All other example.com iframes will see the channel message
     * and can relay it up to their parent Newest pages using postMessage
     * See https://stackoverflow.com/a/61052335
     */
    const iframe = document.body.appendChild(document.createElement('iframe'));
    iframe.src = 'https://example.com/fakepage';
    iframe.style.display = 'none';
    window.addEventListener('message', (messageEvent) => {
        if (messageEvent.origin !== 'https://example.com') {
            return;
        }
        const data = String(messageEvent.data);
        if (!data.startsWith('cpUserscriptSpeakNewQuestionsCrossDomain: ')) {
            return;
        }
        const message = data.match(/: (.*)/)[1];
        for (const callback of onMessageCallbacks) {
            callback(message);
        }
    });
    const onMessageCallbacks = new Set();
    return {
        addMessageListener(callback) {
            onMessageCallbacks.add(callback);
        },
        removeMessageListener(callback) {
            onMessageCallbacks.delete(callback);
        },
        postMessage(message) {
            var _a;
            (_a = iframe.contentWindow) === null || _a === void 0 ? void 0 : _a.postMessage(`cpUserscriptSpeakNewQuestionsCrossDomain: ${message}`, '*');
        },
    };
};


/***/ }),

/***/ "./src/questionListPage/showSpeechSynthesisReadyness.ts":
/*!**************************************************************!*\
  !*** ./src/questionListPage/showSpeechSynthesisReadyness.ts ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const pendingQuestionColor_1 = __webpack_require__(/*! ../pendingQuestionColor */ "./src/pendingQuestionColor.ts");
exports.showSpeechSynthesisReadyness = () => {
    /* One user interaction required before audio can trigger by itself due to autoplay policies
     * In Chrome, one can also whitelist the site in the registry:
     * http://dev.chromium.org/administrators/policy-list-3#AutoplayWhitelist
     * In Windows:
     * Computer\HKEY_CURRENT_USER\Software\Policies\Google\Chrome\AutoplayWhitelist
     */
    document.body.style.backgroundColor = pendingQuestionColor_1.pendingQuestionColor;
    document.body.addEventListener('click', () => {
        document.body.style.removeProperty('background-color');
    }, { once: true });
};


/***/ }),

/***/ "./src/questionListPage/speakNext.ts":
/*!*******************************************!*\
  !*** ./src/questionListPage/speakNext.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = __webpack_require__(/*! ./state */ "./src/questionListPage/state.ts");
exports.speakNext = () => {
    const { textToSpeakQueue, volume, rate, voice } = state_1.getState();
    if (textToSpeakQueue.length === 0) {
        return;
    }
    const speakItem = textToSpeakQueue.shift();
    const activeUtterance = new SpeechSynthesisUtterance(speakItem.textToSpeak);
    activeUtterance.rate = rate;
    activeUtterance.volume = volume;
    if (voice) {
        activeUtterance.voice = voice;
    }
    speechSynthesis.speak(activeUtterance);
    activeUtterance.addEventListener('end', () => {
        if ('questionElement' in speakItem) {
            speakItem.questionElement.style.removeProperty('background-color');
            speakItem.questionElement.removeEventListener('mouseover', speakItem.mouseoverHandler);
            state_1.getState().channel.postMessage(`Done with ${speakItem.questionElement.id}`);
        }
        exports.speakNext();
    });
};


/***/ }),

/***/ "./src/questionListPage/speakOnNewMessage.ts":
/*!***************************************************!*\
  !*** ./src/questionListPage/speakOnNewMessage.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const queueUtterance_1 = __webpack_require__(/*! ./queueUtterance */ "./src/questionListPage/queueUtterance.ts");
const setupCrossDomainCommunication_1 = __webpack_require__(/*! ./setupCrossDomainCommunication */ "./src/questionListPage/setupCrossDomainCommunication.ts");
const pageLoadTimestamp = Date.now();
exports.speakOnNewMessage = () => {
    const crossDomainListenerObj = setupCrossDomainCommunication_1.setupCrossDomainCommunication();
    crossDomainListenerObj.addMessageListener((message) => {
        if (message === 'Page load timestamp?') {
            crossDomainListenerObj.postMessage(`Page load timestamp: ${pageLoadTimestamp}`);
        }
    });
    const unreadSpan = document.querySelector('.indicator-badge.js-unread-count');
    new MutationObserver(() => {
        /* A new inbox message was seen
         * Post a message to other Newest pages on different sites, to see if this page is the latest one open
         * If no responses with a later pageLoadTimestamp appear after 200ms, queue a Message utterance from this page
         * (On Chrome, the full process looks to take around 20ms on average, when the system isn't busy)
         * This ensures that "Message" only gets spoken once, rather than once for each Newest page that's currently open
         */
        const timeoutId = window.setTimeout(() => {
            queueUtterance_1.queueUtterance('Message');
            crossDomainListenerObj.removeMessageListener(listener);
        }, 200);
        const listener = (message) => {
            const match = message.match(/Page load timestamp: (\d+)/);
            if (!match) {
                return;
            }
            const otherTimestamp = Number(match[1]);
            if (otherTimestamp > pageLoadTimestamp) {
                window.clearTimeout(timeoutId);
                crossDomainListenerObj.removeMessageListener(listener);
            }
        };
        crossDomainListenerObj.addMessageListener(listener);
        crossDomainListenerObj.postMessage('Page load timestamp?');
    })
        .observe(unreadSpan, { childList: true });
};


/***/ }),

/***/ "./src/questionListPage/state.ts":
/*!***************************************!*\
  !*** ./src/questionListPage/state.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
let state = {
    channel: null,
    focusing: false,
    textToSpeakQueue: [],
    voice: null,
    volume: 1,
    rate: 2,
};
exports.assignState = (partialNewState) => {
    state = Object.assign({}, state, partialNewState);
};
exports.getState = () => state;


/***/ }),

/***/ "./src/questionListPage/targetBlankAllAnchors.ts":
/*!*******************************************************!*\
  !*** ./src/questionListPage/targetBlankAllAnchors.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.targetBlankAllAnchors = (parent) => {
    for (const a of parent.querySelectorAll('a[href]')) {
        a.target = '_blank';
    }
};


/***/ }),

/***/ "./src/questionListPage/temporarilyPreventClicks.ts":
/*!**********************************************************!*\
  !*** ./src/questionListPage/temporarilyPreventClicks.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
let timeoutId;
const listener = (e) => {
    const target = e.target;
    if (target.closest('#questions') && target.closest('a')) {
        e.preventDefault();
    }
};
const timeoutCallback = () => {
    window.removeEventListener('click', listener, true);
};
exports.temporarilyPreventClicks = () => {
    /* The user may occasionally click right when a new question comes in
     * resulting in them clicking on a link other than the one they intended to click
     * This prevents clicks on <a>s inside #questions for 400ms after a new question appears
     */
    window.addEventListener('click', listener, true);
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(timeoutCallback, 400);
};


/***/ }),

/***/ "./src/questionListPage/watchNewQuestions.ts":
/*!***************************************************!*\
  !*** ./src/questionListPage/watchNewQuestions.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const checkNewQuestions_1 = __webpack_require__(/*! ./checkNewQuestions */ "./src/questionListPage/checkNewQuestions.ts");
const state_1 = __webpack_require__(/*! ./state */ "./src/questionListPage/state.ts");
exports.watchNewQuestions = (channel, speakInterface) => {
    state_1.assignState({ channel });
    new MutationObserver((_, observer) => {
        if (speakInterface.textContent === 'Use more recent newest tab') {
            observer.disconnect();
            return;
        }
        /* The following element will appear immediately in response to a websocket message from SE
         * Clicking it results in an ajax request for every watched tag
         * When any request succeeds, the new question row gets inserted (removing the old row for that question if there is one)
         */
        const newPostActivity = document.querySelector('.js-new-post-activity');
        if (newPostActivity) {
            newPostActivity.click();
        }
    }).observe(document.querySelector('#questions'), { childList: true });
    // tslint:disable-next-line: variable-name
    window.$(document).ajaxComplete((_event, _jqXHR, ajaxOptions) => {
        if (ajaxOptions && ajaxOptions.url && ajaxOptions.url.startsWith('/posts/ajax-load-realtime-list/')) {
            // By this point, a new question div will have been inserted
            checkNewQuestions_1.checkNewQuestions();
        }
    });
};


/***/ }),

/***/ "./src/questionPage/index.ts":
/*!***********************************!*\
  !*** ./src/questionPage/index.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const makeFocusButton_1 = __webpack_require__(/*! ./makeFocusButton */ "./src/questionPage/makeFocusButton.ts");
const setupBroadcastChannelForFocusOnQuestion_1 = __webpack_require__(/*! ./setupBroadcastChannelForFocusOnQuestion */ "./src/questionPage/setupBroadcastChannelForFocusOnQuestion.ts");
exports.handleQuestionPage = () => {
    const focusButton = makeFocusButton_1.makeFocusButton();
    setupBroadcastChannelForFocusOnQuestion_1.setupBroadcastChannelForFocusOnQuestion(focusButton);
};


/***/ }),

/***/ "./src/questionPage/insertQuestionDiv.ts":
/*!***********************************************!*\
  !*** ./src/questionPage/insertQuestionDiv.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const removeLastQuestionDivAfterDebounce_1 = __webpack_require__(/*! ./removeLastQuestionDivAfterDebounce */ "./src/questionPage/removeLastQuestionDivAfterDebounce.ts");
const makeQuestionContainer_1 = __webpack_require__(/*! ./makeQuestionContainer */ "./src/questionPage/makeQuestionContainer.ts");
const pendingQuestionColor_1 = __webpack_require__(/*! ../pendingQuestionColor */ "./src/pendingQuestionColor.ts");
let questionContainer;
const mouseoverHandlersByQuestionDiv = new Map();
exports.insertQuestionDiv = (questionOuterHTML, channel) => {
    if (!questionContainer) {
        questionContainer = makeQuestionContainer_1.makeQuestionContainer();
        if (!questionContainer) {
            // Could not make container: return. Can try to make container next time insertQuestionDiv called.
            return;
        }
        removeLastQuestionDivAfterDebounce_1.watchForMouseMovementInQuestionContainer(questionContainer);
    }
    questionContainer.insertAdjacentHTML('afterbegin', questionOuterHTML);
    const questionDiv = questionContainer.firstElementChild;
    questionDiv.removeAttribute('style');
    questionDiv.style.backgroundColor = pendingQuestionColor_1.pendingQuestionColor;
    /* If the list page closes, it can't communicate to the question pages in time to stop highlighting and remove questionDivs
     * So, remove the background color automatically after 20 seconds, to ensure the questionDiv will disappear
     */
    const mouseoverHandler = () => {
        channel.postMessage(`Cancel ${questionDiv.id}`);
        questionDiv.style.removeProperty('background-color');
        removeLastQuestionDivAfterDebounce_1.removeLastQuestionDivAfterDebounce();
    };
    questionDiv.addEventListener('mouseover', mouseoverHandler, { once: true });
    mouseoverHandlersByQuestionDiv.set(questionDiv, mouseoverHandler);
    window.setTimeout(mouseoverHandler, 20000);
};
exports.tryUnhighlightQuestionDiv = (questionId) => {
    if (!questionContainer) {
        return;
    }
    removeLastQuestionDivAfterDebounce_1.removeLastQuestionDivAfterDebounce();
    const questionDiv = [...questionContainer.children].find(({ id }) => id === questionId);
    if (questionDiv) {
        questionDiv.style.removeProperty('background-color');
        const mouseoverHandler = mouseoverHandlersByQuestionDiv.get(questionDiv);
        questionDiv.removeEventListener('mouseover', mouseoverHandler);
    }
};


/***/ }),

/***/ "./src/questionPage/makeFocusButton.ts":
/*!*********************************************!*\
  !*** ./src/questionPage/makeFocusButton.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFocusButton = () => {
    const header = document.querySelector('header');
    const focusButton = header.insertBefore(document.createElement('button'), header.children[0]);
    focusButton.style.cssText = 'position: absolute; margin-left: 10px; height: 100%; z-index: 1; display: none;';
    return focusButton;
};


/***/ }),

/***/ "./src/questionPage/makeQuestionContainer.ts":
/*!***************************************************!*\
  !*** ./src/questionPage/makeQuestionContainer.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
let questionContainer;
let haveWarned = false;
const setQuestionContainerWidth = () => {
    const container = document.querySelector('.container');
    const availableSpaceToLeftOfContent = container.getBoundingClientRect().left - 20;
    if (availableSpaceToLeftOfContent < 300) {
        if (!haveWarned) {
            haveWarned = true;
            // tslint:disable: no-console
            console.warn(`Not enough space to put Stack Speak New Questions interface to left of main content (300px required, ${Math.floor(availableSpaceToLeftOfContent)}px found)`);
            console.warn('To acquire more space, consider installing Stack Right Content: https://github.com/CertainPerformance/Stack-Exchange-Userscripts/tree/master/Right-Content');
            // tslint:enable: no-console
        }
        questionContainer.style.display = 'none';
        return;
    }
    questionContainer.style.display = 'block';
    questionContainer.style.width = `${Math.min(availableSpaceToLeftOfContent, 700)}px`;
};
exports.makeQuestionContainer = () => {
    const container = document.querySelector('.container');
    if (window.getComputedStyle(container, null).display === 'none') {
        // Main container is not visible, likely due to Stack Snippet Find userscript
        // Cannot figure out how wide the questions container should be, or even if there's enough space for it
        return;
    }
    if (document.querySelector('#left-sidebar').offsetParent !== null) {
        // tslint:disable: no-console
        console.warn('Stack Speak New Questions: Left sidebar found. This may interfere with the new questions interface.');
        console.warn('Consider disabling it at https://stackoverflow.com/users/preferences/');
        // tslint:enable: no-console
    }
    questionContainer = document.body.appendChild(document.createElement('div'));
    questionContainer.style.cssText = 'position: fixed; bottom: 0; background-color: var(--white);';
    setQuestionContainerWidth();
    window.addEventListener('resize', setQuestionContainerWidth);
    return questionContainer;
};


/***/ }),

/***/ "./src/questionPage/removeLastQuestionDivAfterDebounce.ts":
/*!****************************************************************!*\
  !*** ./src/questionPage/removeLastQuestionDivAfterDebounce.ts ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const pendingQuestionColor_1 = __webpack_require__(/*! ../pendingQuestionColor */ "./src/pendingQuestionColor.ts");
/* Remove a questionDiv once:
 * (1) the questionDiv's spoken text ended at least 10 seconds ago, and
 * (2) The mouse has not been inside the questionContainer for 10 seconds; both
 *   (a) Last mouseenter, if any, was followed by a mouseleave
 *   (b) mouseleave was at least 10 seconds ago
 */
let timeoutId = -1;
let overContainer = false;
let questionContainer;
exports.watchForMouseMovementInQuestionContainer = (questionContainerParam) => {
    questionContainer = questionContainerParam;
    questionContainer.addEventListener('mouseenter', () => {
        window.clearTimeout(timeoutId);
        overContainer = true;
    });
    questionContainer.addEventListener('mouseleave', () => {
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(removeLastQuestionDiv, 10000);
        overContainer = false;
    });
};
exports.removeLastQuestionDivAfterDebounce = () => {
    window.clearTimeout(timeoutId);
    if (!overContainer) {
        timeoutId = window.setTimeout(removeLastQuestionDiv, 10000);
    }
};
const removeLastQuestionDiv = () => {
    const questionDivs = [...questionContainer.children];
    if (!questionDivs.length || questionDivs.some(div => div.style.backgroundColor === pendingQuestionColor_1.pendingQuestionColor)) {
        return;
    }
    questionContainer.lastElementChild.remove();
    timeoutId = window.setTimeout(removeLastQuestionDiv, 10000);
};


/***/ }),

/***/ "./src/questionPage/setupBroadcastChannelForFocusOnQuestion.ts":
/*!*********************************************************************!*\
  !*** ./src/questionPage/setupBroadcastChannelForFocusOnQuestion.ts ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const insertQuestionDiv_1 = __webpack_require__(/*! ./insertQuestionDiv */ "./src/questionPage/insertQuestionDiv.ts");
const setupFocusButtonInterval_1 = __webpack_require__(/*! ../setupFocusButtonInterval */ "./src/setupFocusButtonInterval.ts");
exports.setupBroadcastChannelForFocusOnQuestion = (focusButton) => {
    const channel = new BroadcastChannel('cpUserscriptSpeakNewQuestions');
    // On a question page, only show the focus button if/once the list page is active
    // If already active, it will respond to the below message
    channel.postMessage('Status?');
    const channelListener = ({ data: message }) => {
        if (String(message).includes('Until')) {
            focusButton.style.display = 'block';
            channel.removeEventListener('message', channelListener);
        }
    };
    channel.addEventListener('message', channelListener);
    const { makeNewInterval, stopInterval } = setupFocusButtonInterval_1.setupFocusButtonInterval(focusButton);
    channel.addEventListener('message', ({ data: messageAny }) => {
        const message = messageAny;
        if (typeof message === 'object' && message !== null && message.hasOwnProperty('newQuestion')) {
            const { questionOuterHTML } = message;
            insertQuestionDiv_1.insertQuestionDiv(questionOuterHTML, channel);
        }
        if (typeof message !== 'string') {
            return;
        }
        if (message.startsWith('Done with')) {
            insertQuestionDiv_1.tryUnhighlightQuestionDiv(message.match(/^Done with (.+)/)[1]);
        }
        // Can be sent by any page, will be received by any page
        if (message === 'Focus Off') {
            stopInterval();
        }
        // Can only be sent by list page, will only be received by question page
        if (message.includes('Until')) {
            const match = message.match(/^Focus Until (\d+)$/);
            makeNewInterval(Number(match[1]));
        }
    });
    focusButton.addEventListener('click', () => {
        if (focusButton.textContent === 'Start Focusing') {
            channel.postMessage('Focus On');
        }
        else {
            channel.postMessage('Focus Off');
            stopInterval();
        }
    });
};


/***/ }),

/***/ "./src/setupFocusButtonInterval.ts":
/*!*****************************************!*\
  !*** ./src/setupFocusButtonInterval.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.setupFocusButtonInterval = (focusButton, setStateFocusingFalse) => {
    let intervalId;
    let stopFocusingAfter = 0;
    const intervalCallback = () => {
        const secsLeft = Math.round((stopFocusingAfter - Date.now()) / 1000);
        if (secsLeft > 0) {
            focusButton.textContent = `Focusing for ${Math.floor(secsLeft / 60)}:${String(secsLeft % 60).padStart(2, '0')}`;
        }
        else {
            focusButton.textContent = 'Start Focusing';
            window.clearInterval(intervalId);
            if (setStateFocusingFalse) {
                setStateFocusingFalse();
            }
        }
    };
    const makeNewInterval = (newStopFocusingAfter) => {
        stopFocusingAfter = newStopFocusingAfter;
        window.clearInterval(intervalId); // There almost certainly won't be an interval running, but just in case
        intervalId = window.setInterval(intervalCallback, 1000);
        intervalCallback();
    };
    const stopInterval = () => {
        stopFocusingAfter = 0;
        window.clearInterval(intervalId);
        focusButton.textContent = 'Start Focusing';
    };
    const getStopFocusingAfter = () => stopFocusingAfter;
    return { makeNewInterval, stopInterval, getStopFocusingAfter };
};


/***/ })

/******/ });