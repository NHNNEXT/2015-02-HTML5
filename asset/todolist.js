var ENTER_KEY = 13;

var newTodoList =
    "<div class='view'>"+
        "<input class='toggle' type='checkbox'>"+
        "<label>{{input-value}}</label>"+
        "<button class='destroy'></button>"+
    "</div>";

    function loadTodo(){
      TODOSync.get(function(data){
        loadTodoHtmlMaker(data);
      });
    }

function addTODO(e){
  if(e.keyCode === ENTER_KEY){
      var todo = document.getElementById("new-todo").value;
      TODOSync.add(todo, function(json){
          addTodoHtmlMaker(json, todo);
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
        completedHTMLMaker(completed, li);
    })
}

function removeTODO(e){
  var li = e.target.parentNode.parentNode;
  li.className= "deleting";
  TODOSync.remove({
      "id" : li.dataset.id
    }, removeHTMLMaker(li));
  }

function todoEventCheck(e){
  var target = e.target;
  if(target && target.className == "toggle"){
    completedTODO(e);
  }else if(target && target.className == "destroy"){
    removeTODO(e);
  }
}

//--------------------- HTML Maker ------------------------------//

function loadTodoHtmlMaker(data){
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
}

function addTodoHtmlMaker(json, todo){
    var newTodo = document.createElement("li");
    newTodo.className = "appending";
    newTodo.dataset.id = json.insertId;
    console.log(json);
    console.log(newTodo);
    newTodo.innerHTML = newTodoList.replace(/\{\{input-value\}\}/gi, todo);
    document.getElementById("todo-list").appendChild(newTodo);
    newTodo.offsetHeight;
    newTodo.className = "";
    document.getElementById("new-todo").value = "";
}

function completedHTMLMaker(completed, li){
  if(completed === "1"){
      li.className = "completed";
  }else{
      li.className = "";
  }
}

function removeHTMLMaker(li){
  li.addEventListener("transitionend",function(){
       li.remove();
     });
}

//--------------------- HTML Maker ------------------------------//

//--------------------- filtering functions ---------------------//

function showByFilter(e){

  var filter = e.target.getAttribute('href');
  if(filter == "index.html"){
      allList();
  }else if(filter == "active"){
      activeList();
  }else if(filter == "completed"){
      completedList();
  }
  e.preventDefault();

}

function allList(){
    document.getElementById("todo-list").className = "";
    selectedFilter(0);
    history.pushState({"method":"all"}, null, "index.html"); //파라미터, 타이틀명, 페이지명
};

function activeList(e){
    document.getElementById("todo-list").className = "all-active";
    selectedFilter(1);
    history.pushState({"method":"active"}, null, "#active");
};

function completedList(){
    document.getElementById("todo-list").className = "all-completed";
    selectedFilter(2);
    history.pushState({"method":"completed"}, null, "#completed");
};

var selectedFilterIndex = 0;

function selectedFilter(index){
  var filterList = document.querySelectorAll("#filters a");
  filterList[selectedFilterIndex].classList.remove("selected");
  filterList[index].classList.add("selected");
  selectedFilterIndex = index;
}

function changeURLFilter(e){
  if(e.state){
    var method = e.state.method;
    if(method === "all"){
        allList();
    }else if(method === "active"){
        activeList();
    }else if(method === "completed"){
        completedList();
    }
  }else{
    allList();
  }
}

//--------------------- filtering functions ---------------------//

document.addEventListener("DOMContentLoaded", function(){
    loadTodo();
    document.getElementById("new-todo").addEventListener("keydown", addTODO);
    document.getElementById("todo-list").addEventListener("click", todoEventCheck);
    document.getElementById("filters").addEventListener("click", showByFilter);
    window.addEventListener("popstate", changeURLFilter); //이건 앞으로 가기, 뒤로가기를 누를 경우
});
