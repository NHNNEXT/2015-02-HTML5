
  var todo = document.getElementById("new-todo");
  var list = document.getElementById("todo-list");

  var template = '<li class="{{#if completed}}completed {{/if}}appending" data-id={{data-id}}><div class="view"><input class="toggle" type="checkbox"{{#if completed}}checked{{/if}}><label>{{inputValue}}</label><button class="destroy"></button></div><input class="edit" value={{inputValue}}></li>'
  var template_up = Handlebars.compile(template);

  var ENTER = 13;
  var start = 0;
  var ele = "";

var TODOSync = {
  get : function(todo){
    var xhr  = new XMLHttpRequest();
    xhr.open("GET", "http://128.199.76.9:8002/skychb", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF=8");
    xhr.addEventListener("load", function(e){
      var list = document.getElementById("todo-list");
      var json = JSON.parse(e.target.response);
      json.forEach(function(a){
        console.log(a.completed);
        list.insertAdjacentHTML('afterbegin', template_up({"inputValue":a.todo, "data-id":a.id, "completed":a.completed}));
      })
    });
    xhr.send(null);
    // xhr.send("todo="+todo);
  },
  add : function(todo, callback){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://128.199.76.9:8002/skychb", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF=8");
    xhr.addEventListener("load", function(e){
        callback(JSON.parse(xhr.responseText));
    });
    xhr.send("todo="+todo);
  },
  complete : function(complete, completed, callback){
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "http://128.199.76.9:8002/skychb/" + complete.dataset.id, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF=8");
    xhr.addEventListener("load", function(e){
      callback(JSON.parse(xhr.responseText));
    })
    console.log("c:"+complete.dataset.id);
    xhr.send("completed="+completed);
  },
  remove : function(id){
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "http://128.199.76.9:8002/skychb/" + id, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF=8");
    xhr.send("");
  }
};

var TODO = {

  init : function(){
    todo.addEventListener('keypress', this.addTodo);
    list.addEventListener('click', this.eventDelegate);
    TODOSync.get();
    //console.log로 씌워도 동작하는 이유는?
  },

  addTodo:function(e){
    if(todo){
        var key = e.which || e.keyCode;
        if (key === ENTER && todo.value) {
          start = Date.now();
          var list = document.getElementById("todo-list");
          TODOSync.add(todo.value, function(json){
            list.insertAdjacentHTML('afterbegin', template_up({"inputValue":todo.value, "data-id":json.insertId}));
            todo.value= "";
          });
          TODO.addOpacity();
        }
    }
  },

  completeTodo:function(e){
    var checked = e.target.checked?"1":"0";
    var target = e.target.parentNode.parentNode;
    console.log(checked);
    console.log(e.target.parentNode.parentNode.dataset);

    TODOSync.complete(target, checked, function(json){
      // e.target.parentNode.parentNode.classList.toggle("completed");
      if(checked){
        e.target.parentNode.parentNode.classList += "completed";
      }else{
        e.target.parentNode.parentNode.classList = "";
      }
    });
  },

  addOpacity:function(time){
    time = Date.now();
    var light = (time - start) / 400;
    ele = document.querySelector(".appending");
    ele.style.opacity = light;
    console.log(ele.style.opacity);
    if(light > 1){
      ele.style.opacity = "";
      return;
    }
  requestAnimationFrame(TODO.addOpacity);
},

  removeTodo : function(e){
    var li = e.target.parentNode.parentNode;
    // ele.style.opacity = null;
    li.classList.add('deleting');
    document.querySelector(".deleting").addEventListener("transitionend", function(){
      li.remove();
      TODOSync.remove(e.target.parentNode.parentNode.dataset.id);
    });
  },
  eventDelegate:function(e){
    if(e.target.classList.contains("toggle")){
      TODO.completeTodo(e);
    }
    else if (e.target.classList.contains("destroy")){
      TODO.removeTodo(e);
    }
  }
  // delegateFunc : { //array로 하면됨.
  //   "destory" : remove
  // },

  // delegate : function(e){
  //   var classlist = e.target.classList;
  //   for  // check if contain  window[delegateFunc[i]]
  // }
};

TODO.init();
