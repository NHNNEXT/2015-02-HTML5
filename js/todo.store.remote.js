export default class TodoRemoteStore {
	constructor(apiUrl) {
		this.apiUrl = apiUrl;
	}

	findAll() {
		return fetch(this.apiUrl, {
			method: "GET"
		}).then(response => response.json());
	}

	create({ todo }) {
		return fetch(this.apiUrl, {
			method: "POST",
			body: new URLSearchParams(`todo=${todo}`)
		})
			.then(response => response.json())
			.then(json => new Object({
				id: json.insertId,
				todo: todo
			}));
	}

	update({ id, completed }) {
		return fetch(`${this.apiUrl}/${id}`, {
			method: "PUT",
			body: new URLSearchParams(`completed=${completed}`)
		})
			.then(response => response.json())
			.then(() => new Object({
				id: id,
				completed: completed
			}));
	}

	delete({ id }) {
		return fetch(`${this.apiUrl}/${id}`, {
			method: "DELETE"
		})
			.then(response => response.json())
			.then(() => new Object({
				id: id
			}));
	}
}
