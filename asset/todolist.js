function addTODO(e) {
    var ENTER_KEYCODE = 13;    
    if(e.keyCode === ENTER_KEYCODE) {
        var todoList = document.getElementById("todo-list");
        var todo = document.getElementById("new-todo").value;
        var todos = [{
            "value": todo
        }];
        var todoElement = template({
            "todos": todos
        });

        //string 값인 todoElement를 li DOM node 로 만들어준다
        var el = document.createElement("li");
        el.innerHTML = todoElement;
        todoList.insertBefore(el, todoList.firstChild);

        document.getElementById("new-todo").value = "";
    }
}

document.getElementById("new-todo").addEventListener("keydown", addTODO);