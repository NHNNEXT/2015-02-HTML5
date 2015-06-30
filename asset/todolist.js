var ssss = '<div class="view"><input class="toggle" type="checkbox"><label>타이틀</label><button class="destroy"></button></div>';
var elNewTodo = $('<li></li>');
elNewTodo.html(ssss);

$(document).ready(function () {
  $('#new-todo').on('keypress', function(event) {
    if(event.keyCode === 13) {
      var newItem = elNewTodo.clone();
      $('label', newItem).text($('#new-todo').val());
      $('#todo-list').append(newItem);
      $('#new-todo').val('');
    }
  });
  $('#todo-list').on('click', 'input.toggle', function() {
    console.log('complete ',$(this), $(this).closest('li'));
    $(this).closest('li').addClass('completed');
  })
  $('#todo-list').on('click', 'button.destroy', function() {
    console.log('destroy ',$(this).closest('div'));
    $(this).closest('div').fadeOut('slow', function() {
      // 왜 li 가 아니고 div?
      console.log($(this), $(this).parent('li'));
      $(this).parent('li').remove();
    });
  })
});
