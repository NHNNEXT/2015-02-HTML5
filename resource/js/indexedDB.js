export default class IndexedDB {
  constructor() {
    this.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
    this.init();
  }

  init() {
    this.open = this.indexedDB.open('HTML5', 1);
    this.open.onupgradeneeded = () => {
      this.db = this.open.result;
      this.store = this.db.createObjectStore('TodoStore', { keyPath: 'id' });
    };

    this.open.onsuccess = () => {
      this.db = this.open.result;
    };
  }

  saveTodo(tmpId, inputValue) {
    this.transaction = this.db.transaction('TodoStore', 'readwrite');
    this.store = this.transaction.objectStore('TodoStore');

    const save = this.store.put({ id: tmpId, todo: inputValue });
    save.onsuccess = () => {
      console.log(save.result);
    };
  }

  getAllTodo() {
    this.transaction = this.db.transaction('TodoStore', 'readwrite');
    this.store = this.transaction.objectStore('TodoStore');
    let result;

    const getAll = this.store.getAll();
    getAll.onsuccess = () => {
      console.log('getALL: ', getAll.result);
      result = getAll.result;

      const fetchList = [];

      for (let i = 0, len = result.length; i < len; i += 1) {
        console.log('indexedDB values: ', result[i].id);
        fetchList[i] = fetch('http://128.199.76.9:8002/wkddngus5/todo', {
          method: 'POST',
          headers: {
            Accept: 'application/json, application/xml, text/plain, text/html, *.*',
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          },
          body: `todo=${result[i].todo}`,
        });
      }

      Promise.all(fetchList)
        .then(responses => Promise.all(responses.map(response => response.json())))
        .then((jsonList) => {
          for (let i = 0, len = result.length; i < len; i += 1) {
            document.getElementById(result[i].id).id = jsonList[i].insertId;
          }
        });
      this.clearTodo();
    };
  }

  clearTodo() {
    this.transaction = this.db.transaction('TodoStore', 'readwrite');
    this.store = this.transaction.objectStore('TodoStore');

    const objectStoreRequest = this.store.clear();
    objectStoreRequest.onsuccess = () => {
      console.log('indexedDB cleared');
    };
  }
}
