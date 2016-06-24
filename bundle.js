/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var TodosPresenter = __webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var TodosModel = __webpack_require__(2);
	var TodosView = __webpack_require__(3);
	var inputEle = document.getElementById("new-todo");

	bindEvents();

	function bindEvents() {
	    inputEle.addEventListener("keydown", onEnterNewTodo);
	}

	function onEnterNewTodo(e) {
	    var contents = inputEle.value;
	    var ENTER_KEY = 13;
	    if (contents.length > 0 && e.which === ENTER_KEY) {
	        var todo = TodosModel.create(contents);
	        TodosView.render(todo);
	        inputEle.value = "";
	    }
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = TodosModel = {
	    create: function(contents) {
	        var todo = {
	            contents: contents,
	            state: "active"
	        };
	        return todo;   
	    }
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var template = Handlebars.compile(__webpack_require__(4).todoSource);
	var todoList = document.getElementById("todo-list");

	function render(todo) {
	    todoList.insertAdjacentHTML('beforeend', template(todo));
	}

	module.exports = TodosView = {
	    render: render
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = template = {
	    todoSource:  '<li class="{{state}}"><div class="view"><input class="toggle" type="checkbox"><label>{{contents}}</label><button class="destroy"></button></div></li>'
	}

/***/ }
/******/ ]);