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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__resource_js_addTodo__ = __webpack_require__(1);


(function() {
  const addTodo = new __WEBPACK_IMPORTED_MODULE_0__resource_js_addTodo__["a" /* default */]();
})();

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// window.onload = () => {
//   init();
// }
//
// export default class addTodo {
//   constructor() {
//
//   }
// }
//
// const init = () => {
//   const ENTER_KEY_CODE = 13;
//   const todoTemplate = Handlebars.compile(document.querySelector("#todo-template").innerHTML);
//   document.querySelector("#new-todo").addEventListener("keypress", e => {
//     if(e.which == ENTER_KEY_CODE) {
//       postTodo(e);
//     }
//   });
//   const todoTemplate = Handlebars.compile(document.querySelector("#todo-template").innerHTML);
//   const nowStep = todoTemplate({
//     "todo": "aaaa"
//   });
//   console.log("NOW STEP: ", nowStep);
// }
//
// const postTodo = e => {
//   console.log("NEW-TODO: ", document.querySelector("#new-todo").value);
// }

class AddTodo {
  constructor() {
    console.log("asdf");
    this.test = "TEST";
  }

  // init = () => {
  //   document.querySelector("#new-todo").addEventListener("keypress", e => {
  //   if (e.which == this.ENTER_KEY_CODE) {
  //     this.postTodo(e);
  //   }
  //   });
  // }
  //
  // postTodo = e => {
  //   console.log("CLICK!");
  // }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AddTodo;


/***/ })
/******/ ]);