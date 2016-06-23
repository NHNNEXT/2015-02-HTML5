var template = Handlebars.compile(require("./template").todoSource);
var todoList = document.getElementById("todo-list");

function render(todo) {
    todoList.insertAdjacentHTML('beforeend', template(todo));
}

module.exports = TodosView = {
    render: render
};