import TodoSelector from 'js/todo.selector.js';

export default class TodoFilter {
	constructor() {
		this._selectedIndex = 0;
	}

	set filter(filter) {
		this[filter+"View"]();
	}

	set selectedIndex(index) {
		let navigatorList = document.querySelectorAll(".filters a");
		navigatorList[this._selectedIndex].classList.remove("selected");
		navigatorList[index].classList.add("selected");
		this._selectedIndex = index;
	}

	allView() {
		TodoSelector.todoList.classList.remove("active");
		TodoSelector.todoList.classList.remove("completed");
		this.selectedIndex = 0;
	}

	activeView() {
		TodoSelector.todoList.classList.add("active");
		TodoSelector.todoList.classList.remove("completed");
		this.selectedIndex = 1;
	}

	completedView() {
		TodoSelector.todoList.classList.remove("active");
		TodoSelector.todoList.classList.add("completed");
		this.selectedIndex = 2;
	}
}
