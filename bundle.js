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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var IndexedDB = function () {
  function IndexedDB() {
    _classCallCheck(this, IndexedDB);

    this.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
    this.init();
  }

  _createClass(IndexedDB, [{
    key: 'init',
    value: function init() {
      var _this = this;

      this.open = this.indexedDB.open('HTML5', 1);
      this.open.onupgradeneeded = function () {
        _this.db = _this.open.result;
        _this.store = _this.db.createObjectStore('TodoStore', { keyPath: 'id' });
      };

      this.open.onsuccess = function () {
        _this.db = _this.open.result;

        // this.store.put({ id: 2222, todo: 'test2' });
        //
        // this.get1 = this.store.get(1111);
        // this.get2 = this.store.get(2222);
        //
        // this.get1.onsuccess = () => {
        //   console.log(this.get1.result.todo);
        // };
      };
    }
  }, {
    key: 'saveTodo',
    value: function saveTodo(tmpId, inputValue) {
      this.transaction = this.db.transaction('TodoStore', 'readwrite');
      this.store = this.transaction.objectStore('TodoStore');

      var save = this.store.put({ id: tmpId, todo: inputValue });
      save.onsuccess = function () {
        console.log(save.result);
      };
    }
  }, {
    key: 'getAllTodo',
    value: function getAllTodo() {
      var _this2 = this;

      this.transaction = this.db.transaction('TodoStore', 'readwrite');
      this.store = this.transaction.objectStore('TodoStore');
      var result = void 0;

      var getAll = this.store.getAll();
      getAll.onsuccess = function () {
        console.log('getALL: ', getAll.result);
        result = getAll.result;

        var fetchList = [];

        for (var i = 0, len = result.length; i < len; i += 1) {
          console.log('indexedDB values: ', result[i].id);
          fetchList[i] = fetch('http://128.199.76.9:8002/wkddngus5/todo', {
            method: 'POST',
            headers: {
              Accept: 'application/json, application/xml, text/plain, text/html, *.*',
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: 'todo=' + result[i].todo
          });
        }

        Promise.all(fetchList).then(function (responses) {
          return Promise.all(responses.map(function (response) {
            return response.json();
          }));
        }).then(function (jsonList) {
          for (var _i = 0, _len = result.length; _i < _len; _i += 1) {
            document.getElementById(result[_i].id).id = jsonList[_i].insertId;
          }
        });
        _this2.clearTodo();
      };
    }
  }, {
    key: 'clearTodo',
    value: function clearTodo() {
      this.transaction = this.db.transaction('TodoStore', 'readwrite');
      this.store = this.transaction.objectStore('TodoStore');

      var objectStoreRequest = this.store.clear();
      objectStoreRequest.onsuccess = function () {
        console.log('indexedDB cleared');
      };
    }
  }]);

  return IndexedDB;
}();

exports.default = IndexedDB;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _todo = __webpack_require__(2);

var _todo2 = _interopRequireDefault(_todo);

var _filter = __webpack_require__(4);

var _filter2 = _interopRequireDefault(_filter);

var _onOffListner = __webpack_require__(5);

var _onOffListner2 = _interopRequireDefault(_onOffListner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function entry() {
  var todo = new _todo2.default();
  var filter = new _filter2.default();
  var onOffListner = new _onOffListner2.default();

  if (todo) {
    console.log('todo created!');
  }

  if (filter) {
    console.log('filter created!');
  }

  if (onOffListner) {
    console.log('onOffListner created!');
  }
})();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by Naver on 2017. 7. 17..
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _indexedDB = __webpack_require__(0);

var _indexedDB2 = _interopRequireDefault(_indexedDB);

var _animation = __webpack_require__(3);

var _animation2 = _interopRequireDefault(_animation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Todo = function () {
  function Todo() {
    _classCallCheck(this, Todo);

    this.ENTER_KEY_CODE = 13;

    this.newTodo = document.querySelector('#todo-template').innerHTML;
    this.todoTemplate = Handlebars.compile(this.newTodo);
    this.HTTP_STATUS = {
      OK: 200
    };

    this.indexedDB = new _indexedDB2.default();
    this.animation = new _animation2.default();
    this.init();
  }

  _createClass(Todo, [{
    key: 'init',
    value: function init() {
      var _this = this;

      localStorage.clear();

      document.querySelector('#new-todo').addEventListener('keydown', this.postTodo);
      document.querySelector('#new-todo').addEventListener('keydown', function (e) {
        _this.postTodo(e);
      });

      document.querySelector('#todo-list').addEventListener('click', function (e) {
        Todo.toggleCompleteTodo(e);
        _this.deleteTodo(e);
      });

      // onoffListner에 넣을 수 없을까?
      if (navigator.onLine) {
        fetch('http://128.199.76.9:8002/wkddngus5/todo', {}).then(function (response) {
          return response.json();
        }).then(function (json) {
          json.forEach(function (entry) {
            var toInsert = _this.makeTodo(entry.todo, entry.id);
            document.querySelector('#todo-list').insertAdjacentHTML('beforeend', toInsert);
            if (entry.completed === 1) {
              document.getElementById(entry.id).classList.add('completed');
              document.getElementById(entry.id).querySelector('.toggle').checked = true;
            }
          });
        });
      }
    }

    //   Promise.all([fetch(), fetch()]).then(results => {
    //   return Promise.all(results.map(response => response.json()));
    // }).then(jsonList => {
    //   jsonList; // fetch의 결과 리스트
    // });

  }, {
    key: 'postTodo',
    value: function postTodo(e) {
      if (e.keyCode === this.ENTER_KEY_CODE && document.querySelector('#new-todo').value !== '') {
        var tmpId = new Date().getMilliseconds();
        var inputValue = document.querySelector('#new-todo').value;
        var toInsert = this.makeTodo(inputValue, tmpId);

        document.querySelector('#todo-list').insertAdjacentHTML('afterbegin', toInsert);
        document.querySelector('#new-todo').value = '';
        this.animation.fadeIn(document.getElementById(tmpId));

        if (navigator.onLine) {
          fetch('http://128.199.76.9:8002/wkddngus5/todo', {
            method: 'POST',
            headers: {
              Accept: 'application/json, application/xml, text/plain, text/html, *.*',
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: 'todo=' + inputValue
          }).then(function (response) {
            return response.json();
          }).then(function (json) {
            document.getElementById(tmpId).id = json.insertId;
          }).catch(function (error) {
            console.log(error);
            location.reload();
          });
        } else {
          console.log(this.indexedDB);
          this.indexedDB.saveTodo(tmpId, inputValue);
          localStorage.setItem(tmpId, inputValue);
          console.log(localStorage.getItem(tmpId) + ' + \'/\' + ' + localStorage.length);
        }
      }
    }
  }, {
    key: 'makeTodo',
    value: function makeTodo(inputContents, id) {
      var data = {
        todo: {
          title: inputContents,
          id: id
        }
      };
      return this.todoTemplate(data);
    }
  }, {
    key: 'deleteTodo',
    value: function deleteTodo(e) {
      if (e.target.className === 'destroy') {
        var toDelete = e.target.closest('li');
        var id = toDelete.id;
        this.animation.fadeOut(toDelete);

        fetch('http://128.199.76.9:8002/wkddngus5/todo/' + id, {
          method: 'DELETE',
          headers: {
            Accept: 'application/json, application/xml, text/plain, text/html, *.*',
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          }
        }).then(function (response) {
          return response.json();
        }).then(function (json) {
          console.log(json);
        }).catch(function (error) {
          console.log(error);
          location.reload();
        });
      }
    }
  }], [{
    key: 'putTodo',
    value: function putTodo(id, completed) {
      fetch('http://128.199.76.9:8002/wkddngus5/todo/' + id, {
        method: 'PUT',
        headers: {
          Accept: 'application/json, application/xml, text/plain, text/html, *.*',
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: 'completed=' + completed
      }).then(function (response) {
        return response.json();
      }).then(function (json) {
        console.log(json);
      }).catch(function (error) {
        console.log(error);
        location.reload();
      });
    }
  }, {
    key: 'toggleCompleteTodo',
    value: function toggleCompleteTodo(e) {
      if (e.target.className === 'toggle') {
        if (e.target.closest('li').classList.contains('completed')) {
          e.target.closest('li').classList.remove('completed');
          Todo.putTodo(e.target.closest('li').id, 0);
        } else {
          e.target.closest('li').classList.add('completed');
          Todo.putTodo(e.target.closest('li').id, 1);
        }
      }
    }
  }]);

  return Todo;
}();

exports.default = Todo;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Naver on 2017. 8. 2..
 */
var Animation = function () {
  function Animation() {
    _classCallCheck(this, Animation);

    this.FADE_OUT_TRANSITION_TIME = '1s';
    this.FADE_IN_TRANSITION_TIME = '1.5s';
    this.OPACITY_TRANSPARENCY = 0;
    this.OPACITY_UNTRANSPARENCY = 1;
    this.DELETE_TIMEING_MILLI = 900;
    this.SHOW_TIMEING_MILLI = 100;
  }

  _createClass(Animation, [{
    key: 'fadeOut',
    value: function fadeOut(toDelete) {
      var toFadeOut = toDelete;
      toFadeOut.style.transition = this.FADE_OUT_TRANSITION_TIME;
      toFadeOut.style.opacity = this.OPACITY_TRANSPARENCY;
      setTimeout(function () {
        toDelete.remove();
      }, this.DELETE_TIMEING_MILLI);
    }
  }, {
    key: 'fadeIn',
    value: function fadeIn(toInsert) {
      var _this = this;

      var toFadeIn = toInsert;
      toFadeIn.style.transition = '0s';
      toFadeIn.style.opacity = this.OPACITY_TRANSPARENCY;
      setTimeout(function () {
        toFadeIn.style.transition = _this.FADE_IN_TRANSITION_TIME;
        toFadeIn.style.opacity = _this.OPACITY_UNTRANSPARENCY;
      }, this.SHOW_TIMEING_MILLI);
    }
  }]);

  return Animation;
}();

exports.default = Animation;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Naver on 2017. 8. 2..
 */
var Filter = function () {
  function Filter() {
    _classCallCheck(this, Filter);

    this.selectedIndex = 0;
    this.init();
  }

  _createClass(Filter, [{
    key: 'init',
    value: function init() {
      var _this = this;

      history.pushState({ method: 'all' }, null, 'index.html');
      document.querySelector('#filters').addEventListener('click', function (e) {
        e.preventDefault();
        _this.changeFilterStatus(e);
      });

      window.addEventListener('popstate', function (e) {
        _this.changeURLFilter(e);
      });
    }
  }, {
    key: 'changeFilterStatus',
    value: function changeFilterStatus(e) {
      e.preventDefault();
      var target = e.target;
      if (target.tagName.toLowerCase() === 'a') {
        var href = target.getAttribute('href');
        switch (href) {
          case 'index.html':
            this.allView();
            history.pushState({ method: 'all' }, null, 'index.html');
            break;
          case 'active':
            this.activeView();
            history.pushState({ method: 'active' }, null, 'all-active');
            break;
          case 'completed':
            this.completedView();
            history.pushState({ method: 'completed' }, null, 'completed');
            break;
          default:
        }
      }
    }
  }, {
    key: 'allView',
    value: function allView() {
      document.querySelector('#todo-list').className = '';
      this.selectedNavigator(0);
    }
  }, {
    key: 'activeView',
    value: function activeView() {
      document.querySelector('#todo-list').className = 'all-active';
      this.selectedNavigator(1);
    }
  }, {
    key: 'completedView',
    value: function completedView() {
      document.querySelector('#todo-list').className = 'all-completed';
      this.selectedNavigator(2);
    }
  }, {
    key: 'selectedNavigator',
    value: function selectedNavigator(index) {
      var navigatorList = document.querySelectorAll('#filters a');
      navigatorList[this.selectedIndex].classList.remove('selected');
      navigatorList[index].classList.remove('selected');
      navigatorList[index].classList.add('selected');
      this.selectedIndex = index;
    }
  }, {
    key: 'changeURLFilter',
    value: function changeURLFilter(e) {
      if (!e.state) {
        this.activeView();
        return;
      }
      var method = e.state.method;
      this[method + 'View']();
    }
  }]);

  return Filter;
}();

exports.default = Filter;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _indexedDB = __webpack_require__(0);

var _indexedDB2 = _interopRequireDefault(_indexedDB);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OnOffListner = function () {
  function OnOffListner() {
    _classCallCheck(this, OnOffListner);

    this.indexedDB = new _indexedDB2.default();

    this.init();
  }

  _createClass(OnOffListner, [{
    key: 'init',
    value: function init() {
      window.addEventListener('online', this.onoffListner.bind(this));
      window.addEventListener('offline', this.onoffListner.bind(this));
    }
  }, {
    key: 'onoffListner',
    value: function onoffListner() {
      document.getElementById('header').classList[navigator.onLine ? 'remove' : 'add']('offline');
      if (navigator.onLine) {
        this.a = this.indexedDB.getAllTodo();

        // const fetchList = [];
        //
        // for (let i = 0, len = localStorage.length; i < len; i += 1) {
        //   console.log('localStorage values: ', localStorage.getItem(localStorage.key(i)));
        //   fetchList[i] = fetch('http://128.199.76.9:8002/wkddngus5/todo', {
        //     method: 'POST',
        //     headers: {
        //       Accept: 'application/json, application/xml, text/plain, text/html, *.*',
        //       'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        //     },
        //     body: `todo=${localStorage.getItem(localStorage.key(i))}`,
        //   });
        // }
        //
        // Promise.all(fetchList)
        //   .then(responses => Promise.all(responses.map(response => response.json())))
        //   .then((jsonList) => {
        //     for (let i = 0, len = localStorage.length; i < len; i += 1) {
        //       console.log(jsonList);
        //       document.getElementById(localStorage.key(i)).id = jsonList[i].insertId;
        //     }
        //   });
      }
    }
  }]);

  return OnOffListner;
}();

exports.default = OnOffListner;

/***/ })
/******/ ]);