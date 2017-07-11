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

        todoList.insertAdjacentHTML("afterbegin", todoElement);

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