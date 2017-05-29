import TodoSelector from 'js/todo.selector.js';

export default class TodoView {
	static get template() {
		let t = TodoSelector.todoTemplate;
		return document.importNode(t.content, true);
	}

	static build({ id, todo, completed }) {
		let template = TodoView.template;
		let ele = template.childNodes[1];

		ele.querySelector('label').innerHTML = todo;
		ele.dataset.id = id;

		if (completed) {
			ele.classList.add("completed");
			ele.querySelector('.toggle').setAttribute('checked', '');
		}

		return template;
	}

	static add(data) {
		let ele = TodoView.build(data);
		TodoSelector.todoList.appendChild(ele);
	}

	static delete({ id }) {
		let ele = TodoSelector.todoItem(id);
		ele.parentNode.removeChild(ele);
	}

	static update({ id, completed }) {
		let ele = TodoSelector.todoItem(id);
		ele.classList[completed ? "add" : "remove"]("completed");
	}
}
