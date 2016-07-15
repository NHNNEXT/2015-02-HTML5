
//ajax
//  - 전체 가져올때
//  - 추가할 때
//  - 완료할 때
//  - 삭제할 때

var TodoAjax = {
  name : "paul",
  url : "http://128.199.76.9:8002/",
  add : function (todoString, callback){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", this.url + this.name, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.addEventListener("load", function (e){
      callback(JSON.parse(xhr.responseText).insertId);
    });
    xhr.send("todo="+todoString);
  },

  get: function (callback){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", this.url + this.name, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.addEventListener("load", function (e){
      callback(JSON.parse(xhr.responseText));
    });
    xhr.send();
  },

  complete: function (li, completed, callback){
    var id = li.dataset.id;
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", this.url + this.name + "/" + id, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.addEventListener("load", function (e){
      callback(JSON.parse(xhr.responseText));
    });
    xhr.send("completed="+completed);
  },

  remove: function (id, callback){
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", this.url + this.name + "/" + id, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.addEventListener("load", function (e){
      callback();
    });
    xhr.send();
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
      for( key in json){
        var todo = json[key];
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

    TodoAjax.add(todoString, function(insertId){
      this.makeAndSlidedown(todoString, insertId);
    }.bind(this));
  },

  makeAndSlidedown : function (todoStr, id, completed = 0){
    var li = this.make(todoStr, id, completed);
    li.style.height = "0px";
    var todoList = document.getElementById("todo-list");
    todoList.appendChild(li);
    this.slideDown(li, 500, 58);

    document.getElementById("new-todo").value = "";
  },

  make : function(todoStr, id, completed = 0){
    // //일반 TODO
    // <li class="{}">
    //   <div class="view">
    //     <input class="toggle" type="checkbox" >
    //     <label>타이틀</label>
    //     <button class="destroy"></button>
    //   </div>
    // </li>

    var input = document.createElement("input");
    input.className = "toggle";
    input.setAttribute("type", "checkbox");
    if(completed == 1){
      input.checked = true;
    }

    var label = document.createElement("label");
    label.innerHTML = todoStr;

    var button = document.createElement("button");
    button.className = "destroy";

    var div_view = document.createElement("div");
    div_view.className = "view";
    div_view.appendChild(input);
    div_view.appendChild(label);
    div_view.appendChild(button);

    var li = document.createElement("li");
    li.dataset.id = id;
    li.appendChild(div_view);
    if(completed == 1){
      li.classList.add("completed");
    };
    return li;
  },

  complete : function (li){
    var completed = (li.getElementsByTagName("INPUT")[0].checketd ? 0 : 1);
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

  },

  removeAndFadeout(element){
    var id = element.dataset.id;
    TodoAjax.remove(id, function (){
      this.fadeout(element, 1000, function(element){
        element.parentNode.removeChild(element);
      }.bind(element));
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
