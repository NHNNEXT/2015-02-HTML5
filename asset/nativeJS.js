var ENTER_KEY = 13;

var newTodoList =
    "<div class='view'>"+
        "<input class='toggle' type='checkbox'>"+
        "<label>{{input-value}}</label>"+
        "<button class='destroy'></button>"+
    "</div>";

function addTODO(e){

  if(e.keyCode === ENTER_KEY){
    var content = document.getElementById("new-todo").value;
    var newTodo = document.createElement("li");
    newTodo.innerHTML = newTodoList.replace(/\{\{input-value\}\}/gi, content);
    document.getElementById("todo-list").appendChild(newTodo);
    document.getElementById("new-todo").value = "";
  }
}

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("new-todo").addEventListener("keydown", addTODO);
});
