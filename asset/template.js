var source = document.getElementById("todo-template").innerHTML;
var template = Handlebars.compile(source);

var myInit = {
    method: 'GET',
    headers: new Headers({"Content-Type": "application/json"}),
    mode: 'cors'
}

var myRequest = new Request("http://128.199.76.9:8002/bbq923/todo", myInit);

fetch(myRequest).then(function(response) {
	return response.json();
}).then(function(data) {
    console.log(data);
    document.getElementById("todo-list").innerHTML = template(data);
}).catch(function(err) {
	// Error :(
});