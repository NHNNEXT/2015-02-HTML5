var todo = document.getElementById("new-todo");
var list = document.getElementById("todo-list");

var template = '<li class={{#if completed}}"completed "{{/if}}"appending"><div class="view"><input class="toggle" type="checkbox"{{#if completed}}checked{{/if}}><label>{{inputValue}}</label><button class="destroy"></button></div><input class="edit" value={{inputValue}}></li>'
var template_up = Handlebars.compile(template);

var ENTER = 13;
var start= 0;
var ele = "";
todo.addEventListener('keypress', addTodo);
list.addEventListener('click', eventDelegate);
function addTodo(e){
  if(todo){
      var key = e.which || e.keyCode;
      if (key === ENTER && todo.value) {
        start = Date.now();
        var list = document.getElementById("todo-list");
        list.insertAdjacentHTML('afterbegin', template_up({"inputValue":todo.value}));
        todo.value = "";
        addOpacity();
      }
  }
}

function completeTodo(e){
  e.target.parentNode.parentNode.classList.toggle("completed");
  //e.currentTarget & e.target의 차이는 무엇일까.
  //   target 이벤트를 발생시킨 애
  // 커런트는 바인드 된 이벤트
  //checked를 e.target.checked
  //attribute를 가져올 때 getAttribute
  //dom element의 prop은 e.target.checked이런식으로 가져옴.
  //클래스 이름을 추가하는 메소드 className
  //TODO - CSS를 CSS3로 구현하는 과정 그리고 얘를 자바스크립트
}

function addOpacity(time){
    time = Date.now();
    var light = (time - start) / 400;
    ele = document.querySelector(".appending");
    ele.style.opacity = light;
    console.log(ele.style.opacity);
    if(light > 1){
      ele.style.opacity = "";
      return;
    }
  requestAnimationFrame(addOpacity);
}



function removeTodo(e){
  //TODO : setInterval과 requestAnimationFrame의 차이를 확인해보고, 두 가지 모두 구현해야 한다.
  //TODO : event Delegate를 native로 구현해.
  var li = e.target.parentNode.parentNode;
  // ele.style.opacity = null;
  li.classList.add('deleting');
  document.querySelector(".deleting").addEventListener("transitionend", function(){
    li.remove();
  });
  // e.target.parentNode.parentNode.outerHTML= "";
  // e.target.parentNode.parentNode.parentNode.removeChild();
}

function eventDelegate(e){
  if(e.target.classList.contains("toggle")){
    completeTodo(e);
  }
  else if (e.target.classList.contains("destroy")){
    removeTodo(e);

  }
}
