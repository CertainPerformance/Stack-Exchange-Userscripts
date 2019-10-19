// ==UserScript==
// @name             Stack Three Columns
// @description      When answering or editing, displays the question page, post textarea, and post preview in side-by-side columns
// @author           CertainPerformance
// @namespace        https://github.com/CertainPerformance/Stack-Exchange-Userscripts
// @version          1.0.0
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./build/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./build/addListeners.js":
/*!*******************************!*\
  !*** ./build/addListeners.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const attachListenersAndOpen3ColLayoutOnTextareaFocus_1 = __webpack_require__(/*! ./attachListenersAndOpen3ColLayoutOnTextareaFocus */ "./build/attachListenersAndOpen3ColLayoutOnTextareaFocus/index.js");
const closeLayoutWhenClickOnCloseOrPendingEdit_1 = __webpack_require__(/*! ./closeLayoutWhenClickOnCloseOrPendingEdit */ "./build/closeLayoutWhenClickOnCloseOrPendingEdit.js");
const closeTopbarWhenClickingPreview_1 = __webpack_require__(/*! ./closeTopbarWhenClickingPreview */ "./build/closeTopbarWhenClickingPreview.js");
exports.addListeners = () => {
    attachListenersAndOpen3ColLayoutOnTextareaFocus_1.attachListenersAndOpen3ColLayoutOnTextareaFocus();
    closeLayoutWhenClickOnCloseOrPendingEdit_1.closeLayoutWhenClickOnCloseOrPendingEdit();
    closeTopbarWhenClickingPreview_1.closeTopbarWhenClickingPreview();
};


/***/ }),

/***/ "./build/attachListenersAndOpen3ColLayoutOnTextareaFocus/closeLayoutIfEditCancelSucceeds.js":
/*!**************************************************************************************************!*\
  !*** ./build/attachListenersAndOpen3ColLayoutOnTextareaFocus/closeLayoutIfEditCancelSucceeds.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const closeLayout_1 = __webpack_require__(/*! ../closeLayout */ "./build/closeLayout.js");
/**
 * Close layout if user confirms (via SE's window.confirm) that they want to discard the edit
 */
exports.closeLayoutIfEditCancelSucceeds = (child) => {
    /* A dialog is about to come up asking for confirmation that the user wants to stop editing. See:
     * https://dev.stackoverflow.com/content//Js/full.en.js
     * search for: var cancelEdit = function (elem) {
     * SE's JS changes the .edit-post's handling-event data from 1 to 0 after the confirmation that an edit should be canceled
     * (On edit cancel, elements don't get removed from the DOM immediately, which is why handling-event is checked)
     */
    const $editPost = window.$(child.closest('.post-layout').querySelector('.edit-post'));
    // Give Stack Exchange's JS time to see the event, then see if the editor is still open:
    setTimeout(() => {
        if ($editPost.data('handling-event') === 0) {
            // User confirmed, they wanted to cancel the edit
            closeLayout_1.closeLayout();
        }
    });
};


/***/ }),

/***/ "./build/attachListenersAndOpen3ColLayoutOnTextareaFocus/closeLayoutOnPostEditorClose.js":
/*!***********************************************************************************************!*\
  !*** ./build/attachListenersAndOpen3ColLayoutOnTextareaFocus/closeLayoutOnPostEditorClose.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const closeLayout_1 = __webpack_require__(/*! ../closeLayout */ "./build/closeLayout.js");
const closeLayoutIfEditCancelSucceeds_1 = __webpack_require__(/*! ./closeLayoutIfEditCancelSucceeds */ "./build/attachListenersAndOpen3ColLayoutOnTextareaFocus/closeLayoutIfEditCancelSucceeds.js");
const postRootState = __webpack_require__(/*! ./postRootState */ "./build/attachListenersAndOpen3ColLayoutOnTextareaFocus/postRootState.js");
/**
 * If 3-columns layout is open for a post edit when the edit gets submitted, or when the user cancels the edit via Escape or cancel button,
 * close the layout
 */
exports.closeLayoutOnPostEditorClose = (thisPostRoot) => {
    // When edit is submitted:
    thisPostRoot.querySelector('form').addEventListener('submit', () => {
        if (postRootState.get() === thisPostRoot) {
            closeLayout_1.closeLayout();
        }
    });
    // When exiting editing via clicking "Cancel" button:
    thisPostRoot.addEventListener('click', (e) => {
        const target = e.target;
        if (target.closest('[data-three-columns-userscript-post-root]') && target.matches('.cancel-edit')) {
            closeLayoutIfEditCancelSucceeds_1.closeLayoutIfEditCancelSucceeds(target);
        }
    });
    // When exiting editing via pressing "Escape" in one of the inputs:
    const keydownHandler = (e) => {
        if (e.key !== 'Escape') {
            return;
        }
        const inputsThatTryToExitEditingWhenEscPressed = '#title, .wmd-input, #tagnames, .edit-comment';
        const target = e.target;
        if (target.matches(inputsThatTryToExitEditingWhenEscPressed) && target.closest('[data-three-columns-userscript-post-root]')) {
            closeLayoutIfEditCancelSucceeds_1.closeLayoutIfEditCancelSucceeds(target);
        }
    };
    // Must listen in capturing phase, because SE's JS will return false -> stopPropagation() in jQuery
    thisPostRoot.addEventListener('keydown', keydownHandler, true);
};


/***/ }),

/***/ "./build/attachListenersAndOpen3ColLayoutOnTextareaFocus/closeLayoutWhenPostRefreshed.js":
/*!***********************************************************************************************!*\
  !*** ./build/attachListenersAndOpen3ColLayoutOnTextareaFocus/closeLayoutWhenPostRefreshed.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const closeLayout_1 = __webpack_require__(/*! ../closeLayout */ "./build/closeLayout.js");
/**
 * If the user clicks on "An edit has been made to this post" while editing that post in 3-column layout, close the layout
 */
exports.closeLayoutWhenPostRefreshed = (newPostRoot) => {
    const clickHandler = (e) => {
        if (e.target.matches('[data-three-columns-userscript-post-root] .new-post-activity > a')) {
            closeLayout_1.closeLayout();
        }
    };
    // The site's JS will call stopPropagation on this event, so for this delegated listener to work, it must be triggered in the capturing phase
    // see function postEdit in https://dev.stackoverflow.com/content//Js/full.en.js
    newPostRoot.addEventListener('click', clickHandler, true);
};


/***/ }),

/***/ "./build/attachListenersAndOpen3ColLayoutOnTextareaFocus/createToggleButton.js":
/*!*************************************************************************************!*\
  !*** ./build/attachListenersAndOpen3ColLayoutOnTextareaFocus/createToggleButton.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const closeLayout_1 = __webpack_require__(/*! ../closeLayout */ "./build/closeLayout.js");
const postRootState = __webpack_require__(/*! ./postRootState */ "./build/attachListenersAndOpen3ColLayoutOnTextareaFocus/postRootState.js");
exports.createToggleButton = (postRootOfButton, openLayout) => {
    // Get a reference to the container that either has "Save Edits" or "Post Your Answer" button:
    const postButtomContainerSelector = postRootOfButton.matches('#post-form') ? '.form-submit' : '.post-editor ~ .grid.ai-center';
    const postBottomContainer = postRootOfButton.querySelector(postButtomContainerSelector);
    const toggleButton = postBottomContainer.appendChild(document.createElement('button'));
    toggleButton.setAttribute('data-three-columns-userscript-toggle', '');
    // This function will always be called just before entering the 3-column layout:
    toggleButton.textContent = 'Close 3-column layout';
    /* Want to put the button on the right of the postBottomContainer,
     * but postBottomContainer may or may not have display: flex
     * margin-left: auto is effective when flex is being used - otherwise, float: right does it
     */
    toggleButton.style.cssText = 'float: right; margin-left: auto;';
    toggleButton.addEventListener('click', (e) => {
        // Don't submit the surrounding form:
        e.preventDefault();
        const currentPostRoot = postRootState.get();
        const columnsLayoutOpen = Boolean(currentPostRoot);
        const thisPostRootOpen = currentPostRoot === postRootOfButton;
        if (thisPostRootOpen) {
            postRootOfButton.querySelector('.wmd-input').focus();
            closeLayout_1.closeLayout();
        }
        else if (columnsLayoutOpen) {
            // A different post root is currently open, so close that other one and open this one:
            closeLayout_1.closeLayout();
            openLayout(postRootOfButton);
        }
        else {
            openLayout(postRootOfButton);
        }
    });
};


/***/ }),

/***/ "./build/attachListenersAndOpen3ColLayoutOnTextareaFocus/index.js":
/*!************************************************************************!*\
  !*** ./build/attachListenersAndOpen3ColLayoutOnTextareaFocus/index.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const closeLayoutOnPostEditorClose_1 = __webpack_require__(/*! ./closeLayoutOnPostEditorClose */ "./build/attachListenersAndOpen3ColLayoutOnTextareaFocus/closeLayoutOnPostEditorClose.js");
const closeLayoutWhenPostRefreshed_1 = __webpack_require__(/*! ./closeLayoutWhenPostRefreshed */ "./build/attachListenersAndOpen3ColLayoutOnTextareaFocus/closeLayoutWhenPostRefreshed.js");
const openLayout_1 = __webpack_require__(/*! ./openLayout */ "./build/attachListenersAndOpen3ColLayoutOnTextareaFocus/openLayout.js");
const postRootState = __webpack_require__(/*! ./postRootState */ "./build/attachListenersAndOpen3ColLayoutOnTextareaFocus/postRootState.js");
exports.attachListenersAndOpen3ColLayoutOnTextareaFocus = () => {
    const focusinHandler = (e) => {
        const target = e.target;
        const currentPostRoot = postRootState.get();
        // Run the function body when the user is not in the 3-column layout, and either:
        // the user clicks on the Answer textarea,
        // or when the user clicks Edit, has the inline editing privilege, and the site's built-in JS focuses the newly created textarea
        if (currentPostRoot || !target.matches('.wmd-input')) {
            return;
        }
        const newPostRoot = target.closest('#post-form, .answer, .question');
        if (!newPostRoot) {
            // This should not happen
            console.error(target);
            throw new Error('Stack Three Columns: No containing post root found, but .wmd-input was just focused!');
        }
        const validatedNewPostRoot = newPostRoot;
        // If this was a post root previously, but it was closed, do not proceed:
        const postHasBeenHandledBefore = Boolean(validatedNewPostRoot.querySelector('button[data-three-columns-userscript-toggle]'));
        if (postHasBeenHandledBefore) {
            return;
        }
        const isEdit = !validatedNewPostRoot.matches('#post-form');
        if (isEdit) {
            closeLayoutOnPostEditorClose_1.closeLayoutOnPostEditorClose(validatedNewPostRoot);
            closeLayoutWhenPostRefreshed_1.closeLayoutWhenPostRefreshed(validatedNewPostRoot);
        }
        openLayout_1.openLayout(validatedNewPostRoot);
    };
    window.addEventListener('focusin', focusinHandler);
};


/***/ }),

/***/ "./build/attachListenersAndOpen3ColLayoutOnTextareaFocus/openLayout.js":
/*!*****************************************************************************!*\
  !*** ./build/attachListenersAndOpen3ColLayoutOnTextareaFocus/openLayout.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const createToggleButton_1 = __webpack_require__(/*! ./createToggleButton */ "./build/attachListenersAndOpen3ColLayoutOnTextareaFocus/createToggleButton.js");
const postRootState = __webpack_require__(/*! ./postRootState */ "./build/attachListenersAndOpen3ColLayoutOnTextareaFocus/postRootState.js");
exports.openLayout = (newPostRoot) => {
    const textarea = newPostRoot.querySelector('textarea.wmd-input');
    // Remove rows attribute so that the height: 100% in the CSS can take effect:
    textarea.removeAttribute('rows');
    // If "Enter 3-column layout" was just pressed, the textarea won't be focused, so focus it:
    textarea.focus();
    newPostRoot.setAttribute('data-three-columns-userscript-post-root', '');
    const toggleButton = newPostRoot.querySelector('button[data-three-columns-userscript-toggle]');
    if (!toggleButton) {
        createToggleButton_1.createToggleButton(newPostRoot, exports.openLayout);
    }
    else {
        toggleButton.textContent = 'Close 3-column layout';
    }
    document.documentElement.setAttribute('data-three-columns-userscript', '');
    postRootState.set(newPostRoot);
};


/***/ }),

/***/ "./build/attachListenersAndOpen3ColLayoutOnTextareaFocus/postRootState.js":
/*!********************************************************************************!*\
  !*** ./build/attachListenersAndOpen3ColLayoutOnTextareaFocus/postRootState.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This variable will hold the element with [data-three-columns-userscript-post-root], while it's being displayed in 3 columns.
 * When not in 3-column layout, will be null (and no element will match [data-three-columns-userscript-post-root])
 * The currentPostRoot will match one of: #post-form, .answer, .question
 */
let currentPostRoot;
exports.get = () => currentPostRoot;
exports.set = (newPostRoot) => {
    currentPostRoot = newPostRoot;
};


/***/ }),

/***/ "./build/closeLayout.js":
/*!******************************!*\
  !*** ./build/closeLayout.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const postRootState = __webpack_require__(/*! ./attachListenersAndOpen3ColLayoutOnTextareaFocus/postRootState */ "./build/attachListenersAndOpen3ColLayoutOnTextareaFocus/postRootState.js");
exports.closeLayout = (scrollImmediately = false) => {
    const oldPostRoot = postRootState.get();
    if (!oldPostRoot) {
        // User is not in the 3-column layout; nothing to do
        return;
    }
    // Restore the rows attribute to its default value (which was removed when the layout was opened):
    oldPostRoot.querySelector('textarea.wmd-input').rows = 15;
    oldPostRoot.querySelector('button[data-three-columns-userscript-toggle]').textContent = 'Open 3-column layout';
    oldPostRoot.removeAttribute('data-three-columns-userscript-post-root');
    document.documentElement.removeAttribute('data-three-columns-userscript');
    window.$('html, body').animate({ scrollTop: $(oldPostRoot).offset().top - 55 }, scrollImmediately ? 0 : 200);
    postRootState.set(null);
};


/***/ }),

/***/ "./build/closeLayoutWhenClickOnCloseOrPendingEdit.js":
/*!***********************************************************!*\
  !*** ./build/closeLayoutWhenClickOnCloseOrPendingEdit.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const closeLayout_1 = __webpack_require__(/*! ./closeLayout */ "./build/closeLayout.js");
/**
 * If the user clicks on "close" or "edit (1)" (pending edit which needs to be approved) on ANY post while in 3-column layout,
 * prevent the click, close the layout, and then click() what they clicked manually
 * to ensure that the close / edit approval interface appears in the middle of the screen, after the layout is back to normal
 */
exports.closeLayoutWhenClickOnCloseOrPendingEdit = () => {
    const clickHandler = (e) => {
        const target = e.target;
        if (!target.closest('html[data-three-columns-userscript]') || !target.closest('.close-question-link, a[id^="edit-pending"]')) {
            return;
        }
        // Do not trigger SE's listeners for clicks on Edit / Close:
        e.stopPropagation();
        // This is an <a>, do not navigage away:
        e.preventDefault();
        // Close layout immediately, without scroll animation to the post the layout was focused on:
        closeLayout_1.closeLayout(true);
        // Scroll to the post the user wants to close or edit:
        const targetedPostRoot = target.closest('#post-form, .answer, .question');
        window.$('html, body')
            .animate({ scrollTop: $(targetedPostRoot).offset().top - 55 }, 200)
            .promise()
            .then(() => {
            // Click on "Edit (1)" or Close immediately after window is scrolled:
            target.click();
        });
    };
    window.addEventListener('click', clickHandler, true);
};


/***/ }),

/***/ "./build/closeTopbarWhenClickingPreview.js":
/*!*************************************************!*\
  !*** ./build/closeTopbarWhenClickingPreview.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * When one of the topbar menus are open (inbox, reputation, etc), clicking anywhere else is supposed to close it
 * Due to a bug, this does not happen when clicking the post preview section, which is a big problem when the preview comprises a large part of the screen
 * See: https://dev.stackoverflow.com/content//Js/full.en.js
 * Search for "// clicking anywhere else closes dialogs"
 */
exports.closeTopbarWhenClickingPreview = () => {
    window.addEventListener('click', (e) => {
        if (e.target.closest('.wmd-preview')) {
            window.StackExchange.topbar.hideAll();
        }
    }, true);
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
const addListeners_1 = __webpack_require__(/*! ./addListeners */ "./build/addListeners.js");
const insertStyle_1 = __webpack_require__(/*! ./insertStyle */ "./build/insertStyle.js");
insertStyle_1.insertStyle();
addListeners_1.addListeners();


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
/* Most of the display changes are done through CSS alone. The only DOM modifications made by the userscript are:
 * Injected stylesheet
 * data- attributes on a few elements
 * buttons to open/close the layout
 */
exports.insertStyle = () => {
    const styleTag = document.body.appendChild(document.createElement('style'));
    styleTag.textContent = styleText_css_1.default;
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
/* harmony default export */ __webpack_exports__["default"] = ("html[data-three-columns-userscript] body {\n  overflow-y: hidden; }\n\nhtml[data-three-columns-userscript] #mainbar,\nhtml[data-three-columns-userscript] [data-three-columns-userscript-post-root],\nhtml[data-three-columns-userscript] [data-three-columns-userscript-post-root] .wmd-preview {\n  position: fixed;\n  top: 50px;\n  background-color: white;\n  z-index: 1001;\n  height: calc(100% - 50px);\n  padding: 15px;\n  overflow-y: auto; }\n\nhtml[data-three-columns-userscript] #mainbar {\n  left: 0;\n  width: 33%; }\n\nhtml[data-three-columns-userscript] [data-three-columns-userscript-post-root] .wmd-preview {\n  left: 67%;\n  width: 33%; }\n\nhtml[data-three-columns-userscript] [data-three-columns-userscript-post-root] {\n  left: 33%;\n  width: 34%;\n  display: flex;\n  flex-direction: column; }\n  html[data-three-columns-userscript] [data-three-columns-userscript-post-root].answer [id^=\"post-editor\"],\n  html[data-three-columns-userscript] [data-three-columns-userscript-post-root].question [id^=\"post-editor\"] {\n    height: 70vh; }\n  html[data-three-columns-userscript] [data-three-columns-userscript-post-root]#post-form > .space {\n    display: none; }\n  html[data-three-columns-userscript] [data-three-columns-userscript-post-root]#post-form > #post-editor {\n    flex-grow: 1; }\n  html[data-three-columns-userscript] [data-three-columns-userscript-post-root] [id^=\"post-editor\"] {\n    display: flex;\n    flex-direction: column;\n    /*\r\n            This isn't needed, the community option will be hidden entirely\r\n            It takes up precious vertical space, and is rarely used\r\n            User can close the 3-col layout before posting if they want it\r\n\r\n            [data-three-columns-userscript-post-root] [id^=\"post-editor\"] > .community-option {\r\n                flex-grow: 0;\r\n                margin-left: auto;\r\n            }\r\n            */\n    margin-top: 0; }\n    html[data-three-columns-userscript] [data-three-columns-userscript-post-root] [id^=\"post-editor\"] > .ps-relative .wmd-button-bar,\n    html[data-three-columns-userscript] [data-three-columns-userscript-post-root] [id^=\"post-editor\"] > .ps-relative > .wmd-container .wmd-button-bar {\n      margin-top: 0; }\n    html[data-three-columns-userscript] [data-three-columns-userscript-post-root] [id^=\"post-editor\"] > .ps-relative,\n    html[data-three-columns-userscript] [data-three-columns-userscript-post-root] [id^=\"post-editor\"] > .ps-relative > .js-stacks-validation,\n    html[data-three-columns-userscript] [data-three-columns-userscript-post-root] [id^=\"post-editor\"] > .ps-relative > .wmd-container,\n    html[data-three-columns-userscript] [data-three-columns-userscript-post-root] [id^=\"post-editor\"] > .ps-relative > .wmd-container > .js-stacks-validation {\n      display: flex;\n      flex-direction: column; }\n      html[data-three-columns-userscript] [data-three-columns-userscript-post-root] [id^=\"post-editor\"] > .ps-relative,\n      html[data-three-columns-userscript] [data-three-columns-userscript-post-root] [id^=\"post-editor\"] > .ps-relative > .ps-relative,\n      html[data-three-columns-userscript] [data-three-columns-userscript-post-root] [id^=\"post-editor\"] > .ps-relative > .js-stacks-validation,\n      html[data-three-columns-userscript] [data-three-columns-userscript-post-root] [id^=\"post-editor\"] > .ps-relative > .js-stacks-validation > .ps-relative,\n      html[data-three-columns-userscript] [data-three-columns-userscript-post-root] [id^=\"post-editor\"] > .ps-relative > .wmd-container,\n      html[data-three-columns-userscript] [data-three-columns-userscript-post-root] [id^=\"post-editor\"] > .ps-relative > .wmd-container > .ps-relative,\n      html[data-three-columns-userscript] [data-three-columns-userscript-post-root] [id^=\"post-editor\"] > .ps-relative > .wmd-container > .js-stacks-validation,\n      html[data-three-columns-userscript] [data-three-columns-userscript-post-root] [id^=\"post-editor\"] > .ps-relative > .wmd-container > .js-stacks-validation > .ps-relative {\n        flex-grow: 1; }\n        html[data-three-columns-userscript] [data-three-columns-userscript-post-root] [id^=\"post-editor\"] > .ps-relative > .wmd-input,\n        html[data-three-columns-userscript] [data-three-columns-userscript-post-root] [id^=\"post-editor\"] > .ps-relative > .ps-relative > .wmd-input,\n        html[data-three-columns-userscript] [data-three-columns-userscript-post-root] [id^=\"post-editor\"] > .ps-relative > .js-stacks-validation > .wmd-input,\n        html[data-three-columns-userscript] [data-three-columns-userscript-post-root] [id^=\"post-editor\"] > .ps-relative > .js-stacks-validation > .ps-relative > .wmd-input,\n        html[data-three-columns-userscript] [data-three-columns-userscript-post-root] [id^=\"post-editor\"] > .ps-relative > .wmd-container > .wmd-input,\n        html[data-three-columns-userscript] [data-three-columns-userscript-post-root] [id^=\"post-editor\"] > .ps-relative > .wmd-container > .ps-relative > .wmd-input,\n        html[data-three-columns-userscript] [data-three-columns-userscript-post-root] [id^=\"post-editor\"] > .ps-relative > .wmd-container > .js-stacks-validation > .wmd-input,\n        html[data-three-columns-userscript] [data-three-columns-userscript-post-root] [id^=\"post-editor\"] > .ps-relative > .wmd-container > .js-stacks-validation > .ps-relative > .wmd-input {\n          height: 100% !important; }\n  html[data-three-columns-userscript] [data-three-columns-userscript-post-root].deleted-answer[data-three-columns-userscript-post-root] pre,\n  html[data-three-columns-userscript] [data-three-columns-userscript-post-root].deleted-answer[data-three-columns-userscript-post-root] pre > code {\n    background-color: #eff0f1; }\n  html[data-three-columns-userscript] [data-three-columns-userscript-post-root] .grippie {\n    display: none; }\n  html[data-three-columns-userscript] [data-three-columns-userscript-post-root] textarea.wmd-input {\n    resize: none; }\n\nhtml[data-three-columns-userscript] .hide-preview,\nhtml[data-three-columns-userscript] .bottom-share-links,\nhtml[data-three-columns-userscript] .bottom-notice,\nhtml[data-three-columns-userscript] .community-option {\n  display: none; }\n");

/***/ })

/******/ });