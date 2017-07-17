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
        e.target.parentNode.parentNode.classList = "delete";
        // e.currentTarget.removeChild(e.target.parentNode.parentNode);
    }
}

function removeTODO(e) {
    if(e.animationName === "slideout" && e.target.classList.contains("delete")) {
        // e.target.parentNode.parentNode.classList = "delete";
        
        e.currentTarget.removeChild(e.target);
    }
}

document.getElementById("new-todo").addEventListener("keydown", addTODO);
document.getElementById("todo-list").addEventListener("click", completeTODO);
document.getElementById("todo-list").addEventListener("click", deleteTODO);
document.getElementById("todo-list").addEventListener("animationend", removeTODO);
