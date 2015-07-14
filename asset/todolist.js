window.addEventListener("load", function() {
	addList();
	completeList();
	deleteList();
	
}, false);



function addList() {
	$('input').on('keydown', function(e) {
	    if (e.which == 13) {
	    	var textValue = $("input").val();

	    	/*          to append with strings. (this code is changed by template engine.)
	  	   	$("#todo-list").append("<li class='{}'><div class='view'><input class='toggle' type='checkbox' {}><label>"+textValue+"</label><button class='destroy'></button></div></li>");
	  	   	*/
	  	   	appendWithTemplateEngine("#addListElements", "#todo-list", { class:'added', text:textValue });
	  	   	animateFadeIn($("#todo-list li:last-child"));
	  	   	deleteTextAfterPutIn();
	    	e.preventDefault();



	    	function appendWithTemplateEngine(template, elementToAppend, dataToBind) {
	    		var source   = $(template).html();
				var template = Handlebars.compile(source);
				var templateData = dataToBind;

				$(elementToAppend).append(template(templateData));	
	    	}

	    	function animateFadeIn(elementToAnimate) {
				var i = 0;
				animation();

				function animation() {
					if (i === 50) {
						return;
					} else {
						elementToAnimate.css( "opacity", 0+i*0.2);
						i++;
					}
					requestAnimationFrame(animation);
				}		
			}

	    	function deleteTextAfterPutIn() {
	    		$("input").val('');  //to delete the text value in a input box after put it in.
	    	}
	    }
	});
};

function completeList() {
	//to use 'event delegation' to add event listner to newly added DOM. 
	$("ul").on("click", "li  div  input[type=checkbox]", function(e){
		
		//e.delegateTarget = "ul"
		//e.currentTarget = "input"
		if (e.currentTarget.checked) {
			e.currentTarget.closest("li").className = "completed"
		}
		else {
			e.currentTarget.closest("li").className = "added"
		}
	});
};

function deleteList() {
	/*          to fade out with css transition. (this code is changed by requestAnimationFrame)
 	$("ul").on("click", "li  div  .destroy", function(e){ 
		var elLi = e.currentTarget.closest("li");
		elLi.className = "deleting";
		elLi.addEventListener("transitionend", function(e) {
			e.currentTarget.closest("li").remove();
		});
	}); 
	*/

	$("ul").on("click", "li  div  .destroy", function(e){ 
		var elLi = e.currentTarget.closest("li");

		animateFadeOut($(elLi));

		function animateFadeOut(elementToAnimate) {
			var i = 0;
			animation();

			function animation() {
				if (i === 50) {
					elementToAnimate.remove();
					return;
				} else {
					elementToAnimate.css( "opacity", 1-i*0.2);
					i++;
				}
				requestAnimationFrame(animation);
			}		

		}
	});
}


