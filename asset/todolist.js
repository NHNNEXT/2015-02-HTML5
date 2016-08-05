
 = document.getElementById("new-todo");
  var list = document.getElementById("todo-list");
  var filter = document.getElementById("filters");
  var template = '<li class="{{#if completed}}completed {{/if}}appending" data-id={{data-id}}><div class="view"><input class="toggle" type="checkbox"{{#if completed}}checked{{/if}}><label>{{inputValue}}</label><button class="destroy"></button></div><input class="edit" value={{inputValue}}></li>'
  var template_up = Handlebars.compile(template);
  var initUrl = "http://128.199.76.9:8002/skychb/";
  var ENTER = 13;
  var start = 0;
  var ele = "";

var TODOSync = {
  onofflineListener:function(){
    document.getElementById("header").classList[navigator.online?"remove":"add"]("offline");
    // if(navigator.online){
    //   document.getElementById("header").classList.remove("offline");
    // }else{
    //   document.getElementById("header").classList.add("offline");
    // }
    // as same
    // if(navigator.online){
    //  document.getElementById("header").classList["add"]("offline")
    // will work.
  },
  initXHR : function(method, url){
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF=8");
    return xhr;
  },
  get : function(todo){
    var xhr = this.initXHR("GET", initUrl);
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
    if(navigator.onLine){
      var xhr = this.initXHR("POST", initUrl);
      xhr.addEventListener("load", function(e){
          callback(JSON.parse(xhr.responseText));
      });
      xhr.send("todo="+todo);
    }
  },
  complete : function(complete, completed, callback){
    var xhr = this.initXHR("PUT", initUrl+complete.dataset.id);
    xhr.addEventListener("load", function(e){
      callback(JSON.parse(xhr.responseText));
    })
    console.log("c:"+complete.dataset.id);
    xhr.send("completed="+completed);
  },
  remove : function(id){
    var xhr = this.initXHR("DELETE", initUrl+id);
    xhr.send("");
  }
};

var TODO = {

  init : function(){
    todo.addEventListener('keypress', this.addTodo);
    list.addEventListener('click', this.eventDelegate);
    TODOSync.get();
    filter.addEventListener('click', this.state.bind(this));
    window.addEventListener("popstate", this.URLFilter.bind(this));
    //console.log로 씌워도 동작하는 이유는?
    TODOSync.onofflineListener();
  },

  addTodo:function(e){
    if(todo){
        var key = e.which || e.keyCode;
        if (key === ENTER && todo.value) {
          start = Date.now();
          console.log(todo);
          var list = document.getElementById("todo-list");
          if(navigator.onLine){
            TODOSync.add(todo.value, function(json){
              list.insertAdjacentHTML('afterbegin', template_up({"inputValue":todo.value, "data-id":json.insertId}));
              todo.value= "";
            });
          }
          TODO.addOpacity();
        }
    }
  },

  completeTodo:function(e){
    var checked = e.target.checked?"1":"0";
    var target = e.target.parentNode.parentNode;

    TODOSync.complete(target, checked, function(json){
      // e.target.parentNode.parentNode.classList.toggle("completed");
      if(checked){
        e.target.parentNode.parentNode.classList.add("completed");
        console.log("completed added");
      }else{
        e.target.parentNode.parentNode.classList.remove("completed");
      }
    });
  },

  addOpacity:function(time){
    time = Date.now();
    console.log("deleting...");
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
      console.log("completing?");
      TODO.completeTodo(e);
    }
    else if (e.target.classList.contains("destroy")){
      console.log("deleting?");
      TODO.removeTodo(e);
    }
  },
  URLFilter:function(e){
    console.log(e);
    if(e.state){
      var method = e.state.method;
      if(method === "all"){
        this.allView();
      }else if(method === "active"){
        this.activeView();
      }else if(method === "completed"){
        this.completedView();
      }else{
        this.allView();
      }
    }
  },
  state:function(e){
    e.preventDefault();
    var filterName = e.target.tagName.toLowerCase();
    if(filterName =="a"){
      var link = e.target.getAttribute("href");
      if(link === "index.html"){
        this.allView();
      }else if(link ==="active"){
        this.activeView();
      }else if(link === "completed"){
        this.completedView();
      }
    }
  },
  allView:function(){
    document.getElementById("todo-list").className="";
    this.selectNavigator(0);
    history.pushState({"method":"all"}, null, "index.html");
  },
  activeView:function(){
    document.getElementById("todo-list").className="all-active";
    this.selectNavigator(1);
    history.pushState({"method":"active"}, null, "index.html");
  },
  completedView : function(){
    document.getElementById("todo-list").className="all-completed";
    this.selectNavigator(2);
    history.pushState({"method":"completed"}, null, "index.html");
  },
  selectNavigator : function(i){
    var list = document.querySelectorAll("#filters a");
    this.selectedIndex = 0 || i;
    list[this.selectedIndex].classList.remove("selected");
    list[i].classList.add("selected");
    this.selectedIndex = i;
    console.log(i);
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
