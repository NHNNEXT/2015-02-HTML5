var source = document.getElementById("todo-template").innerHTML;
var template = Handlebars.compile(source);
var data = { todos: [
        {classname: "completed", checked: 1, value: "빨래하기"},
        {classname: "completed", checked: 1, value: "공부하기"},
        {classname: "", checked: 0, value: "개 산책시키기"}
    ]};
document.getElementById("todo-list").innerHTML = template(data);