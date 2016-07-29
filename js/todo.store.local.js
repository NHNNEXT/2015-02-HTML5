export default class TodoLocalStore {
	constructor(dbName) {
		this.dbName = dbName;
		this.init();
	}

	init() {
		if (!localStorage[this.dbName]) {
			this.initStorage();
		}

	}

	initStorage() {
		this.localStorage = {
			todos: [],
			todoIdx: 0
		};
	}

	get localStorage() {
		return JSON.parse(localStorage[this.dbName]);
	}

	set localStorage(data) {
		localStorage[this.dbName] = JSON.stringify(data);
	}

	get todoIdx() {
		return this.localStorage.todoIdx;
	}

	set todoIdx(todoIdx) {
		let storage = this.localStorage;
		storage.todoIdx = todoIdx;
		this.localStorage = storage;
	}

	get todos() {
		return this.localStorage.todos;
	}

	set todos(todos) {
		let storage = this.localStorage;
		storage.todos = todos;
		this.localStorage = storage;
	}

	findAll() {
		let todos = this.todos;
		return Promise.resolve(todos);
	}

	create({ todo }) {
		let todoData = {
			todo: todo,
			id: `local_${this.todoIdx}`,
			status: 'created'
		};
		this.todoIdx = this.todoIdx + 1;

		let todos = this.todos;
		todos.push(todoData);
		this.todos = todos;
		return Promise.resolve(todoData);
	}

	update({ id, completed }) {
		let todos = this.todos;
		let todo = todos.find(todo => todo.id === id);

		if (!todo) {
			let idx = todos.push({ id: id });
			todo = todos[idx-1];
		}

		todo.completed = completed;
		todo.status = "updated";
		this.todos = todos;

		return Promise.resolve(todo);
	}

	delete({ id }) {
		let todos = this.todos;
		let todo = todos.find(todo => todo.id === id);

		if (!todo) {
			let idx = todos.push({ id: id });
			todo = todos[idx-1];
		}

		todo.status = "deleted";
		this.todos = todos;

		return Promise.resolve(todo);
	}
}
