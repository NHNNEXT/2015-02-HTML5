function addTODO(e) {
    var ENTER_KEYCODE = 13;    
    if(e.keyCode === ENTER_KEYCODE && this.value !== "") {
        var todoList = document.getElementById("todo-list");
        var todo = this.value;
        var todos = [{
            "value": todo
        }];
        var todoElement = template({
            "todos": todos
        });

        //string 값인 todoElement를 li DOM node 로 만들어준다
        var el = document.createElement("li");
        console.log(todoElement);
        var start = todoElement.indexOf("<div");
        var end = todoElement.lastIndexOf("</li>");

        el.innerHTML = todoElement.substring(start, end);
        todoList.insertBefore(el, todoList.firstChild);

        this.value = "";
    }
}

function completeTODO(e) {
    if(e.target.classList.contains("toggle")) {
        e.target.parentNode.parentNode.classList.toggle("completed");
    }
}

function deleteTODO(e) {
    if(e.target.classList.contains("destroy")) {
        e.currentTarget.removeChild(e.target.parentNode.parentNode);
    }
}

document.getElementById("new-todo").addEventListener("keydown", addTODO);
document.getElementById("todo-list").addEventListener("click", completeTODO);
document.getElementById("todo-list").addEventListener("click", deleteTODO);