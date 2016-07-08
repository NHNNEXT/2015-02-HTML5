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
      TODOSync.add(content, function(json){
          var newTodo = document.createElement("li");
          newTodo.className = "appending";
          newTodo.dataset.id = json.insertId;
          newTodo.innerHTML = newTodoList.replace(/\{\{input-value\}\}/gi, content);
          document.getElementById("todo-list").appendChild(newTodo);
          newTodo.offsetHeight;
          newTodo.className = "";
          document.getElementById("new-todo").value = "";
      })
    }
 }
   //  newTodo.addEventListener("webkitTransitionEnd", function(){ newTodo.className = ""});

function completedTODO(e){
    var input = e.target;
    var li = input.parentNode.parentNode;
    var completed = input.checked?"1":"0";

    TODOSync.completed({
      "id" : li.dataset.id,
      "completed" : completed
    }, function(){
        if(completed === "1"){
            li.className = "completed";
        }else{
            li.className = "";
        }
    })
}

function removeTODO(e){
  var li = e.target.parentNode.parentNode;
  li.className= "deleting";
  TODOSync.remove({
      "id" : li.dataset.id
      }, function(){
        li.addEventListener("transitionend",function(){
             li.remove();
      });
    })
  }

function todoEventCheck(e){
  var target = e.target;
  if(target && target.nodeName == "INPUT"){
    completedTODO(e);
  }else if(target && target.nodeName == "BUTTON"){
    removeTODO(e);
  }
}

function loadTodo(){
  TODOSync.get(function(data){
    var newTodo = document.createElement("li");
    for(var i = data.length-1; i >= 0 ; i--){
      var newTodo = document.createElement("li");
      newTodo.dataset.id = data[i].id;
      newTodo.innerHTML = newTodoList.replace(/\{\{input-value\}\}/gi, data[i].todo);
      document.getElementById("todo-list").appendChild(newTodo);
      if(data[i].completed === 1){
        newTodo.className = "completed";
        newTodo.firstChild.firstChild.checked = true;
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", function(){
    loadTodo();
    document.getElementById("new-todo").addEventListener("keydown", addTODO);
    document.getElementById("todo-list").addEventListener("click", todoEventCheck);
});
