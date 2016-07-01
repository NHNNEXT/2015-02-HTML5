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
      newTodo.className = "appending";
      setTimeout(function () {
          newTodo.className = "";
      }, 10);
      document.getElementById("new-todo").value = "";
    }
 }

function completedTODO(e){
    var input = e.target;
    var li = input.parentNode.parentNode;
    if(input.checked){
      li.className = "completed";
    }else{
      li.className = "";
    }
}

function removeTODO(e){
  var li = e.target.parentNode.parentNode;
  li.className= "deleting";
  setTimeout(function () {
      li.remove;
  }, 100);
}

function todoEventCheck(e){
  var target = e.target;
  if(target && target.nodeName == "INPUT"){
    completedTODO(e);
  }else if(target && target.nodeName == "BUTTON"){
    removeTODO(e);
  }
}

document.addEventListener("DOMContentLoaded", function(){

    document.getElementById("new-todo").addEventListener("keydown", addTODO);
    document.getElementById("todo-list").addEventListener("click", todoEventCheck);


});
