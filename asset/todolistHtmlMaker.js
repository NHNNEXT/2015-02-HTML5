var TODOListHtmlMaker = {

  load : function(data){
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
  },

  add : function(json, todo){
      var newTodo = document.createElement("li");
      newTodo.className = "appending";
      newTodo.dataset.id = json.insertId;
      newTodo.innerHTML = newTodoList.replace(/\{\{input-value\}\}/gi, todo);
      document.getElementById("todo-list").appendChild(newTodo);
      newTodo.offsetHeight;
      newTodo.className = "";
      document.getElementById("new-todo").value = "";
  },

  completed : function(completed, li){
    if(completed === "1"){
        li.className = "completed";
    }else{
        li.className = "";
    }
  },

  remove : function(li){
    li.addEventListener("transitionend",function(){
         li.remove();
       });
  }
}
