import TodoSelector from 'js/todo.selector.js';
import TodoView from 'js/todo.view.js';

const ENTER_KEYCODE = 13;

export default class Todo {
	constructor(todoStore, todoFilter) {
		this.todoStore = todoStore;
		this.todoFilter = todoFilter;
		this.init();
	}

	init() {
		this.updateFilter();
		this.bindEventListener();
		this.todoStore.findAll()
			.then(todos => todos.forEach(TodoView.add));
	}

	bindEventListener() {
		TodoSelector.newTodo.addEventListener("keydown", this.add.bind(this));
		TodoSelector.todoList.addEventListener("click", this.eventFilter.bind(this));
		window.addEventListener("hashchange", this.updateFilter.bind(this));
	}

	updateFilter() {
		let hash = window.location.hash;

		let filter = hash.split("#/")[1];
		filter = filter ? filter : "all";

		this.todoFilter.filter = filter;
	}

	eventFilter(e) {
		if (e.target && e.target.matches(".toggle")) {
			this.complete(e);
		}
		if (e.target && e.target.matches(".destroy")) {
			this.remove(e);
		}
	}

	add(e) {
		if (e.keyCode === ENTER_KEYCODE) {
			let todo = TodoSelector.newTodo.value;

			this.todoStore.create({ todo: todo })
				.then(TodoView.add)
				.then(() => {
					TodoSelector.newTodo.value = "";
				});
		}
	}

	remove(e) {
		let target = e.target;
		let li = target.parentNode.parentNode;
		let id = li.dataset.id;

		this.todoStore.delete({ id: id })
			.then(() => new Object({ id: id }))
			.then(TodoView.delete);
	}

	complete(e) {
		let target = e.target;
		let li = target.parentNode.parentNode;
		let id = li.dataset.id;
		let completed = target.checked ? 1 : 0;

		this.todoStore.update({ id: id, completed: completed })
			.then(TodoView.update);
	}

};
