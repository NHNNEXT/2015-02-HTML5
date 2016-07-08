var template = (function(window){

	var newTodoList = 
			"<li data-id = '{{elementId}}'>"+
				"<div class='view'>"+
					"<input class='toggle' type='checkbox'>"+
						"<label>{{todo}}</label>"+
					"<button class='destroy'></button>"+
				"</div>"+
					"<input class='edit' value='{{todo}}''>"+
			"</li>";

	var addTemplate = Handlebars.compile(newTodoList);

return {

	"addTemplate" : addTemplate
}

})(window);
