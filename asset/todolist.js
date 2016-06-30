var TODO = (function(window) {

	'use strict';

	var ENTER_KEY = 13;

	function init(){
		$("#new-todo").on("keydown", addListTodo);
		$("#todo-list").on("click", ".toggle", completed);
		$("#todo-list").on("click", ".destroy", destroy);
	}

	function addListTodo(e){

		var todoName = $(e.target).val();
		if(e.which === ENTER_KEY && todoName !== ""){
			$(template.addTemplate({"todo":todoName})).appendTo("#todo-list");
			$(e.target).val("");
		}
	}

	function completed(e){
		$(e.target).closest("li").toggleClass("completed");
	}

	function destroy(e){

		 var $li = $(e.target).closest("li");
		 $li.addClass("slideUp").addClass("none");
		 setTimeout(function(){ $li.removeClass("slideUp").slideUp();}, 1000);

			// var i = 0;
			// var $li = $(e.target).closest("li");
			// var key = setInterval(function(){

			// 	if(i === 100){
			// 		clearInterval(key);
			// 		$li.slideUp();
			// 	}else{
			// 		var op = 1 - i*0.02;
			// 		$li.css("opacity", op);
			// 		i++;
			// 	}
			// },16); // 제이쿼리를 이용한 opacity 방법
	}

	return {
		"init" : init
	}

})(window);

$(function(){
	TODO.init();
});
