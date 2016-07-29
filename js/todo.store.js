import TodoSelector from 'js/todo.selector.js';

export default class TodoStore {
	constructor(localStore, remoteStore) {
		this.localStore = localStore;
		this.remoteStore = remoteStore;
		this.init();
	}

	get isOnLine() {
		return navigator.onLine;
	}

	get availableStore() {
		return this.isOnLine ? this.remoteStore : this.localStore;
	}

	init() {
		this.bindEventListener();
	}

	bindEventListener() {
		window.addEventListener("online", this.onofflineListener.bind(this));
		window.addEventListener("offline", this.onofflineListener.bind(this));
	}

	onofflineListener() {
		let action = navigator.onLine ? "remove" : "add";
		TodoSelector.header.classList[action]("offline");

		if (this.isOnLine) {
			this.localStore.todos.forEach(todo => {
				let method = todo.status.substr(0, 6);
				this.remoteStore[method](todo);
			});

			this.localStore.initStorage();
		}
	}

	findAll() {
		return this.availableStore.findAll();
	}

	create({ todo }) {
		return this.availableStore.create({ todo });
	}

	update({ id, completed }) {
		return this.availableStore.update({ id, completed });
	}

	delete({ id }) {
		return this.availableStore.delete({ id });
	}
}
