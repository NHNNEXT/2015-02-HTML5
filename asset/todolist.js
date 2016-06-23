var todo = document.getElementById("new-todo");
var template = '<li class={{#if completed}}"completed"{{/if}}><div class="view"><input class="toggle" type="checkbox"{{#if completed}}checked{{/if}}><label>{{inputValue}}</label><button class="destroy"></button></div><input class="edit" value={{inputValue}}></li>'
var template_up = Handlebars.compile(template);

if(todo){
  todo.addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode;
      if (key === 13) {
        var list = document.getElementById("todo-list");
        list.insertAdjacentHTML('beforeend', template_up({"inputValue":todo.value}));
        todo.value = "";
       }
  });
}
