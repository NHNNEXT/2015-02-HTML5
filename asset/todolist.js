var ENTER_KEY = 13;

var newTodoList =
    "<div class='view'>"+
        "<input class='toggle' type='checkbox'>"+
        "<label>{{input-value}}</label>"+
        "<button class='destroy'></button>"+
    "</div>";

function loadTodo(){
      TODOSync.get(function(data){
        TODOListHtmlMaker.load(data);
      });
    }

function addTODO(e){
  if(e.keyCode === ENTER_KEY){
      var todo = document.getElementById("new-todo").value;
      TODOSync.add(todo, function(json){
          TODOListHtmlMaker.add(json, todo);
      })
    }
 }

function completedTODO(e){
    var input = e.target;
    var li = input.parentNode.parentNode;
    var completed = input.checked?"1":"0";
    TODOSync.completed({
      "id" : li.dataset.id,
      "completed" : completed
    }, function(){
        TODOListHtmlMaker.completed(completed, li);
    })
}

function removeTODO(e){
  var li = e.target.parentNode.parentNode;
  li.className= "deleting";
  TODOSync.remove({
      "id" : li.dataset.id
    }, TODOListHtmlMaker.remove(li));
  }

function todoEventCheck(e){
  var target = e.target;
  if(target && target.className == "toggle"){
    completedTODO(e);
  }else if(target && target.className == "destroy"){
    removeTODO(e);
  }
}



document.addEventListener("DOMContentLoaded", function(){
    loadTodo();
    document.getElementById("new-todo").addEventListener("keydown", addTODO);
    document.getElementById("todo-list").addEventListener("click", todoEventCheck);
    document.getElementById("filters").addEventListener("click", TODOListFilter.showByFilter);
    window.addEventListener("popstate", TODOListFilter.changeURLFilter); //이건 앞으로 가기, 뒤로가기를 누를 경우
});
