var TodosModel = require("./todos.model");
var TodosView = require("./todos.view");
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