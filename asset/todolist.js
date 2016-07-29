//#todo-list 엘리먼트에 active 엘리먼트를 누르면
//1. todo-list에 all-active 클래스를 추가하고
//2. 기존 anchor에 selected 클래스를 삭제하고
//3. 클릭한 anchor에 selected 클래스를 추가한다.

var Offline = {
  add : function (todoString, callback){
    // offline시에 localdb에 저장.
    alert("오프라인 상태입니다. 로컬에 저장합니다.")
  },
  get : function (callback){
    alert("오프라인 상태라, 불러올 수 없습니다.\n인터넷 연결이 필요합니다.")
  },

  complete: function (li, completed, callback){
    alert("오프라인 상태입니다.");
  },
  remove: function (id, callback){
    alert("오프라인 상태입니다.");
  },
};

var Online = {
  name : "paul",
  url : "http://128.199.76.9:8002/",

  add : function (todoString , callback){
    Online.request(
      "POST",
      Online.url + Online.name ,
      "todo="+todoString,
      callback
    );
  },

  get : function (callback){
    Online.request(
      "GET",
      Online.url + Online.name,
      "",
      callback
    );
  },

  complete: function (li, completed, callback){
    var id = li.dataset.id;
    var xhr = new XMLHttpRequest();
    Online.request(
      "PUT",
      Online.url + Online.name + "/" + id,
      "completed="+completed,
      callback
    );
  },

  remove: function (id, callback){
    Online.request(
      "DELETE",
      Online.url + Online.name + "/" + id,
      "",
      callback
    );
  },

  request : function ( method , target, data, callback ){
    var xhr = new XMLHttpRequest();
    xhr.open(method, target, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.addEventListener("load", function (e){
      callback(JSON.parse(xhr.responseText));
    });
    xhr.send(data);
  }
};

var TodoAjax = {
  status : "Online",

  init: function(){
    if(navigator.onLine){
      TodoAjax.status = "Online";
    }else{
      TodoAjax.status = "Offline";
    }
    window.addEventListener("online", TodoAjax.onoffEvent);
    window.addEventListener("offline", TodoAjax.onoffEvent);
  },

  onoffEvent : function (){
    document.getElementById("header").classList[navigator.onLine?"remove":"add"]("offline");

    if(navigator.onLine){
      TodoAjax.status = "Online";
      console.log("Syncing....");
      // server와 sync 맞추기.
    }else{
      TodoAjax.status = "Offline";
    }
  },

  add : function (todoString, callback){
    window[TodoAjax.status].add(todoString, callback);
  },

  get: function(callback){
    window[TodoAjax.status].get(callback);
  },

  complete: function (li, completed, callback){
    window[TodoAjax.status].complete(li, completed, callback);
  },

  remove: function (id, callback){
    window[TodoAjax.status].remove(id, callback);
  },

}

var filter = {
  clicked :function (target){
    filter.changeSelected();
    filter[target.getAttribute("href")]();
    target.classList.add("selected");
  },

  changeSelected: function(){
    var list = document.getElementById("filters");
    for( key in list.childNodes){
      var child  = list.childNodes[key];
      if(child.tagName === "LI"){
        var a = child.querySelector("A").className = "";
      }
    }
  },

  'index.html' : function (){
    document.getElementById("todo-list").className= "";
  },

  completed : function(){
    document.getElementById("todo-list").className= "all-completed";
  },

  active : function (){
    document.getElementById("todo-list").className= "all-active";
  }
}

var TODO = {
  ENTER_KEY_CODE : 13,

  init : function(){
    document.addEventListener("DOMContentLoaded", (function(){
      document.addEventListener("keydown", this.add.bind(this));
      document.addEventListener("click", this.click.bind(this));
      this.loadAllTodo();
    }).bind(this));
  },

  loadAllTodo : function(){
    TodoAjax.get(function (json){
      for(var key in json){
        var todo = json[key];
        var completed = (todo.completed == 1? true: false);
        //console.log(todo.completed);
        this.makeAndSlidedown(todo.todo, todo.id, todo.completed);
      }
    }.bind(this));
  },

  add : function (e){
    if(e.keyCode != this.ENTER_KEY_CODE){ return; }

    var todoString = document.getElementById("new-todo").value;
    if( todoString.trim() == ""){
      return;
    }

    TodoAjax.add(todoString, function(json){
      this.makeAndSlidedown(todoString, json.insertId, false);
    }.bind(this));
  },

  makeAndSlidedown : function (todoStr, id, completed){
    var li = this.make(todoStr, id, completed);
    li.style.height = "0px";
    var todoList = document.getElementById("todo-list");
    todoList.appendChild(li);
    this.slideDown(li, 500, 58);

    document.getElementById("new-todo").value = "";
  },

  make : function(todoStr, id, completed){
    // //일반 TODO
    // <li class="{}">
    //   <div class="view">
    //     <input class="toggle" type="checkbox" >
    //     <label>타이틀</label>
    //     <button class="destroy"></button>
    //   </div>
    // </li>
    var li = document.createElement("li");
    li.dataset.id = id;
    if(completed) li.classList.add("completed");

    var htmlString =
      "<div class='view'>"+
      "<input class='toggle' type='checkbox'"+(completed? " checked ":"") +">"+
      "<label>"+todoStr+"</label>"+
      "<button class='destroy'></button>"+
      "</div>";
    li.insertAdjacentHTML('afterbegin', htmlString);

    return li;
  },

  complete : function (li){
    var completed = (li.getElementsByTagName("INPUT")[0].checked ? 1 : 0);
    TodoAjax.complete(li, completed, function (json){
      li.classList.toggle("completed");
    }.bind(li));
  },

  click : function(e){
    var findParentTodoLI = function (target){
      var li = target;
      while(li.tagName != "LI"){
        li = li.parentNode;
        if(!li) break;
      }
      return li;
    };

    var target = e.target;
    // if checkbox click toggle completed
    if(target.tagName ==="INPUT" && target.type == "checkbox"){
      var li = findParentTodoLI(target);
      this.complete(li);
    };

    //if del button click del object
    if(target.tagName === "BUTTON" && target.classList.contains("destroy") ){
      var li = findParentTodoLI(target);
      this.removeAndFadeout(li);
    };

    // if filter clicked,
    if(target.tagName === "A" ){
      e.preventDefault();
      filter.clicked(e.target);
    }
  },

  removeAndFadeout(element){
    var id = element.dataset.id;
    TodoAjax.remove(id, function (){
      this.fadeout(element, 1000, function(element){
        element.parentNode.removeChild(element);
      });
    }.bind(this));
  },

  fadeout : function(element, duration, callback){
    var startTime = 0;
    window.requestAnimationFrame(function animate(time){
      if(startTime == 0) startTime = time;
      var t = (time - startTime) / duration;
      //console.log(1-t);
      element.style.opacity = 1 - t;

      if(time - startTime < duration ){
        window.requestAnimationFrame(animate);
      }
      else {
        callback(element);
      }
    });
  },

  slideDown : function (element, duration, height){
    var startTime = 0;
    window.requestAnimationFrame( function animate(time){
      if(startTime == 0 ) startTime = time;
      var t = (time - startTime)/duration;
      element.style.height = "" + t*height+ "px";
      //element.style.top = "" + (-(1-t)*height) + "px";
      if( time - startTime < duration){
        window.requestAnimationFrame(animate)
      }
    });
  },
};


var moveSquare = function(e){ //sample test code for animation
  var square = document.getElementById("test_div");
  var mouseX = e.clientX;
  var mouseY = e.clientY;
  var startX = square.offsetLeft;
  var startY = square.offsetTop;

  var startTime = 0;
  var aniTime = 1000;
  window.requestAnimationFrame(function animate(time){
    if(startTime === 0){
      startTime = time;
    }
    var t =(time - startTime)/aniTime;
    square.style.left = "" + (startX * (1-t) + mouseX * t) +"px" ;
    square.style.top =  "" + (startY * (1-t) + mouseY * t) +"px" ;
    if(time - startTime <= aniTime){
       window.requestAnimationFrame(animate);
    }
  })
}

document.addEventListener("click", moveSquare);
TODO.init();
TodoAjax.init();
