// ==UserScript==
// @name             Stack Three Columns Adjustable
// @description      When answering, editing, or asking, displays the question page, post textarea, and post preview in side-by-side columns
// @author           CertainPerformance
// @namespace        https://github.com/CertainPerformance/Stack-Exchange-Userscripts
// @version          1.3.3
// @include          /^https://(?:[^/]+\.)?(?:(?:stackoverflow|serverfault|superuser|stackexchange|askubuntu|stackapps)\.com|mathoverflow\.net)/(?:posts/\d+/edit|questions/(?:\d+|ask))/
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

/***/ "./node_modules/raw-loader/dist/cjs.js!./build/styleText.css":
/*!*******************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./build/styleText.css ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("html[data-cpuserscript-three-columns-layout-open] .hide-preview,\nhtml[data-cpuserscript-three-columns-layout-open] .bottom-share-links,\nhtml[data-cpuserscript-three-columns-layout-open] .bottom-notice,\nhtml[data-cpuserscript-three-columns-layout-open] .community-option,\nhtml[data-cpuserscript-three-columns-layout-open] .everyonelovesstackoverflow {\n  display: none; }\n\nhtml[data-cpuserscript-three-columns-layout-open] body {\n  overflow-y: hidden; }\n\nhtml[data-cpuserscript-three-columns-layout-open] [data-cpuserscript-three-columns-post-root] [data-resizer] {\n  position: fixed;\n  height: 100%;\n  z-index: 1002;\n  border-left: 2px solid black;\n  user-select: none;\n  cursor: col-resize; }\n  html[data-cpuserscript-three-columns-layout-open] [data-cpuserscript-three-columns-post-root] [data-resizer]:nth-last-child(2) {\n    left: calc(100% / 3);\n    /* replace-resizer1-left */ }\n  html[data-cpuserscript-three-columns-layout-open] [data-cpuserscript-three-columns-post-root] [data-resizer]:last-child {\n    left: calc(200% / 3);\n    /* replace-resizer2-left */ }\n\nhtml[data-cpuserscript-three-columns-layout-open] #mainbar, html[data-cpuserscript-three-columns-layout-open] #post-form[action=\"/questions/ask/submit\"],\nhtml[data-cpuserscript-three-columns-layout-open] [data-cpuserscript-three-columns-post-root],\nhtml[data-cpuserscript-three-columns-layout-open] [data-cpuserscript-three-columns-post-root] .wmd-preview, html[data-cpuserscript-three-columns-layout-open] [data-cpuserscript-three-columns-edit-mainbar] .wmd-preview {\n  position: fixed !important;\n  top: 50px;\n  background-color: white;\n  z-index: 1001;\n  height: calc(100% - 50px);\n  padding: 15px;\n  overflow-y: auto; }\n\nhtml[data-cpuserscript-three-columns-layout-open] #mainbar, html[data-cpuserscript-three-columns-layout-open] #post-form[action=\"/questions/ask/submit\"] {\n  left: 0%;\n  width: calc(100% / 3);\n  /* replace-col1-width */ }\n\nhtml[data-cpuserscript-three-columns-layout-open] [data-cpuserscript-three-columns-post-root] .wmd-preview, html[data-cpuserscript-three-columns-layout-open] [data-cpuserscript-three-columns-edit-mainbar] .wmd-preview {\n  left: calc(200% / 3);\n  /* replace-col3-left */\n  width: calc(100% / 3);\n  /* replace-col3-width */ }\n\nhtml[data-cpuserscript-three-columns-layout-open] [data-cpuserscript-three-columns-edit-mainbar] #revisions-list, html[data-cpuserscript-three-columns-layout-open] [data-cpuserscript-three-columns-edit-mainbar] .original-question {\n  width: unset !important; }\n\nhtml[data-cpuserscript-three-columns-layout-open] [data-cpuserscript-three-columns-post-root] {\n  left: calc(100% / 3);\n  /* replace-col2-left */\n  width: calc(100% / 3);\n  /* replace-col2-width */\n  display: flex;\n  flex-direction: column; }\n  html[data-cpuserscript-three-columns-layout-open] [data-cpuserscript-three-columns-post-root].answer [id^=\"post-editor\"],\n  html[data-cpuserscript-three-columns-layout-open] [data-cpuserscript-three-columns-post-root].question [id^=\"post-editor\"] {\n    height: 70vh; }\n  html[data-cpuserscript-three-columns-layout-open] [data-cpuserscript-three-columns-post-root]#post-form > .space {\n    display: none; }\n  html[data-cpuserscript-three-columns-layout-open] [data-cpuserscript-three-columns-post-root]#post-form > #post-editor {\n    flex-grow: 1; }\n  html[data-cpuserscript-three-columns-layout-open] [data-cpuserscript-three-columns-post-root].deleted-answer pre,\n  html[data-cpuserscript-three-columns-layout-open] [data-cpuserscript-three-columns-post-root].deleted-answer pre > code {\n    background-color: #eff0f1; }\n  html[data-cpuserscript-three-columns-layout-open] [data-cpuserscript-three-columns-post-root] .grippie {\n    display: none; }\n  html[data-cpuserscript-three-columns-layout-open] [data-cpuserscript-three-columns-post-root] textarea.wmd-input {\n    resize: none; }\n\nhtml[data-cpuserscript-three-columns-layout-open] [data-cpuserscript-three-columns-post-root] [id^=\"post-editor\"],\nhtml[data-cpuserscript-three-columns-layout-open] #question-form .post-editor[data-cpuserscript-three-columns-post-root],\nhtml[data-cpuserscript-three-columns-layout-open] #question-answer-section .post-editor[data-cpuserscript-three-columns-post-root] {\n  display: flex;\n  flex-direction: column;\n  /* A rule to show the community option without breaking the rest of the structure could be put here,\r\n         * but it takes up precious vertical space, and is rarely used, so it'll be hidden entirely instead.\r\n         * User can close the 3-col layout before posting if they want it\r\n         */\n  margin-top: 0; }\n  html[data-cpuserscript-three-columns-layout-open] [data-cpuserscript-three-columns-post-root] [id^=\"post-editor\"] > .ps-relative .wmd-button-bar,\n  html[data-cpuserscript-three-columns-layout-open] [data-cpuserscript-three-columns-post-root] [id^=\"post-editor\"] > .ps-relative > .wmd-container .wmd-button-bar,\n  html[data-cpuserscript-three-columns-layout-open] #question-form .post-editor[data-cpuserscript-three-columns-post-root] > .ps-relative .wmd-button-bar,\n  html[data-cpuserscript-three-columns-layout-open] #question-form .post-editor[data-cpuserscript-three-columns-post-root] > .ps-relative > .wmd-container .wmd-button-bar,\n  html[data-cpuserscript-three-columns-layout-open] #question-answer-section .post-editor[data-cpuserscript-three-columns-post-root] > .ps-relative .wmd-button-bar,\n  html[data-cpuserscript-three-columns-layout-open] #question-answer-section .post-editor[data-cpuserscript-three-columns-post-root] > .ps-relative > .wmd-container .wmd-button-bar {\n    margin-top: 0; }\n  html[data-cpuserscript-three-columns-layout-open] [data-cpuserscript-three-columns-post-root] [id^=\"post-editor\"] > .ps-relative,\n  html[data-cpuserscript-three-columns-layout-open] [data-cpuserscript-three-columns-post-root] [id^=\"post-editor\"] > .ps-relative > .js-stacks-validation,\n  html[data-cpuserscript-three-columns-layout-open] [data-cpuserscript-three-columns-post-root] [id^=\"post-editor\"] > .ps-relative > .wmd-container,\n  html[data-cpuserscript-three-columns-layout-open] [data-cpuserscript-three-columns-post-root] [id^=\"post-editor\"] > .ps-relative > .wmd-container > .js-stacks-validation,\n  html[data-cpuserscript-three-columns-layout-open] #question-form .post-editor[data-cpuserscript-three-columns-post-root] > .ps-relative,\n  html[data-cpuserscript-three-columns-layout-open] #question-form .post-editor[data-cpuserscript-three-columns-post-root] > .ps-relative > .js-stacks-validation,\n  html[data-cpuserscript-three-columns-layout-open] #question-form .post-editor[data-cpuserscript-three-columns-post-root] > .ps-relative > .wmd-container,\n  html[data-cpuserscript-three-columns-layout-open] #question-form .post-editor[data-cpuserscript-three-columns-post-root] > .ps-relative > .wmd-container > .js-stacks-validation,\n  html[data-cpuserscript-three-columns-layout-open] #question-answer-section .post-editor[data-cpuserscript-three-columns-post-root] > .ps-relative,\n  html[data-cpuserscript-three-columns-layout-open] #question-answer-section .post-editor[data-cpuserscript-three-columns-post-root] > .ps-relative > .js-stacks-validation,\n  html[data-cpuserscript-three-columns-layout-open] #question-answer-section .post-editor[data-cpuserscript-three-columns-post-root] > .ps-relative > .wmd-container,\n  html[data-cpuserscript-three-columns-layout-open] #question-answer-section .post-editor[data-cpuserscript-three-columns-post-root] > .ps-relative > .wmd-container > .js-stacks-validation {\n    display: flex;\n    flex-direction: column; }\n    html[data-cpuserscript-three-columns-layout-open] [data-cpuserscript-three-columns-post-root] [id^=\"post-editor\"] > .ps-relative,\n    html[data-cpuserscript-three-columns-layout-open] [data-cpuserscript-three-columns-post-root] [id^=\"post-editor\"] > .ps-relative > .ps-relative,\n    html[data-cpuserscript-three-columns-layout-open] [data-cpuserscript-three-columns-post-root] [id^=\"post-editor\"] > .ps-relative > .js-stacks-validation,\n    html[data-cpuserscript-three-columns-layout-open] [data-cpuserscript-three-columns-post-root] [id^=\"post-editor\"] > .ps-relative > .js-stacks-validation > .ps-relative,\n    html[data-cpuserscript-three-columns-layout-open] [data-cpuserscript-three-columns-post-root] [id^=\"post-editor\"] > .ps-relative > .wmd-container,\n    html[data-cpuserscript-three-columns-layout-open] [data-cpuserscript-three-columns-post-root] [id^=\"post-editor\"] > .ps-relative > .wmd-container > .ps-relative,\n    html[data-cpuserscript-three-columns-layout-open] [data-cpuserscript-three-columns-post-root] [id^=\"post-editor\"] > .ps-relative > .wmd-container > .js-stacks-validation,\n    html[data-cpuserscript-three-columns-layout-open] [data-cpuserscript-three-columns-post-root] [id^=\"post-editor\"] > .ps-relative > .wmd-container > .js-stacks-validation > .ps-relative,\n    html[data-cpuserscript-three-columns-layout-open] #question-form .post-editor[data-cpuserscript-three-columns-post-root] > .ps-relative,\n    html[data-cpuserscript-three-columns-layout-open] #question-form .post-editor[data-cpuserscript-three-columns-post-root] > .ps-relative > .ps-relative,\n    html[data-cpuserscript-three-columns-layout-open] #question-form .post-editor[data-cpuserscript-three-columns-post-root] > .ps-relative > .js-stacks-validation,\n    html[data-cpuserscript-three-columns-layout-open] #question-form .post-editor[data-cpuserscript-three-columns-post-root] > .ps-relative > .js-stacks-validation > .ps-relative,\n    html[data-cpuserscript-three-columns-layout-open] #question-form .post-editor[data-cpuserscript-three-columns-post-root] > .ps-relative > .wmd-container,\n    html[data-cpuserscript-three-columns-layout-open] #question-form .post-editor[data-cpuserscript-three-columns-post-root] > .ps-relative > .wmd-container > .ps-relative,\n    html[data-cpuserscript-three-columns-layout-open] #question-form .post-editor[data-cpuserscript-three-columns-post-root] > .ps-relative > .wmd-container > .js-stacks-validation,\n    html[data-cpuserscript-three-columns-layout-open] #question-form .post-editor[data-cpuserscript-three-columns-post-root] > .ps-relative > .wmd-container > .js-stacks-validation > .ps-relative,\n    html[data-cpuserscript-three-columns-layout-open] #question-answer-section .post-editor[data-cpuserscript-three-columns-post-root] > .ps-relative,\n    html[data-cpuserscript-three-columns-layout-open] #question-answer-section .post-editor[data-cpuserscript-three-columns-post-root] > .ps-relative > .ps-relative,\n    html[data-cpuserscript-three-columns-layout-open] #question-answer-section .post-editor[data-cpuserscript-three-columns-post-root] > .ps-relative > .js-stacks-validation,\n    html[data-cpuserscript-three-columns-layout-open] #question-answer-section .post-editor[data-cpuserscript-three-columns-post-root] > .ps-relative > .js-stacks-validation > .ps-relative,\n    html[data-cpuserscript-three-columns-layout-open] #question-answer-section .post-editor[data-cpuserscript-three-columns-post-root] > .ps-relative > .wmd-container,\n    html[data-cpuserscript-three-columns-layout-open] #question-answer-section .post-editor[data-cpuserscript-three-columns-post-root] > .ps-relative > .wmd-container > .ps-relative,\n    html[data-cpuserscript-three-columns-layout-open] #question-answer-section .post-editor[data-cpuserscript-three-columns-post-root] > .ps-relative > .wmd-container > .js-stacks-validation,\n    html[data-cpuserscript-three-columns-layout-open] #question-answer-section .post-editor[data-cpuserscript-three-columns-post-root] > .ps-relative > .wmd-container > .js-stacks-validation > .ps-relative {\n      flex-grow: 1; }\n      html[data-cpuserscript-three-columns-layout-open] [data-cpuserscript-three-columns-post-root] [id^=\"post-editor\"] > .ps-relative > .wmd-input,\n      html[data-cpuserscript-three-columns-layout-open] [data-cpuserscript-three-columns-post-root] [id^=\"post-editor\"] > .ps-relative > .ps-relative > .wmd-input,\n      html[data-cpuserscript-three-columns-layout-open] [data-cpuserscript-three-columns-post-root] [id^=\"post-editor\"] > .ps-relative > .js-stacks-validation > .wmd-input,\n      html[data-cpuserscript-three-columns-layout-open] [data-cpuserscript-three-columns-post-root] [id^=\"post-editor\"] > .ps-relative > .js-stacks-validation > .ps-relative > .wmd-input,\n      html[data-cpuserscript-three-columns-layout-open] [data-cpuserscript-three-columns-post-root] [id^=\"post-editor\"] > .ps-relative > .wmd-container > .wmd-input,\n      html[data-cpuserscript-three-columns-layout-open] [data-cpuserscript-three-columns-post-root] [id^=\"post-editor\"] > .ps-relative > .wmd-container > .ps-relative > .wmd-input,\n      html[data-cpuserscript-three-columns-layout-open] [data-cpuserscript-three-columns-post-root] [id^=\"post-editor\"] > .ps-relative > .wmd-container > .js-stacks-validation > .wmd-input,\n      html[data-cpuserscript-three-columns-layout-open] [data-cpuserscript-three-columns-post-root] [id^=\"post-editor\"] > .ps-relative > .wmd-container > .js-stacks-validation > .ps-relative > .wmd-input,\n      html[data-cpuserscript-three-columns-layout-open] #question-form .post-editor[data-cpuserscript-three-columns-post-root] > .ps-relative > .wmd-input,\n      html[data-cpuserscript-three-columns-layout-open] #question-form .post-editor[data-cpuserscript-three-columns-post-root] > .ps-relative > .ps-relative > .wmd-input,\n      html[data-cpuserscript-three-columns-layout-open] #question-form .post-editor[data-cpuserscript-three-columns-post-root] > .ps-relative > .js-stacks-validation > .wmd-input,\n      html[data-cpuserscript-three-columns-layout-open] #question-form .post-editor[data-cpuserscript-three-columns-post-root] > .ps-relative > .js-stacks-validation > .ps-relative > .wmd-input,\n      html[data-cpuserscript-three-columns-layout-open] #question-form .post-editor[data-cpuserscript-three-columns-post-root] > .ps-relative > .wmd-container > .wmd-input,\n      html[data-cpuserscript-three-columns-layout-open] #question-form .post-editor[data-cpuserscript-three-columns-post-root] > .ps-relative > .wmd-container > .ps-relative > .wmd-input,\n      html[data-cpuserscript-three-columns-layout-open] #question-form .post-editor[data-cpuserscript-three-columns-post-root] > .ps-relative > .wmd-container > .js-stacks-validation > .wmd-input,\n      html[data-cpuserscript-three-columns-layout-open] #question-form .post-editor[data-cpuserscript-three-columns-post-root] > .ps-relative > .wmd-container > .js-stacks-validation > .ps-relative > .wmd-input,\n      html[data-cpuserscript-three-columns-layout-open] #question-answer-section .post-editor[data-cpuserscript-three-columns-post-root] > .ps-relative > .wmd-input,\n      html[data-cpuserscript-three-columns-layout-open] #question-answer-section .post-editor[data-cpuserscript-three-columns-post-root] > .ps-relative > .ps-relative > .wmd-input,\n      html[data-cpuserscript-three-columns-layout-open] #question-answer-section .post-editor[data-cpuserscript-three-columns-post-root] > .ps-relative > .js-stacks-validation > .wmd-input,\n      html[data-cpuserscript-three-columns-layout-open] #question-answer-section .post-editor[data-cpuserscript-three-columns-post-root] > .ps-relative > .js-stacks-validation > .ps-relative > .wmd-input,\n      html[data-cpuserscript-three-columns-layout-open] #question-answer-section .post-editor[data-cpuserscript-three-columns-post-root] > .ps-relative > .wmd-container > .wmd-input,\n      html[data-cpuserscript-three-columns-layout-open] #question-answer-section .post-editor[data-cpuserscript-three-columns-post-root] > .ps-relative > .wmd-container > .ps-relative > .wmd-input,\n      html[data-cpuserscript-three-columns-layout-open] #question-answer-section .post-editor[data-cpuserscript-three-columns-post-root] > .ps-relative > .wmd-container > .js-stacks-validation > .wmd-input,\n      html[data-cpuserscript-three-columns-layout-open] #question-answer-section .post-editor[data-cpuserscript-three-columns-post-root] > .ps-relative > .wmd-container > .js-stacks-validation > .ps-relative > .wmd-input {\n        height: 100% !important; }\n\nhtml[data-cpuserscript-three-columns-layout-open] .ps-relative[data-cpuserscript-three-columns-post-root] {\n  z-index: 1002; }\n  html[data-cpuserscript-three-columns-layout-open] .ps-relative[data-cpuserscript-three-columns-post-root] .wmd-button-bar,\n  html[data-cpuserscript-three-columns-layout-open] .ps-relative[data-cpuserscript-three-columns-post-root] > .wmd-container .wmd-button-bar {\n    margin-top: 0; }\n  html[data-cpuserscript-three-columns-layout-open] .ps-relative[data-cpuserscript-three-columns-post-root],\n  html[data-cpuserscript-three-columns-layout-open] .ps-relative[data-cpuserscript-three-columns-post-root] > .js-stacks-validation,\n  html[data-cpuserscript-three-columns-layout-open] .ps-relative[data-cpuserscript-three-columns-post-root] > .wmd-container,\n  html[data-cpuserscript-three-columns-layout-open] .ps-relative[data-cpuserscript-three-columns-post-root] > .wmd-container > .js-stacks-validation {\n    display: flex;\n    flex-direction: column; }\n    html[data-cpuserscript-three-columns-layout-open] .ps-relative[data-cpuserscript-three-columns-post-root],\n    html[data-cpuserscript-three-columns-layout-open] .ps-relative[data-cpuserscript-three-columns-post-root] > .ps-relative,\n    html[data-cpuserscript-three-columns-layout-open] .ps-relative[data-cpuserscript-three-columns-post-root] > .js-stacks-validation,\n    html[data-cpuserscript-three-columns-layout-open] .ps-relative[data-cpuserscript-three-columns-post-root] > .js-stacks-validation > .ps-relative,\n    html[data-cpuserscript-three-columns-layout-open] .ps-relative[data-cpuserscript-three-columns-post-root] > .wmd-container,\n    html[data-cpuserscript-three-columns-layout-open] .ps-relative[data-cpuserscript-three-columns-post-root] > .wmd-container > .ps-relative,\n    html[data-cpuserscript-three-columns-layout-open] .ps-relative[data-cpuserscript-three-columns-post-root] > .wmd-container > .js-stacks-validation,\n    html[data-cpuserscript-three-columns-layout-open] .ps-relative[data-cpuserscript-three-columns-post-root] > .wmd-container > .js-stacks-validation > .ps-relative {\n      flex-grow: 1; }\n      html[data-cpuserscript-three-columns-layout-open] .ps-relative[data-cpuserscript-three-columns-post-root] > .wmd-input,\n      html[data-cpuserscript-three-columns-layout-open] .ps-relative[data-cpuserscript-three-columns-post-root] > .ps-relative > .wmd-input,\n      html[data-cpuserscript-three-columns-layout-open] .ps-relative[data-cpuserscript-three-columns-post-root] > .js-stacks-validation > .wmd-input,\n      html[data-cpuserscript-three-columns-layout-open] .ps-relative[data-cpuserscript-three-columns-post-root] > .js-stacks-validation > .ps-relative > .wmd-input,\n      html[data-cpuserscript-three-columns-layout-open] .ps-relative[data-cpuserscript-three-columns-post-root] > .wmd-container > .wmd-input,\n      html[data-cpuserscript-three-columns-layout-open] .ps-relative[data-cpuserscript-three-columns-post-root] > .wmd-container > .ps-relative > .wmd-input,\n      html[data-cpuserscript-three-columns-layout-open] .ps-relative[data-cpuserscript-three-columns-post-root] > .wmd-container > .js-stacks-validation > .wmd-input,\n      html[data-cpuserscript-three-columns-layout-open] .ps-relative[data-cpuserscript-three-columns-post-root] > .wmd-container > .js-stacks-validation > .ps-relative > .wmd-input {\n        height: 100% !important; }\n\nbutton[data-cpuserscript-three-columns-toggle] {\n  /* Want to put the button on the right of the postBottomContainer (see createToggleButton.ts),\r\n     * but postBottomContainer may or may not have display: flex\r\n     * margin-left: auto is effective when flex is being used - otherwise, float: right does it\r\n     */\n  float: right;\n  margin-left: auto;\n  /* On /ask, because the button is floating and there's nothing to the left of it,\r\n     * the z-index allows the lower part of the button to remain clickable, rather than being in the shadow of the Tags container\r\n     */\n  z-index: 1; }\n");

/***/ }),

/***/ "./src/addListeners.ts":
/*!*****************************!*\
  !*** ./src/addListeners.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const attachListenersAndOpen3ColLayoutOnTextareaFocus_1 = __webpack_require__(/*! ./attachListenersAndOpen3ColLayoutOnTextareaFocus */ "./src/attachListenersAndOpen3ColLayoutOnTextareaFocus/index.ts");
const closeLayoutWhenClickOnCloseOrPendingEdit_1 = __webpack_require__(/*! ./closeLayoutWhenClickOnCloseOrPendingEdit */ "./src/closeLayoutWhenClickOnCloseOrPendingEdit.ts");
const closeTopbarWhenClickingPreview_1 = __webpack_require__(/*! ./closeTopbarWhenClickingPreview */ "./src/closeTopbarWhenClickingPreview.ts");
const enterInterfaceWhenCopyToAnswer_1 = __webpack_require__(/*! ./enterInterfaceWhenCopyToAnswer */ "./src/enterInterfaceWhenCopyToAnswer.ts");
const watchForResize_1 = __webpack_require__(/*! ./watchForResize */ "./src/watchForResize/index.ts");
exports.addListeners = () => {
    attachListenersAndOpen3ColLayoutOnTextareaFocus_1.attachListenersAndOpen3ColLayoutOnTextareaFocus();
    closeLayoutWhenClickOnCloseOrPendingEdit_1.closeLayoutWhenClickOnCloseOrPendingEdit();
    closeTopbarWhenClickingPreview_1.closeTopbarWhenClickingPreview();
    enterInterfaceWhenCopyToAnswer_1.enterInterfaceWhenCopyToAnswer();
    watchForResize_1.watchForResize();
};


/***/ }),

/***/ "./src/attachListenersAndOpen3ColLayoutOnTextareaFocus/closeLayoutIfEditCancelSucceeds.ts":
/*!************************************************************************************************!*\
  !*** ./src/attachListenersAndOpen3ColLayoutOnTextareaFocus/closeLayoutIfEditCancelSucceeds.ts ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const closeLayout_1 = __webpack_require__(/*! ../closeLayout */ "./src/closeLayout.ts");
/**
 * Close layout if user confirms (via SE's window.confirm) that they want to discard the edit
 */
exports.closeLayoutIfEditCancelSucceeds = (child) => {
    /* A dialog may be about to come up asking for confirmation that the user wants to stop editing. See:
     * https://dev.stackoverflow.com/content//Js/full.en.js
     * search for: var cancelEdit = function (elem) {
     * SE's JS changes the .edit-post's handling-event data from 1 to 0 after the confirmation that an edit should be canceled
     * (On edit cancel, elements don't get removed from the DOM immediately, which is why handling-event is checked)
     */
    const $editPost = window.$(child.closest('.post-layout').querySelector('.edit-post'));
    // Give Stack Exchange's JS time to see the event, then see if the editor is still open:
    window.setTimeout(() => {
        if ($editPost.data('handling-event') !== 1) {
            // User is no longer editing this post:
            closeLayout_1.closeLayout();
        }
    });
};


/***/ }),

/***/ "./src/attachListenersAndOpen3ColLayoutOnTextareaFocus/closeLayoutOnPostEditorClose.ts":
/*!*********************************************************************************************!*\
  !*** ./src/attachListenersAndOpen3ColLayoutOnTextareaFocus/closeLayoutOnPostEditorClose.ts ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const closeLayout_1 = __webpack_require__(/*! ../closeLayout */ "./src/closeLayout.ts");
const closeLayoutIfEditCancelSucceeds_1 = __webpack_require__(/*! ./closeLayoutIfEditCancelSucceeds */ "./src/attachListenersAndOpen3ColLayoutOnTextareaFocus/closeLayoutIfEditCancelSucceeds.ts");
const postRootState = __webpack_require__(/*! ./postRootState */ "./src/attachListenersAndOpen3ColLayoutOnTextareaFocus/postRootState.ts");
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
        if (target.closest('[data-cpuserscript-three-columns-post-root]') && target.matches('.cancel-edit')) {
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
        if (target.matches(inputsThatTryToExitEditingWhenEscPressed) && target.closest('[data-cpuserscript-three-columns-post-root]')) {
            closeLayoutIfEditCancelSucceeds_1.closeLayoutIfEditCancelSucceeds(target);
        }
    };
    // Must listen in capturing phase, because SE's JS will return false -> stopPropagation() in jQuery
    thisPostRoot.addEventListener('keydown', keydownHandler, true);
};


/***/ }),

/***/ "./src/attachListenersAndOpen3ColLayoutOnTextareaFocus/closeLayoutWhenPostRefreshed.ts":
/*!*********************************************************************************************!*\
  !*** ./src/attachListenersAndOpen3ColLayoutOnTextareaFocus/closeLayoutWhenPostRefreshed.ts ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const closeLayout_1 = __webpack_require__(/*! ../closeLayout */ "./src/closeLayout.ts");
/**
 * If the user clicks on "An edit has been made to this post" while editing that post in 3-column layout, close the layout
 */
exports.closeLayoutWhenPostRefreshed = (newPostRoot) => {
    const clickHandler = (e) => {
        if (e.target.matches('[data-cpuserscript-three-columns-post-root] .new-post-activity > a')) {
            closeLayout_1.closeLayout();
        }
    };
    // The site's JS will call stopPropagation on this event, so for this delegated listener to work, it must be triggered in the capturing phase
    // see function postEdit in https://dev.stackoverflow.com/content//Js/full.en.js
    newPostRoot.addEventListener('click', clickHandler, true);
};


/***/ }),

/***/ "./src/attachListenersAndOpen3ColLayoutOnTextareaFocus/createToggleButton.ts":
/*!***********************************************************************************!*\
  !*** ./src/attachListenersAndOpen3ColLayoutOnTextareaFocus/createToggleButton.ts ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const closeLayout_1 = __webpack_require__(/*! ../closeLayout */ "./src/closeLayout.ts");
const postRootState = __webpack_require__(/*! ./postRootState */ "./src/attachListenersAndOpen3ColLayoutOnTextareaFocus/postRootState.ts");
exports.createToggleButton = (postRootOfButton, openLayout) => {
    // Get a reference to the container that either has "Save Edits" or "Post Your Answer" button:
    const postBottomContainer = postRootOfButton.querySelector('.form-submit, .post-editor ~ .grid.ai-center') || postRootOfButton;
    const toggleButton = postBottomContainer.appendChild(document.createElement('button'));
    toggleButton.setAttribute('data-cpuserscript-three-columns-toggle', '');
    toggleButton.textContent = 'Close 3-column layout';
    // This function will always be called just before entering the 3-column layout:
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
            // Nothing is currently open:
            openLayout(postRootOfButton);
        }
    });
};


/***/ }),

/***/ "./src/attachListenersAndOpen3ColLayoutOnTextareaFocus/index.ts":
/*!**********************************************************************!*\
  !*** ./src/attachListenersAndOpen3ColLayoutOnTextareaFocus/index.ts ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const closeLayoutOnPostEditorClose_1 = __webpack_require__(/*! ./closeLayoutOnPostEditorClose */ "./src/attachListenersAndOpen3ColLayoutOnTextareaFocus/closeLayoutOnPostEditorClose.ts");
const closeLayoutWhenPostRefreshed_1 = __webpack_require__(/*! ./closeLayoutWhenPostRefreshed */ "./src/attachListenersAndOpen3ColLayoutOnTextareaFocus/closeLayoutWhenPostRefreshed.ts");
const openLayout_1 = __webpack_require__(/*! ./openLayout */ "./src/attachListenersAndOpen3ColLayoutOnTextareaFocus/openLayout.ts");
const postRootState = __webpack_require__(/*! ./postRootState */ "./src/attachListenersAndOpen3ColLayoutOnTextareaFocus/postRootState.ts");
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
        const { href } = window.location;
        const newPostRoot = target.closest(href.endsWith('/ask')
            ? '.post-editor'
            : '#post-form, .answer, .question, #client-revision-guid ~ .post-editor .ps-relative');
        if (!newPostRoot) {
            // This should not happen
            // tslint:disable-next-line: no-console
            console.error(target);
            throw new Error('Stack Three Columns: No containing post root found, but .wmd-input was just focused!');
        }
        if (href.endsWith('/edit')) {
            document.querySelector('#mainbar').setAttribute('data-cpuserscript-three-columns-edit-mainbar', '');
        }
        // If this was a post root previously, but it was closed, do not proceed:
        const postHasBeenHandledBefore = Boolean(newPostRoot.querySelector('button[data-cpuserscript-three-columns-toggle]'));
        if (postHasBeenHandledBefore) {
            return;
        }
        const isInlineEdit = newPostRoot.matches('.question, .answer');
        if (isInlineEdit) {
            closeLayoutOnPostEditorClose_1.closeLayoutOnPostEditorClose(newPostRoot);
            closeLayoutWhenPostRefreshed_1.closeLayoutWhenPostRefreshed(newPostRoot);
        }
        openLayout_1.openLayout(newPostRoot);
    };
    window.addEventListener('focusin', focusinHandler);
};


/***/ }),

/***/ "./src/attachListenersAndOpen3ColLayoutOnTextareaFocus/openLayout.ts":
/*!***************************************************************************!*\
  !*** ./src/attachListenersAndOpen3ColLayoutOnTextareaFocus/openLayout.ts ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const isAdjustable_1 = __webpack_require__(/*! ../isAdjustable */ "./src/isAdjustable.ts");
const createToggleButton_1 = __webpack_require__(/*! ./createToggleButton */ "./src/attachListenersAndOpen3ColLayoutOnTextareaFocus/createToggleButton.ts");
const postRootState = __webpack_require__(/*! ./postRootState */ "./src/attachListenersAndOpen3ColLayoutOnTextareaFocus/postRootState.ts");
exports.openLayout = (newPostRoot) => {
    const textarea = newPostRoot.querySelector('textarea.wmd-input');
    // Remove rows attribute so that the height: 100% in the CSS can take effect:
    textarea.removeAttribute('rows');
    // If "Enter 3-column layout" was just pressed, the textarea won't be focused, so focus it:
    textarea.focus();
    newPostRoot.setAttribute('data-cpuserscript-three-columns-post-root', '');
    const toggleButton = newPostRoot.querySelector('button[data-cpuserscript-three-columns-toggle]');
    if (!toggleButton) {
        createToggleButton_1.createToggleButton(newPostRoot, exports.openLayout);
    }
    else {
        toggleButton.textContent = 'Close 3-column layout';
    }
    if (isAdjustable_1.isAdjustable) {
        newPostRoot.insertAdjacentHTML('beforeend', '<div data-resizer></div><div data-resizer></div>');
    }
    document.documentElement.setAttribute('data-cpuserscript-three-columns-layout-open', '');
    postRootState.set(newPostRoot);
};


/***/ }),

/***/ "./src/attachListenersAndOpen3ColLayoutOnTextareaFocus/postRootState.ts":
/*!******************************************************************************!*\
  !*** ./src/attachListenersAndOpen3ColLayoutOnTextareaFocus/postRootState.ts ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This variable will hold the element with [data-cpuserscript-three-columns-post-root] while it's being displayed in 3 columns.
 * When not in 3-column layout, will be null (and no element will match [data-cpuserscript-three-columns-post-root])
 * The currentPostRoot will match one of: #post-form, .answer, .question, .ps-relative
 */
let currentPostRoot;
exports.get = () => currentPostRoot;
exports.set = (newPostRoot) => {
    currentPostRoot = newPostRoot;
};


/***/ }),

/***/ "./src/closeLayout.ts":
/*!****************************!*\
  !*** ./src/closeLayout.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const postRootState = __webpack_require__(/*! ./attachListenersAndOpen3ColLayoutOnTextareaFocus/postRootState */ "./src/attachListenersAndOpen3ColLayoutOnTextareaFocus/postRootState.ts");
exports.closeLayout = (scrollImmediately = false) => {
    const oldPostRoot = postRootState.get();
    if (!oldPostRoot) {
        // User is not in the 3-column layout; nothing to do
        return;
    }
    oldPostRoot.querySelectorAll('[data-resizer]').forEach((resizer) => {
        resizer.remove();
    });
    // Restore the rows attribute to its default value (which was removed when the layout was opened):
    oldPostRoot.querySelector('textarea.wmd-input').rows = 15;
    oldPostRoot.querySelector('button[data-cpuserscript-three-columns-toggle]').textContent = 'Open 3-column layout';
    oldPostRoot.removeAttribute('data-cpuserscript-three-columns-post-root');
    if (window.location.href.endsWith('/edit')) {
        document.querySelector('#mainbar').removeAttribute('data-cpuserscript-three-columns-edit-mainbar');
    }
    /* The grippie bar is invisible in the 3-col interface.
     * SE's JS sets style properties directly to it, which can rarely result in width issues after the layout is closed
     * (like if user tries to review an edit while in 3-col interface on a post).
     * Just remove all styles from it
     */
    oldPostRoot.querySelector('.grippie').removeAttribute('style');
    document.documentElement.removeAttribute('data-cpuserscript-three-columns-layout-open');
    window.$('html, body').animate({ scrollTop: $(oldPostRoot).offset().top - 55 }, scrollImmediately ? 0 : 200);
    postRootState.set(null);
};


/***/ }),

/***/ "./src/closeLayoutWhenClickOnCloseOrPendingEdit.ts":
/*!*********************************************************!*\
  !*** ./src/closeLayoutWhenClickOnCloseOrPendingEdit.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const closeLayout_1 = __webpack_require__(/*! ./closeLayout */ "./src/closeLayout.ts");
/**
 * If the user clicks on "close" or "edit (1)" (pending edit which needs to be approved) on ANY post while in 3-column layout,
 * prevent the click, close the layout, and then click() what they clicked manually
 * to ensure that the close / edit approval interface appears in the middle of the screen, after the layout is back to normal
 */
exports.closeLayoutWhenClickOnCloseOrPendingEdit = () => {
    const clickHandler = (e) => {
        const target = e.target;
        // Continue main body of function only if layout is open *and* one of (.close-question-link or a[id^="edit-pending"]) is clicked
        if (!target.closest('html[data-cpuserscript-three-columns-layout-open]') || !target.closest('.close-question-link, a[id^="edit-pending"]')) {
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

/***/ "./src/closeTopbarWhenClickingPreview.ts":
/*!***********************************************!*\
  !*** ./src/closeTopbarWhenClickingPreview.ts ***!
  \***********************************************/
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

/***/ "./src/enterInterfaceWhenCopyToAnswer.ts":
/*!***********************************************!*\
  !*** ./src/enterInterfaceWhenCopyToAnswer.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.enterInterfaceWhenCopyToAnswer = () => {
    /* This will only actually enter the interface if it's currently closed (and this textarea hasn't been focused before).
     * The interface won't open in the rare case that this is an extremely popular question
     * that asks for confirmation that you want to add yet another answer,
     * but that's so rare it's not worth worrying about (and user can always focus the textarea manually)
     */
    window.addEventListener('click', (e) => {
        if (!(e.target.matches('.copySnippet'))) {
            return;
        }
        const markdownTextarea = $('#post-editor textarea.wmd-input');
        markdownTextarea.focus();
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
const addListeners_1 = __webpack_require__(/*! ./addListeners */ "./src/addListeners.ts");
const insertStyle_1 = __webpack_require__(/*! ./insertStyle */ "./src/insertStyle.ts");
insertStyle_1.insertStyle();
addListeners_1.addListeners();


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
/* Most of the display changes are done through CSS alone. The only DOM modifications made by the userscript are:
 * Injected stylesheet
 * data- attributes on a few elements
 * Buttons to open/close the layout
 * Column resizer lines
 */
let styleTag;
exports.insertStyle = () => {
    styleTag = document.body.appendChild(document.createElement('style'));
    styleTag.textContent = styleText_css_1.default;
};
exports.changeStyle = (newStyleText) => {
    styleTag.textContent = newStyleText;
};


/***/ }),

/***/ "./src/isAdjustable.ts":
/*!*****************************!*\
  !*** ./src/isAdjustable.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdjustable = typeof GM_info !== 'undefined' && GM_info.script.name.toLowerCase().trim().endsWith('adjustable');


/***/ }),

/***/ "./src/watchForResize/getSettings.ts":
/*!*******************************************!*\
  !*** ./src/watchForResize/getSettings.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getSettings = () => {
    const json = localStorage.cpUserscriptThreeColumnsAdjustable;
    return json
        ? JSON.parse(json)
        : { firstColWidth: 33.33, secondColWidth: 33.33 };
};


/***/ }),

/***/ "./src/watchForResize/index.ts":
/*!*************************************!*\
  !*** ./src/watchForResize/index.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const isAdjustable_1 = __webpack_require__(/*! ../isAdjustable */ "./src/isAdjustable.ts");
const getSettings_1 = __webpack_require__(/*! ./getSettings */ "./src/watchForResize/getSettings.ts");
const updateStyle_1 = __webpack_require__(/*! ./updateStyle */ "./src/watchForResize/updateStyle.ts");
exports.watchForResize = () => {
    if (!isAdjustable_1.isAdjustable) {
        delete localStorage.cpUserscriptThreeColumnsAdjustable;
        return;
    }
    // Load the possibly-personalized values into the CSS on pageload:
    updateStyle_1.updateStyle();
    window.addEventListener('mousedown', (mousedownEvent) => {
        const target = mousedownEvent.target;
        if (!target.matches('[data-cpuserscript-three-columns-post-root] [data-resizer]')) {
            return;
        }
        const isFirstResizer = target.nextElementSibling !== null;
        const decimalLeftOfColumnLeftOfResizer = isFirstResizer ? 0 : target.closest('[data-cpuserscript-three-columns-post-root]').getBoundingClientRect().left;
        const currentSettings = getSettings_1.getSettings();
        const mousemoveHandler = (mousemoveEvent) => {
            const newPageX = mousemoveEvent.pageX;
            const pageWidth = document.documentElement.clientWidth;
            const newPercentWidthOfColumnLeftOfResizer = 100 * Math.max((newPageX - decimalLeftOfColumnLeftOfResizer), 0) / pageWidth;
            if (isFirstResizer) {
                localStorage.cpUserscriptThreeColumnsAdjustable = JSON.stringify({
                    firstColWidth: newPercentWidthOfColumnLeftOfResizer,
                    secondColWidth: currentSettings.secondColWidth,
                });
            }
            else {
                localStorage.cpUserscriptThreeColumnsAdjustable = JSON.stringify({
                    firstColWidth: currentSettings.firstColWidth,
                    secondColWidth: newPercentWidthOfColumnLeftOfResizer,
                });
            }
            updateStyle_1.updateStyle();
        };
        window.addEventListener('mousemove', mousemoveHandler);
        window.addEventListener('mouseup', () => {
            window.removeEventListener('mousemove', mousemoveHandler);
        }, { once: true });
    });
};


/***/ }),

/***/ "./src/watchForResize/updateStyle.ts":
/*!*******************************************!*\
  !*** ./src/watchForResize/updateStyle.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
// tslint:disable-next-line: no-implicit-dependencies
const styleText_css_1 = __webpack_require__(/*! raw-loader!../../build/styleText.css */ "./node_modules/raw-loader/dist/cjs.js!./build/styleText.css");
const insertStyle_1 = __webpack_require__(/*! ../insertStyle */ "./src/insertStyle.ts");
const getSettings_1 = __webpack_require__(/*! ./getSettings */ "./src/watchForResize/getSettings.ts");
/**
 * From the column width settings in localStorage, change the textContent of the userscript's <style> tag
 * to display the saved column widths
 */
exports.updateStyle = () => {
    const { firstColWidth, secondColWidth } = getSettings_1.getSettings();
    // The above will be (numeric) percentages 0-100
    const firstTwoColsTotalWidth = firstColWidth + secondColWidth;
    const thirdColumnWidth = 100 - firstTwoColsTotalWidth;
    // At very low width, the user probably doesn't care about the column in question; overflow will look silly
    const widthNumToCssRules = (width) => `width: ${width}%; ${width < 5 ? 'overflow: hidden;' : ''}`;
    const replaceObj = {
        'col1-width': widthNumToCssRules(firstColWidth),
        'resizer1-left': `left: ${firstColWidth}%;`,
        // tslint:disable-next-line: object-literal-sort-keys
        'col2-left': `left: ${firstColWidth}%;`,
        'col2-width': widthNumToCssRules(secondColWidth),
        'resizer2-left': `left: ${firstTwoColsTotalWidth}%;`,
        'col3-left': `left: ${firstTwoColsTotalWidth}%;`,
        'col3-width': widthNumToCssRules(thirdColumnWidth),
    };
    const newCssText = styleText_css_1.default.replace(/^ *\/\* replace-(\S+) \*\//gm, (match, g1) => replaceObj[g1] || match);
    insertStyle_1.changeStyle(newCssText);
};


/***/ })

/******/ });