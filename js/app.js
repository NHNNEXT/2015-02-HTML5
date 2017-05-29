import Todo from 'js/todo.js';
import TodoStore from 'js/todo.store.js';
import TodoFilter from 'js/todo.filter.js';
import TodoLocalStore from 'js/todo.store.local.js';
import TodoRemoteStore from 'js/todo.store.remote.js';

class TodoApp {
	constructor(name, apiUrl) {
		this.localStore = new TodoLocalStore(name);
		this.remoteStore = new TodoRemoteStore(apiUrl);
		this.store = new TodoStore(this.localStore, this.remoteStore);

		this.filter = new TodoFilter();

		this.todo = new Todo(this.store, this.filter);

	}
}

const name = "Byeol";
const apiUrl = `http://128.199.76.9:8002/${name}`;

const todo = new TodoApp(name, apiUrl);
