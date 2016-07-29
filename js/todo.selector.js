export default class TodoSelector {
	static querySelector(selectors) {
		return document.querySelector(selectors);
	}

	static get todoTemplate() {
		return this.querySelector('#todo-template');
	}

	static get todoList() {
		return this.querySelector(".todo-list");
	}

	static get newTodo() {
		return this.querySelector(".new-todo");
	}

	static get filters() {
		return this.querySelector(".filters");
	}

	static get header() {
		return this.querySelector(".header")
	}

	static todoItem(id) {
		return this.querySelector(`.todo-list li[data-id="${id}"]`);
	}
}
