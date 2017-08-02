import Todo from './resource/js/todo';
import Filter from './resource/js/filter';
import OnOffListner from './resource/js/onOffListner';

(function entry() {
  const todo = new Todo();
  const filter = new Filter();
  const onOffListner = new OnOffListner();

  if (todo) {
    console.log('todo created!');
  }

  if (filter) {
    console.log('filter created!');
  }

  if (onOffListner) {
    console.log('onOffListner created!');
  }
}());
