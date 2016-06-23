var ENTER_KEYCODE = 13;
var SAMPLE_TODO = '<li class=""><div class="view"><input class="toggle" type="checkbox"><label>{title}</label><button class="destroy"></button></div></li>';
function changeTemplate(sample, data) {
	var html = sample;
	for(var key in data) {
		html = html.replace("{" + key + "}", data[key]);
	}
	return html;
}
function addTodo(v) {
	if(!v)
		return;
		
	var html = changeTemplate(SAMPLE_TODO, {title:v});
	console.log(html);
	var ul = document.getElementById("todo-list");
	console.log(ul);
	ul.insertAdjacentHTML("beforeend", html);
}
document.addEventListener("DOMContentLoaded", function() {
	var inputTodo = document.getElementById("new-todo");
	inputTodo.addEventListener("keydown", function(e) {
		console.log("keydown");
		if(e.keyCode === ENTER_KEYCODE) {
			var value =  inputTodo.value;
			addTodo(value);
			inputTodo.value = "";
		}
	});	
});